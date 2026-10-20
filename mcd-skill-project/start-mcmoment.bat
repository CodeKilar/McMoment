@echo off
setlocal EnableExtensions

cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js 18 or newer was not found.
  pause
  exit /b 1
)

if not exist ".env" (
  echo [ERROR] .env was not found.
  echo Configure MCD_MCP_TOKEN in mcd-skill-project\.env.
  pause
  exit /b 1
)

findstr /r /c:"^[ ]*MCD_MCP_TOKEN[ ]*=[ ]*[^ ]" ".env" >nul
if errorlevel 1 (
  echo [ERROR] .env does not contain MCD_MCP_TOKEN.
  pause
  exit /b 1
)

powershell -NoProfile -ExecutionPolicy Bypass -Command "Start-Process -FilePath 'node' -ArgumentList 'src/index.js' -WorkingDirectory '%CD%' -WindowStyle Hidden"
if errorlevel 1 (
  echo [ERROR] Could not start McMoment service.
  pause
  exit /b 1
)

echo Waiting for the local service...
for /l %%N in (1,1,30) do (
  powershell -NoProfile -ExecutionPolicy Bypass -Command "$c = Get-NetTCPConnection -LocalAddress 127.0.0.1 -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue; if ($c) { exit 0 } else { exit 1 }" >nul 2>nul
  if not errorlevel 1 goto :open
  timeout /t 1 /nobreak >nul
)

echo [INFO] Service is still starting. The browser will open now.

:open
start "" "http://127.0.0.1:3000/"
exit /b 0
