import { Pressable, Text } from "react-native";
import { Action } from "../../../../types/actions";

export interface DidIListProps {
    actions: Action[];
    onPressAction?: (actionId: string) => void;
}

export default function DidIList({ actions, onPressAction }: DidIListProps) {
    return actions.map((action, index) => (
        <Pressable
            onPress={() => onPressAction?.(action.id)}
            key={`action-${index}`}
        >
            <Text>{action.name}</Text>
        </Pressable >
    ));
}