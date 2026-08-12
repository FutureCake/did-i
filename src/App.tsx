import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigation from './shared/navigation';

SplashScreen.preventAutoHideAsync();

export default function App() {

    const [loaded, error] = useFonts({
        'inter': require('./assets/fonts/inter-regular.ttf'),
        'inter-bold': require('./assets/fonts/inter-bold.ttf'),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded) {
        return null;
    }

    if (error) {
        console.error(error);
        return null;
    }

    return (
        <KeyboardProvider>
            <GestureHandlerRootView>
                <SafeAreaProvider style={StyleSheet.absoluteFill}>
                    <RootNavigation />
                </SafeAreaProvider>
            </GestureHandlerRootView>
        </KeyboardProvider>
    );
}
