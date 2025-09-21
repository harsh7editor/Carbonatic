@echo off
echo ========================================
echo    Smart City Traveler - Live Demo
echo ========================================
echo.

:: Detect backend port (prefer 8080, fallback 8081)
for /f "tokens=*" %%A in ('powershell -NoProfile -Command "(Get-NetTCPConnection -State Listen -LocalPort 8080 -ErrorAction SilentlyContinue) -ne $null"') do set PORT_8080_IN_USE=%%A
if /I "%PORT_8080_IN_USE%"=="True" (
  set BACKEND_PORT=8081
) else (
  set BACKEND_PORT=8080
)

:: Detect frontend port (prefer 3000, fallback 3001)
for /f "tokens=*" %%A in ('powershell -NoProfile -Command "(Get-NetTCPConnection -State Listen -LocalPort 3000 -ErrorAction SilentlyContinue) -ne $null"') do set PORT_3000_IN_USE=%%A
if /I "%PORT_3000_IN_USE%"=="True" (
  set FRONTEND_PORT=3001
) else (
  set FRONTEND_PORT=3000
)

echo Using Backend Port: %BACKEND_PORT%
echo Using Frontend Port: %FRONTEND_PORT%
echo.

echo Starting Mock Backend Server (Port %BACKEND_PORT%)...
start "Mock Backend Server" cmd /k "cd /d D:\SMARTY -CITY TRAVELLER && set PORT=%BACKEND_PORT% && node mock-backend.js"
timeout /t 2 /nobreak > nul

echo Installing Frontend Dependencies (first run may take a minute)...
start "Frontend Install" cmd /c "cd /d D:\SMARTY -CITY TRAVELLER\smart-city-traveler-frontend && npm install --no-audit --no-fund"

:: Wait a bit to let install finish for typical fast cases
timeout /t 5 /nobreak > nul

echo Starting Frontend Dev Server (Port %FRONTEND_PORT%)...
start "Frontend Server" cmd /k "cd /d D:\SMARTY -CITY TRAVELLER\smart-city-traveler-frontend && set PORT=%FRONTEND_PORT% && npm start"
timeout /t 2 /nobreak > nul

echo.
echo ========================================
echo    🚀 LIVE DEMO IS RUNNING!
echo ========================================
echo.
echo Frontend: http://localhost:%FRONTEND_PORT%
echo Backend API: http://localhost:%BACKEND_PORT%/api
echo.
echo Features Available:
echo ✅ User Authentication (Login/Register)
echo ✅ Place Discovery ^& Search
echo ✅ Trip Planning ^& Management
echo ✅ Reviews ^& Ratings
echo ✅ Responsive Modern UI
echo ✅ Full-Stack Integration
echo.
echo Press any key to open the application...
pause > nul

start http://localhost:%FRONTEND_PORT%
echo.
echo Application opened in your browser!
echo.
echo To stop the servers, close the command windows.
pause
