import { Text, View } from "react-native";
import FloatingSheet from "../../../../shared/components/floating-sheet";
import { useTokenStyles } from "../../../../shared/hooks/use-token-styles";
import { formatDateTime } from "../../../../shared/logic/time";
import { CompletedActionData } from "../../../../types/actions";
import { buildCompletedActionItemStyles, resolveCompletedActionItemTokens } from "./styles";

export interface CompletedActionProps extends CompletedActionData {
}

export default function CompletedAction({ title, color, completedAt }: CompletedActionProps) {

    const { styles } = useTokenStyles({
        resolver: resolveCompletedActionItemTokens,
        builder: buildCompletedActionItemStyles,
        props: { actionColor: color }
    });

    return (
        <FloatingSheet>
            <View style={[styles.container]}>
                <View style={[styles.marker, { backgroundColor: color }]} />
                <View style={styles.content}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.time}>{formatDateTime(completedAt)}</Text>
                </View>
            </View>
        </FloatingSheet>
    )
}