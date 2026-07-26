import { StackActions, useNavigation } from "@react-navigation/native";
import BottomSheet from "../../shared/components/bottom-sheet";
import Button from "../../shared/components/button";
import ScreenLayout from "../../shared/components/screen-layout";
import { useActionsStore } from "../../shared/stores/actions";
import CompletedAction from "./components/completed-action";

export function IDid() {

    const { dispatch } = useNavigation();
    const { completedActions } = useActionsStore();
    const reversedCompletedActions = [...completedActions].reverse();

    return (
        <ScreenLayout
            header="I Did"
            headerSticky
            footer={
                <BottomSheet>
                    <Button title={"<- Back"} onPress={() => dispatch(StackActions.pop(1))} />
                </BottomSheet>
            }
        >
            {reversedCompletedActions.map((action, idx) => (
                <CompletedAction
                    key={`completed-action-${action.id}-${idx}`}
                    title={action.title}
                    color={action.color}
                    completedAt={action.completedAt}
                    id={action.id}
                />
            ))}
        </ScreenLayout>
    );
}