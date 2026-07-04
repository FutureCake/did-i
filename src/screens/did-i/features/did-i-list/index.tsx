import ActionItem from "../../../../shared/components/action-item";
import { Action } from "../../../../types/actions";

export interface DidIListProps {
    actions: Action[];
    onPressAction?: (actionId: string) => void;
}

export default function DidIList({ actions, onPressAction }: DidIListProps) {
    return actions.map((action, index) => (
        <ActionItem
            {...action}
            key={`action-${index}`}
            onPress={() => onPressAction?.(action.id)}
        />
    ));
}