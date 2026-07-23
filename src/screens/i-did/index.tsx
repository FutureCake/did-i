import { Text } from "react-native";
import BottomSheet from "../../shared/components/bottom-sheet";
import ScreenLayout from "../../shared/components/screen-layout";
import { formatISODate } from "../../shared/logic/time";
import { useActionsStore } from "../../shared/stores/actions";

export function IDid() {
    const { completedActions } = useActionsStore();
    const reversedCompletedActions = [...completedActions].reverse();
    return (
        <ScreenLayout header="I Did" headerSticky footer={<BottomSheet />}>
            {reversedCompletedActions.map((action, idx) => (
                <Text key={`completed-action-${action.id}-${idx}`}>{`${formatISODate(action.completedAt)} I did ${action.title}`}</Text>
            ))}
        </ScreenLayout>
    );
}