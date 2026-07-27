import { useNavigation } from "@react-navigation/native";
import BottomSheet from "../../shared/components/bottom-sheet";
import Button from "../../shared/components/button";
import ScreenLayout from "../../shared/components/screen-layout";
import { useActionsStore } from "../../shared/stores/actions";
import ActionItem from "./components/action-item";

export function DidI() {

    const { navigate } = useNavigation();
    const { actions, addCompletedAction, removeAction } = useActionsStore();

    return (
        <ScreenLayout
            header="Did I?"
            headerSticky
            footer={
                <BottomSheet>
                    <Button title="Create action" onPress={() => navigate("action-editor")} />
                    <Button variant="shy" title="Actions history" onPress={() => navigate("i-did")} />
                </BottomSheet>
            }
        >
            {
                actions.map((action, index) => (
                    <ActionItem
                        {...action}
                        key={`action-${index}`}
                        onComplete={(id) => addCompletedAction(id)}
                        onDelete={(id) => removeAction(id)}
                        onEdit={(id) => navigate("action-editor", { actionId: id })}
                    />
                ))
            }
        </ScreenLayout>
    );
}