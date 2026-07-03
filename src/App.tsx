import { StyleSheet } from 'react-native';
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigation from './shared/features/navigation';

export default function App() {
    return (
        <KeyboardProvider>
            <SafeAreaProvider style={StyleSheet.absoluteFill}>
                <RootNavigation />
            </SafeAreaProvider>
        </KeyboardProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
