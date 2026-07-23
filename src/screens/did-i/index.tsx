import { useNavigation } from "@react-navigation/native";
import BottomSheet from "../../shared/components/bottom-sheet";
import ScreenLayout from "../../shared/components/screen-layout";
import { useActionsStore } from "../../shared/stores/actions";
import ActionItem from "./components/action-item";

export function DidI() {

    const { navigate } = useNavigation();
    const { actions, addCompletedAction } = useActionsStore();

    return (
        <ScreenLayout
            header="Did I?"
            headerSticky
            footer={
                <>
                    <BottomSheet onAddAction={() => navigate("new-action")} />
                </>
            }
        >
            {
                actions.map((action, index) => (
                    <ActionItem
                        {...action}
                        key={`action-${index}`}
                        onPress={() => addCompletedAction(action.id)}
                    />
                ))
            }
        </ScreenLayout>
    );
}