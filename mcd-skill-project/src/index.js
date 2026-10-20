import fs from "node:fs";
import https from "node:https";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SERVER_URL = "https://mcp.mcd.cn";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOG_PATH = path.resolve(__dirname, "../logs/mcp-requests.jsonl");
const WEB_ROOT = path.resolve(__dirname, "../web");

function redact(value) {
  if (Array.isArray(value)) return value.map(redact);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [
    key,
    /authorization|token|secret|password|cookie/i.test(key) ? "[REDACTED]" : redact(item)
  ]));
}

function writeLog(entry) {
  fs.mkdirSync(path.dirname(LOG_PATH), { recursive: true });
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    fractionalSecondDigits: 3, hourCycle: "h23"
  }).formatToParts(new Date());
  const value = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  const timestamp = `${value.year}-${value.month}-${value.day}T${value.hour}:${value.minute}:${value.second}.${value.fractionalSecond}+08:00`;
  fs.appendFileSync(LOG_PATH, `${JSON.stringify({ timestamp, ...entry })}\n`, "utf8");
}

function loadDotEnv() {
  const envPath = path.resolve(__dirname, "../.env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match || process.env[match[1]]) continue;
    process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
  }
}

function parseResponse(text) {
  if (!text.trim()) return null;
  try {
    return JSON.parse(text);
  } catch {
    const data = text.split(/\r?\n/).filter((line) => line.startsWith("data:"))
      .map((line) => line.slice(5).trim()).filter(Boolean).pop();
    if (!data) throw new Error("MCP 返回了无法解析的响应");
    return JSON.parse(data);
  }
}

async function rpc(token, method, params, sessionId) {
  const requestPayload = { jsonrpc: "2.0", id: Date.now(), method, params };
  const bodyPayload = JSON.stringify(requestPayload);
  let statusCode;
  try {
    const response = await new Promise((resolve, reject) => {
      const request = https.request(SERVER_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json, text/event-stream",
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(bodyPayload),
          ...(sessionId ? { "Mcp-Session-Id": sessionId } : {})
        }
      }, (response) => {
        let body = "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => { body += chunk; });
        response.on("end", () => resolve({ statusCode: response.statusCode, headers: response.headers, body }));
      });
      request.on("error", reject);
      request.end(bodyPayload);
    });
    statusCode = response.statusCode;
    const payload = parseResponse(response.body);
    writeLog({
      direction: "request/response",
      url: SERVER_URL,
      request: redact(requestPayload),
      httpStatus: statusCode,
      response: payload ?? response.body
    });
    if (statusCode < 200 || statusCode >= 300) throw new Error(`MCP HTTP ${statusCode}: ${response.body.slice(0, 300)}`);
    if (!payload) return { result: undefined, sessionId: response.headers["mcp-session-id"] ?? sessionId };
    if (payload.error) throw new Error(`MCP ${payload.error.code}: ${payload.error.message}`);
    return { result: payload.result, sessionId: response.headers["mcp-session-id"] ?? sessionId };
  } catch (error) {
    writeLog({
      direction: "request/error",
      url: SERVER_URL,
      request: redact(requestPayload),
      httpStatus: statusCode,
      error: error.message
    });
    throw error;
  }
}

function sendJson(response, status, value) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  response.end(JSON.stringify(value));
}

function extractText(result) {
  const texts = result?.content?.filter((item) => item.type === "text").map((item) => item.text) ?? [];
  if (texts.length === 1) {
    const text = texts[0];
    try { return JSON.parse(text); } catch {}
    const marker = "## Original Response";
    const originalIndex = text.lastIndexOf(marker);
    const start = text.indexOf("{", originalIndex >= 0 ? originalIndex + marker.length : 0);
    if (start >= 0) {
      let depth = 0;
      let inString = false;
      let escaped = false;
      for (let index = start; index < text.length; index += 1) {
        const char = text[index];
        if (inString) {
          if (escaped) escaped = false;
          else if (char === "\\") escaped = true;
          else if (char === '"') inString = false;
        } else if (char === '"') inString = true;
        else if (char === "{") depth += 1;
        else if (char === "}") {
          depth -= 1;
          if (depth === 0) {
            try { return JSON.parse(text.slice(start, index + 1)); } catch { break; }
          }
        }
      }
    }
    return text;
  }
  return texts.length ? texts : result;
}

function classifyIntent(text) {
  if (/优惠券|领券|可用券|优惠/.test(text)) return "coupon";
  if (/热量|卡路里|营养|控卡|减脂|蛋白质|健身/.test(text)) return "nutrition";
  return "meal";
}

function validateArguments(tool, args) {
  const schema = tool.inputSchema ?? {};
  const properties = schema.properties ?? {};
  const required = schema.required ?? [];
  const unknown = Object.keys(args).filter((key) => !Object.hasOwn(properties, key));
  const missing = required.filter((key) => args[key] === undefined || args[key] === null || args[key] === "");
  if (unknown.length) throw new Error(`参数不符合 ${tool.name} schema：${unknown.join(", ")}`);
  if (missing.length) throw new Error(`缺少 ${tool.name} 必填参数：${missing.join(", ")}`);
}

async function callTool(token, sessionId, tools, name, args) {
  const tool = tools.find((item) => item.name === name);
  if (!tool) throw new Error(`MCP 工具列表中没有 ${name}`);
  validateArguments(tool, args);
  const result = await rpc(token, "tools/call", { name, arguments: args }, sessionId);
  if (result.result?.isError) throw new Error(extractText(result.result));
  return { tool: name, arguments: args, result: extractText(result.result) };
}

function parseRequest(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (Buffer.byteLength(body) > 64 * 1024) {
        reject(new Error("请求内容过大"));
        request.destroy();
      }
    });
    request.on("end", () => {
      try { resolve(JSON.parse(body || "{}")); } catch { reject(new Error("请求 JSON 格式无效")); }
    });
    request.on("error", reject);
  });
}

async function handleRecommendation(request, response, context) {
  const input = await parseRequest(request);
  const userText = String(input.text ?? "").trim();
  const intent = classifyIntent(userText);
  let toolName;
  let args;

  if (intent === "nutrition") {
    toolName = "list-nutrition-foods";
    args = {};
  } else if (intent === "coupon") {
    toolName = "available-coupons";
    args = {};
  } else if (!input.storeCode) {
    const mode = input.fulfillment;
    const city = String(input.city ?? "").trim();
    if (!mode || (mode !== "delivery" && !city)) {
      sendJson(response, 200, {
        status: "needs_input", intent,
        message: "普通餐品推荐需要先选择取餐方式；到店查询还需提供城市。MCP 查询要求真实门店，不能使用模拟门店。"
      });
      return;
    }
    if (mode === "delivery") {
      const nextTool = input.addressId ? "delivery-query-stores" : "delivery-query-addresses";
      const nextArgs = input.addressId ? { addressId: String(input.addressId), beType: 2 } : {};
      const called = await callTool(context.token, context.sessionId, context.tools, nextTool, nextArgs);
      writeLog({ direction: "routing", intent, userInput: redact(input), selectedTool: called.tool, arguments: called.arguments });
      sendJson(response, 200, { status: input.addressId ? "select_store" : "select_address", intent, ...called });
      return;
    }
    const beType = mode === "drive" ? 5 : 1;
    toolName = "query-nearby-stores";
    args = { searchType: 2, city, keyword: city, beType };
    const called = await callTool(context.token, context.sessionId, context.tools, toolName, args);
    writeLog({ direction: "routing", intent, userInput: redact(input), selectedTool: toolName, arguments: args });
    sendJson(response, 200, { status: "select_store", intent, ...called });
    return;
  } else {
    const mode = input.fulfillment;
    if (!mode) {
      sendJson(response, 200, { status: "needs_input", intent, message: "请选择到店自取、得来速或麦乐送，才能按 MCP 要求查询真实门店餐品。" });
      return;
    }
    const beType = mode === "drive" ? 5 : mode === "delivery" ? 2 : 1;
    const argsObject = {
      storeCode: String(input.storeCode),
      orderType: mode === "delivery" ? 2 : 1,
      beType
    };
    if (beType !== 1) {
      if (!input.beCode) {
        sendJson(response, 200, { status: "needs_input", intent, message: "该履约方式需要门店查询返回的 beCode，请先选门店或补充对应编码。" });
        return;
      }
      argsObject.beCode = String(input.beCode);
    }
    if (input.reservationDate) argsObject.reservationDate = String(input.reservationDate);
    toolName = "query-meals";
    args = argsObject;
  }

  const called = await callTool(context.token, context.sessionId, context.tools, toolName, args);
  writeLog({ direction: "routing", intent, userInput: redact(input), selectedTool: toolName, arguments: args });
  sendJson(response, 200, { status: "completed", intent, ...called });
}

async function main() {
  loadDotEnv();
  const token = process.env.MCD_MCP_TOKEN;
  if (!token) throw new Error("缺少 MCD_MCP_TOKEN，请在 .env 或环境变量中配置 MCP Token。");
  const initialized = await rpc(token, "initialize", {
    protocolVersion: "2025-03-26",
    capabilities: {},
    clientInfo: { name: "mcmoment", version: "0.1.0" }
  });
  await rpc(token, "notifications/initialized", {}, initialized.sessionId).catch((error) => {
    if (!String(error.message).includes("HTTP 202")) throw error;
  });
  const listed = await rpc(token, "tools/list", {}, initialized.sessionId);
  const tools = listed.result?.tools ?? [];
  const context = { token, sessionId: listed.sessionId ?? initialized.sessionId, tools };
  const port = Number(process.env.PORT || 3000);
  const server = http.createServer(async (request, response) => {
    try {
      const pathname = new URL(request.url, "http://localhost").pathname;
      if (request.method === "POST" && pathname === "/api/recommend") {
        await handleRecommendation(request, response, context);
        return;
      }
      if (request.method !== "GET" && request.method !== "HEAD") {
        sendJson(response, 405, { error: "Method not allowed" });
        return;
      }
      const relative = pathname === "/" ? "index.html" : decodeURIComponent(pathname.slice(1));
      const target = path.resolve(WEB_ROOT, relative);
      if (!target.startsWith(`${WEB_ROOT}${path.sep}`) || !fs.existsSync(target) || !fs.statSync(target).isFile()) {
        response.writeHead(404); response.end("Not found"); return;
      }
      const contentTypes = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" };
      response.writeHead(200, { "Content-Type": contentTypes[path.extname(target)] ?? "application/octet-stream" });
      if (request.method === "HEAD") response.end(); else fs.createReadStream(target).pipe(response);
    } catch (error) {
      writeLog({ direction: "application/error", error: error.message });
      if (!response.headersSent) sendJson(response, 500, { error: error.message });
      else response.destroy();
    }
  });
  server.listen(port, "127.0.0.1", () => {
    console.log(`MCP 已连接：${SERVER_URL}（${tools.length} 个工具）`);
    console.log(`McMoment：http://127.0.0.1:${port}`);
    console.log(`调用日志：${LOG_PATH}`);
  });
}

main().catch((error) => {
  console.error(`MCP 连接失败：${error.message}`);
  process.exitCode = 1;
});
