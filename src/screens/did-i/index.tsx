import { useNavigation } from "@react-navigation/native";
import BottomSheet from "../../shared/components/bottom-sheet";
import Button from "../../shared/components/button";
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
                <BottomSheet onAddAction={() => navigate("new-action")} >
                    <Button title="History" onPress={() => navigate("i-did")} />
                </BottomSheet>
            }
        >
            {
                actions.map((action, index) => (
                    <ActionItem
                        {...action}
                        key={`action-${index}`}
                        onComplete={() => addCompletedAction(action.id)}
                        onDelete={() => { }}
                        onEdit={() => { }}
                    />
                ))
            }
        </ScreenLayout>
    );
}