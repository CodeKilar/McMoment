import fs from "node:fs";
import https from "node:https";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SERVER_URL = "https://mcp.mcd.cn";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOG_PATH = path.resolve(__dirname, "../logs/mcp-requests.jsonl");
const WEB_ROOT = path.resolve(__dirname, "../web");
const CHARACTER_ASSET_ROOT = path.resolve(__dirname, "../../png");

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

function parseNutritionRows(data) {
  if (typeof data !== "string") return [];
  const match = data.match(/^\[\d+\]\{([^}]+)\}:\s*([\s\S]*)$/);
  if (!match) return [];
  const fields = match[1].split(",");
  return match[2].split(/\r?\n/).map((line) => line.trim()).filter(Boolean).map((line) => {
    const values = line.split(",");
    return Object.fromEntries(fields.map((field, index) => {
      const value = values[index]?.trim() ?? "";
      return [field, value === "null" ? null : ["energyKj", "energyKcal", "protein", "fat", "carbohydrate", "sodium", "calcium"].includes(field) && value !== "" ? Number(value) : value];
    }));
  });
}

function buildMealCombos(products, people, calorieLimit, preferences = "", recommendationCount = 3) {
  const drinkPattern = /可乐|雪碧|怡泉|咖啡|茶|牛奶|豆浆|果汁|饮料|柠檬|美式|拿铁|奶铁|燕麦奶|抹茶牛奶/;
  const sidePattern = /薯条|薯饼|玉米杯|麦乐鸡|鸡翅|鸡块|派|鸡球|苹果片|沙拉|脆汁鸡|V翅/;
  const mains = products.filter((item) => item.productName && !drinkPattern.test(item.productName) && !sidePattern.test(item.productName));
  const sides = products.filter((item) => item.productName && sidePattern.test(item.productName));
  const drinks = products.filter((item) => item.productName && drinkPattern.test(item.productName));
  const combos = [];
  const preferenceText = String(preferences).toLocaleLowerCase();
  const preferenceTerms = [
    [/[辣麻辣香辣辣味]/, /辣|麻辣|香辣|麦辣/],
    [/牛肉|牛堡|厚牛/, /牛肉|牛堡|厚牛|安格斯/],
    [/鸡肉|鸡腿|鸡翅|鸡块|鸡/, /鸡|麦乐鸡/],
    [/鱼|麦香鱼/, /鱼|鳕鱼/],
    [/素食|蔬菜|清淡|沙拉/, /玉米|沙拉|苹果|蔬菜/],
    [/咖啡|美式|拿铁/, /咖啡|美式|拿铁/],
    [/无糖|零糖|不加糖/, /无糖|零糖|不加糖/]
  ];
  const matchedPreferences = preferenceTerms.filter(([requestPattern]) => requestPattern.test(preferenceText));
  const preferenceScore = (items) => {
    const text = items.map((item) => item.productName).join(" ").toLocaleLowerCase();
    return matchedPreferences.reduce((score, [, foodPattern]) => score + (foodPattern.test(text) ? 1 : 0), 0);
  };
  for (const main of mains) {
    for (const side of sides) {
      for (const drink of drinks) {
        const items = [main, side, drink];
        const energyKcal = items.reduce((sum, item) => sum + (Number(item.energyKcal) || 0), 0);
        if (calorieLimit && energyKcal * people > calorieLimit) continue;
        combos.push({
          productName: items.map((item) => item.productName).join(" + "),
          items: items.map((item) => item.productName),
          energyKcal,
          protein: items.reduce((sum, item) => sum + (Number(item.protein) || 0), 0),
          totalEnergyKcal: energyKcal * people,
          preferenceScore: preferenceScore(items),
          varietyKey: items.map((item) => item.productName).join("|")
        });
      }
    }
  }
  // Collapse duplicate source rows and randomize only within the same preference score,
  // so explicit preferences stay relevant while the source list order has no bias.
  const uniqueCombos = [...new Map(combos.map((combo) => [combo.varietyKey, combo])).values()];
  const scoreGroups = new Map();
  for (const combo of uniqueCombos) {
    if (!scoreGroups.has(combo.preferenceScore)) scoreGroups.set(combo.preferenceScore, []);
    scoreGroups.get(combo.preferenceScore).push(combo);
  }
  const rankedScores = [...scoreGroups.keys()].sort((left, right) => right - left);
  const randomized = [];
  for (const score of rankedScores) {
    const group = scoreGroups.get(score);
    for (let index = group.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [group[index], group[swapIndex]] = [group[swapIndex], group[index]];
    }
    randomized.push(...group);
  }
  return randomized.slice(0, Math.max(1, recommendationCount)).map(({ preferenceScore: _score, varietyKey: _key, ...combo }) => combo);
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
  const intent = "meal_recommendation";
  const toolName = "list-nutrition-foods";
  const args = {};
  const people = Math.max(1, Number.parseInt(String(input.people ?? "1"), 10) || 1);
  const budget = Number(input.budget) > 0 ? Number(input.budget) : null;
  const calorieLimit = Number(input.calories) > 0 ? Number(input.calories) : null;
  const called = await callTool(context.token, context.sessionId, context.tools, toolName, args);
  const products = parseNutritionRows(called.result?.data);
  const recommendationCount = input.distinctMeals ? people : 3;
  const recommendations = buildMealCombos(products, people, calorieLimit, userText, recommendationCount);
  writeLog({ direction: "routing", intent, userInput: redact(input), selectedTool: toolName, arguments: args });
  sendJson(response, 200, {
    status: "completed", intent, tool: called.tool, arguments: called.arguments,
    filters: { people, budget, calorieLimit },
    budgetNote: budget ? "MCP 当前营养数据不包含价格，无法验证预算；未将餐品标记为预算内。" : undefined,
    recommendationNote: "餐品组合基于 MCP 营养数据，并按用户偏好筛选、随机抽取；非真实订单。",
    recommendations,
    result: called.result
  });
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
      if (pathname === "/api/character-assets" && request.method === "GET") {
        const origin = request.headers.origin;
        const allowedOrigins = new Set(["null", `http://127.0.0.1:${port}`, `http://localhost:${port}`]);
        if (origin && !allowedOrigins.has(origin)) { sendJson(response, 403, { error: "Origin not allowed" }); return; }
        if (origin) { response.setHeader("Access-Control-Allow-Origin", origin); response.setHeader("Vary", "Origin"); }
        const assets = fs.existsSync(CHARACTER_ASSET_ROOT)
          ? fs.readdirSync(CHARACTER_ASSET_ROOT, { withFileTypes: true })
            .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".png"))
            .map((entry) => entry.name)
            .sort((left, right) => left.localeCompare(right, "zh-CN"))
          : [];
        sendJson(response, 200, { assets });
        return;
      }
      if (pathname.startsWith("/assets/character/") && (request.method === "GET" || request.method === "HEAD")) {
        let fileName;
        try { fileName = decodeURIComponent(pathname.slice("/assets/character/".length)); }
        catch { response.writeHead(400); response.end("Bad request"); return; }
        const target = path.resolve(CHARACTER_ASSET_ROOT, fileName);
        if (path.basename(fileName) !== fileName || path.extname(fileName).toLowerCase() !== ".png" || !fs.existsSync(target) || !fs.statSync(target).isFile()) {
          response.writeHead(404); response.end("Not found"); return;
        }
        response.writeHead(200, { "Content-Type": "image/png", "Cache-Control": "no-cache" });
        if (request.method === "HEAD") response.end(); else fs.createReadStream(target).pipe(response);
        return;
      }
      if (pathname === "/api/recommend") {
        const origin = request.headers.origin;
        const allowedOrigins = new Set(["null", `http://127.0.0.1:${port}`, `http://localhost:${port}`]);
        if (origin && !allowedOrigins.has(origin)) {
          sendJson(response, 403, { error: "Origin not allowed" });
          return;
        }
        if (origin) {
          response.setHeader("Access-Control-Allow-Origin", origin);
          response.setHeader("Vary", "Origin");
          response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
          response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        }
        if (request.method === "OPTIONS") {
          response.writeHead(204);
          response.end();
          return;
        }
      }
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
      const contentTypes = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".png": "image/png" };
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
