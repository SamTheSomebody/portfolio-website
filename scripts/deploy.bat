@echo off
REM Deploy script for portfolio website (Windows version)
REM This script helps with the two-branch deployment strategy

echo 🚀 Starting deployment process...

REM Check if we're on main branch
for /f "tokens=*" %%i in ('git branch --show-current') do set CURRENT_BRANCH=%%i
if not "%CURRENT_BRANCH%"=="main" (
    echo ❌ Error: You must be on the main branch to deploy
    echo Please run: git checkout main
    pause
    exit /b 1
)

REM Check if there are uncommitted changes
git diff-index --quiet HEAD
if errorlevel 1 (
    echo ❌ Error: You have uncommitted changes
    echo Please commit or stash your changes before deploying
    pause
    exit /b 1
)

REM Switch to production branch
echo 📦 Switching to production branch...
git checkout production

REM Merge latest changes from main
echo 🔄 Merging latest changes from main...
git merge main

REM Push to trigger deployment
echo 🚀 Pushing to production branch to trigger deployment...
git push origin production

REM Switch back to main
echo 🔄 Switching back to main branch...
git checkout main

echo ✅ Deployment triggered successfully!
echo 🌐 Your site will be available at: https://samthesomebody.github.io/portfolio-website/
echo 📊 Check deployment status at: https://github.com/samthesomebody/portfolio-website/actions
pause 