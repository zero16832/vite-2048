
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.game.vite2048',
    appName: '2048 Cute',
    webDir: 'dist',
    server: {
        androidScheme: 'https'
    },
    plugins: {
        SplashScreen: {
            launchShowDuration: 2000,
            launchAutoHide: true,
            backgroundColor: "#fffbf0",
            androidScaleType: "CENTER_CROP"
        }
    }
};

export default config;
