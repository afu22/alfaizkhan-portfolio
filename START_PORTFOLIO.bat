@echo off
title ALFAIZKHAN - Developer Portfolio
color 0A
echo ================================================================
echo           ALFAIZKHAN - DEVELOPER PORTFOLIO
echo   B.Tech Computer Science Engineering  Aspiring AI/ML Engineer
echo ================================================================
echo.

cd /d "%~dp0"

echo [1/3] Verifying production build...
if not exist "dist\index.html" (
    echo Building latest portfolio bundle...
    call npm run build
) else (
    echo Build files ready.
)

echo.
echo [2/3] Starting Local Portfolio Server on Port 5173...
start "ALFAIZKHAN Portfolio Server" cmd /k "cd /d %~dp0 && node server.js"

echo.
echo [3/3] Opening your portfolio in default browser...
timeout /t 2 /nobreak > nul
start http://localhost:5173

echo.
echo ================================================================
echo   SUCCESS! Your portfolio is live:
echo.
echo   Public Website:      http://localhost:5173
echo   Private Admin Suite: http://localhost:5173/admin
echo   Default Passcode:    alfaiz@2026
echo.
echo   From the Admin Suite you can:
echo   - Add, edit, or delete projects dynamically
echo   - Toggle project featured status with 1-click
echo   - Update your profile, bio, education and social links
echo   - Control public privacy (show/hide email, phone, resume)
echo.
echo   Keep the server window open while browsing your website!
echo ================================================================
echo.
pause

