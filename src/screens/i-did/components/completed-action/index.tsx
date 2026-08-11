import { Text, View } from "react-native";
import FloatingSheet from "../../../../shared/components/floating-sheet";
import MarqueeText from "../../../../shared/components/marquee-text";
import { useTokenStyles } from "../../../../shared/hooks/use-token-styles";
import { formatDateTime, formatTimePassedSince, HOUR, timePassedSince } from "../../../../shared/logic/time";
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

    const timePassed = timePassedSince(completedAt);
    const showTimePassed = timePassed < HOUR;

    return (
        <FloatingSheet style={{ marginTop: showTimePassed ? 10 : 0 }} allowOverflow>
            <View style={[styles.container]}>
                {showTimePassed && <Text style={styles.timePassed}>{formatTimePassedSince(timePassed)}</Text>}
                <View style={[styles.wrapper, { marginTop: showTimePassed ? 10 : 0 }]}>
                    <View style={[styles.marker, { backgroundColor: color }]} />
                    <View style={styles.content}>
                        <MarqueeText fade="left" style={styles.title}>{title}</MarqueeText>
                        {!showTimePassed && <Text style={styles.time}>{formatDateTime(completedAt)}</Text>}
                    </View>
                </View>
            </View>
        </FloatingSheet>
    )
}