@echo off

echo Starting deployment process...

for /f "tokens=*" %%i in ('git branch --show-current') do set CURRENT_BRANCH=%%i
if not "%CURRENT_BRANCH%"=="main" (
    echo Error: You must be on the main branch to deploy
    echo Please run: git checkout main
    pause
    exit /b 1
)

git diff-index --quiet HEAD
if errorlevel 1 (
    echo Error: You have uncommitted changes
    echo Please commit or stash your changes before deploying
    pause
    exit /b 1
)

echo Switching to production branch...
git checkout production

echo Merging latest changes from main...
git merge main

echo Pushing to production branch to trigger deployment...
git push origin production

echo Switching back to main branch...
git checkout main

echo Deployment triggered successfully!
echo Your site will be available at: https://gamedevsam.com/
echo Check deployment status at: https://github.com/samthesomebody/portfolio-website/actions
pause 