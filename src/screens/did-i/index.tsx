import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
import { useActionsStore } from "../../shared/stores/actions";
import AddAction from "./features/add-action";
import DidIList from "./features/did-i-list";
import MostRecentAction from "./features/most-recent-action";

export function DidI() {

    const { navigate } = useNavigation();
    const { actions, addCompletedAction } = useActionsStore();

    return (
        <SafeAreaView edges={['top']}>
            <KeyboardAwareScrollView>
                <View>
                    <Text>Did I?</Text>
                </View>
                <DidIList actions={actions} onPressAction={addCompletedAction} />
            </KeyboardAwareScrollView>
            <MostRecentAction />
            <AddAction onAddAction={() => navigate("new-action")} />
        </SafeAreaView>
    );
}