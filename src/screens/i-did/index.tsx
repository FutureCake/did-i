import BottomSheet from "../../shared/components/bottom-sheet";
import ScreenLayout from "../../shared/components/screen-layout";
import { useActionsStore } from "../../shared/stores/actions";
import CompletedAction from "./components/completed-action";

export function IDid() {
    const { completedActions } = useActionsStore();
    const reversedCompletedActions = [...completedActions].reverse();
    return (
        <ScreenLayout header="I Did" headerSticky footer={<BottomSheet />}>
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