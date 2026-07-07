import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTokenStyles } from "../../shared/hooks/use-token-styles";
import { useActionsStore } from "../../shared/stores/actions";
import AddAction from "./components/add-action";
import DidIList from "./components/did-i-list";
import Header from "./components/header";
import MostRecentAction from "./components/most-recent-action";
import { buildDidIStyles, resolveDidITokens } from "./styles";

export function DidI() {

    const { navigate } = useNavigation();
    const { top } = useSafeAreaInsets();
    const { actions, addCompletedAction } = useActionsStore();
    const { styles } = useTokenStyles({
        resolver: resolveDidITokens,
        builder: buildDidIStyles
    });

    return (
        <View style={[{ flex: 1 }]}>
            <KeyboardAwareScrollView
                contentContainerStyle={[styles.container, { paddingTop: top }]}
            >
                <Header />
                <DidIList actions={actions} onPressAction={addCompletedAction} />
            </KeyboardAwareScrollView>
            <MostRecentAction onHistoryPress={() => navigate("i-did")} />
            <AddAction onAddAction={() => navigate("new-action")} />
        </View>
    );
}