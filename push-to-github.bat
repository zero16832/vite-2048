
@echo off
setlocal enabledelayedexpansion

echo ==========================================
echo    SMART GITHUB PUSH AND CREATE SCRIPT
echo ==========================================

REM 1. Check if git is initialized
if not exist .git (
    echo [INFO] Initializing Git repository
    git init
    git branch -M main
)

REM 2. Check if remote exists
git remote get-url origin >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [INFO] No remote repository detected
    
    where gh >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        echo [Detected] GitHub CLI gh found
        set /p "create_choice=Do you want to create a NEW repo on GitHub using CLI? (y/n): "
        if /i "!create_choice!"=="y" (
            set /p "repo_name=Enter a name for your new repo: "
            if "!repo_name!"=="" set "repo_name=2048-cute"
            
            echo [INFO] Creating repository on GitHub
            gh repo create "!repo_name!" --public --source=. --remote=origin
            if %ERRORLEVEL% NEQ 0 (
                echo [ERROR] Repository creation failed
                pause
                exit /b 1
            )
        ) else (
            set /p "remote_url=Please enter your existing GitHub Repo URL: "
            git remote add origin !remote_url!
        )
    ) else (
        echo [WARNING] GitHub CLI gh not found
        set /p "remote_url=Please enter your GitHub Repo URL: "
        if "!remote_url!"=="" (
            echo [ERROR] URL cannot be empty
            pause
            exit /b 1
        )
        git remote add origin !remote_url!
    )
)

echo [INFO] Adding files
git add .

set /p "commit_msg=Enter commit message (default: Update 2048 Game): "
if "!commit_msg!"=="" set "commit_msg=Update 2048 Game"

echo [INFO] Committing changes
git commit -m "!commit_msg!"
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Commit failed. Please check if your git identity is set
    echo Run: git config --global user.email "you@example.com"
    echo Run: git config --global user.name "Your Name"
    pause
    exit /b 1
)

echo [INFO] Pushing to GitHub
git push -u origin main

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Push failed
) else (
    echo ==========================================
    echo         SUCCESSFULLY PUSHED
    echo ==========================================
    echo Your iOS Build should start shortly
)

pause
