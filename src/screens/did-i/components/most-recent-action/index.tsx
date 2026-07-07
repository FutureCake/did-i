import { Pressable, Text, View, ViewProps } from "react-native";
import { useTokenStyles } from "../../../../shared/hooks/use-token-styles";
import { formatISODate } from "../../../../shared/logic/time";
import { useActionsStore } from "../../../../shared/stores/actions";
import { buildMostRecentActionStyles, resolveMostRecentActionTokens } from "./styles";

export interface MostRecentActionProps extends ViewProps {
    onHistoryPress?: () => void;
}

export default function MostRecentAction(props: MostRecentActionProps) {

    const { completedActions } = useActionsStore();
    const mostRecentAction = completedActions[completedActions.length - 1];
    const { styles } = useTokenStyles({
        resolver: resolveMostRecentActionTokens,
        builder: buildMostRecentActionStyles,
        props: { actionColor: mostRecentAction?.color }
    });

    if (!mostRecentAction) {
        return null;
    }

    return (
        <View {...props} style={styles.container}>
            <Text style={styles.indicator}>{`${formatISODate(mostRecentAction.completedAt)} I did`}</Text>
            <Text style={styles.action}>{mostRecentAction.title}</Text>
            <Pressable onPress={props.onHistoryPress}>
                <Text style={styles.history}>See full history</Text>
            </Pressable>
        </View>
    );
}