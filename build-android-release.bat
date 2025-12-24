
@echo off
setlocal
echo ==========================================
echo    2048 Android RELEASE Build Script
echo ==========================================

REM Set Environment
set "JAVA_HOME=C:\Program Files\Android\Android Studio\jbr"
set "ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk"
set "PATH=%JAVA_HOME%\bin;%ANDROID_HOME%\platform-tools;%PATH%"

echo [INFO] Building Web Assets (Vite)...
call npm run build
IF %ERRORLEVEL% NEQ 0 exit /b %ERRORLEVEL%

echo [INFO] Syncing to Capacitor Android...
call npx cap sync android
IF %ERRORLEVEL% NEQ 0 exit /b %ERRORLEVEL%

echo [INFO] Building Release APK with Gradle...
cd android
call gradlew assembleRelease > ..\build_release_log.txt 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Release build failed. Check build_release_log.txt
    cd ..
    pause
    exit /b %ERRORLEVEL%
)
cd ..

echo ==========================================
echo         RELEASE BUILD SUCCESSFUL
echo ==========================================
echo [SUCCESS] This APK is SIGNED and ready for release!
echo Location:
echo %CD%\android\app\build\outputs\apk\release\app-release.apk
echo ==========================================
pause
