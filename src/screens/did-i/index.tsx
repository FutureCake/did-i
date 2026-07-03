import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
import { useActionsStore } from "../../shared/stores/actions";
import DidIList from "./features/did-i-list";

export function DidI() {

    const { actions, addActionType, addCompletedAction } = useActionsStore();

    return (
        <SafeAreaView edges={['top']}>
            <KeyboardAwareScrollView>
                <View>
                    <Text>Did I?</Text>
                </View>
                <DidIList actions={actions} onPressAction={addCompletedAction} />
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}