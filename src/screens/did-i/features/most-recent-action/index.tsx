import { Pressable, PressableProps, Text } from "react-native";
import { useActionsStore } from "../../../../shared/stores/actions";

export interface MostRecentActionProps extends PressableProps {
}

export default function MostRecentAction(props: MostRecentActionProps) {

    const { completedActions } = useActionsStore();

    if (completedActions.length === 0) {
        return null;
    }

    return (
        <Pressable {...props}>
            <Text>{completedActions[0]?.name}</Text>
        </Pressable>
    );
}