
@echo off
setlocal
echo ==========================================
echo       2048 Android Build Script
echo ==========================================

REM Check if Android platform exists
IF NOT EXIST "android" (
    echo [INFO] Android platform not found. Initializing...
    call npx cap add android
    IF %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to add Android platform.
        pause
        exit /b %ERRORLEVEL%
    )
)

echo [INFO] Building Web Assets (Vite)...
call npm run build
IF %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Web build failed.
    pause
    exit /b %ERRORLEVEL%
)


echo [INFO] Setting JAVA_HOME to Android Studio JBR...
set "JAVA_HOME=C:\Program Files\Android\Android Studio\jbr"
set "PATH=%JAVA_HOME%\bin;%PATH%"

echo [INFO] Setting ANDROID_HOME...
set "ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk"
set "PATH=%ANDROID_HOME%\platform-tools;%PATH%"

java -version

echo [INFO] Syncing assets to Capacitor Android...
call npx cap sync android

IF %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Capacitor sync failed.
    pause
    exit /b %ERRORLEVEL%
)

echo [INFO] Building APK with Gradle (Debug)...
cd android
call gradlew assembleDebug > ..\build_log.txt 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Gradle build failed. Check ..\build_log.txt for details.
    type ..\build_log.txt
    cd ..
    exit /b %ERRORLEVEL%
)
cd ..

echo ==========================================
echo            BUILD SUCCESSFUL
echo ==========================================
echo APK Location:
echo %CD%\android\app\build\outputs\apk\debug\app-debug.apk
echo ==========================================
pause
