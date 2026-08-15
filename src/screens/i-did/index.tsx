import { StackActions, useNavigation } from "@react-navigation/native";
import BottomSheet from "../../shared/components/bottom-sheet";
import Button from "../../shared/components/button";
import ScreenLayout from "../../shared/components/screen-layout";
import { useActionsStore } from "../../shared/stores/actions";
import { CompletedActionData } from "../../types/actions";
import CompletedAction from "./components/completed-action";
import NoHistory from "./components/no-history";

export function IDid() {

    const { dispatch } = useNavigation();
    const { completedActions, actions, deletedActions, clearHistory } = useActionsStore();

    const resolvedActions = [...completedActions].reverse().reduce<CompletedActionData[]>((acc, record) => {
        const action = actions.find((a) => a.id === record.id) ?? deletedActions.find((a) => a.id === record.id);
        if (action) acc.push({ ...action, completedAt: record.completedAt });
        return acc;
    }, []);

    const hasHistory = resolvedActions.length > 0;

    return (
        <ScreenLayout
            header="I Did"
            headerSticky
            footer={
                <BottomSheet>
                    <Button title={"<- Back"} onPress={() => dispatch(StackActions.pop(1))} />
                    <Button variant="shy" title="Clear history" onPress={clearHistory} />
                </BottomSheet>
            }
        >
            {hasHistory ?
                resolvedActions.map((action, idx) => (
                    <CompletedAction
                        key={`completed-action-${action.id}-${idx}`}
                        title={action.title}
                        color={action.color}
                        completedAt={action.completedAt}
                        id={action.id}
                    />
                )) : (
                    <NoHistory />
                )
            }
        </ScreenLayout>
    );
}