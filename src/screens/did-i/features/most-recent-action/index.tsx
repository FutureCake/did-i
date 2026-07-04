import { Pressable, PressableProps, Text } from "react-native";
import { useActionsStore } from "../../../../shared/stores/actions";

export interface MostRecentActionProps extends PressableProps {
}

export default function MostRecentAction(props: MostRecentActionProps) {

    const { completedActions } = useActionsStore();

    if (completedActions.length === 0) {
        return null;
    }

    const mostRecentAction = completedActions[0];

    return (
        <Pressable {...props}>
            <Text>{mostRecentAction.name}</Text>
        </Pressable>
    );
}