@echo off
REM Installation Script for Alexander & Troy Tours Website
REM This script installs all required dependencies for the admin panel

echo ================================================
echo Alexander ^& Troy Tours - Setup Script
echo ================================================
echo.

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo X npm is not installed. Please install Node.js first.
    pause
    exit /b 1
)

echo [OK] npm is installed
echo.

REM Install main dependencies
echo Installing main dependencies...
echo.

echo Installing next-auth...
call npm install next-auth

echo Installing @octokit/rest...
call npm install @octokit/rest

echo.

REM Install dev dependencies
echo Installing dev dependencies...
echo.

echo Installing @types/next-auth...
call npm install --save-dev @types/next-auth

echo.

REM Check if .env.local exists
if not exist .env.local (
    echo [WARNING] .env.local not found
    echo Creating .env.local from template...
    
    if exist .env.local.example (
        copy .env.local.example .env.local
        echo [OK] Created .env.local from .env.local.example
        echo.
        echo [WARNING] IMPORTANT: Edit .env.local and add your configuration
    ) else (
        echo [ERROR] .env.local.example not found
    )
) else (
    echo [OK] .env.local already exists
)

echo.
echo ================================================
echo Installation Complete!
echo ================================================
echo.
echo Next steps:
echo.
echo 1. Generate NEXTAUTH_SECRET (in Git Bash or WSL):
echo    openssl rand -base64 32
echo.
echo 2. Create GitHub OAuth App:
echo    https://github.com/settings/developers
echo.
echo 3. Generate GitHub Personal Access Token:
echo    https://github.com/settings/tokens
echo.
echo 4. Edit .env.local with your credentials
echo.
echo 5. Start the development server:
echo    npm run dev
echo.
echo 6. Visit the admin panel:
echo    http://localhost:3000/admin/login
echo.
echo For detailed instructions, read:
echo    docs\IMPLEMENTATION_CHECKLIST.md
echo.

pause
