import { Pressable, PressableProps, StyleProp, Text, View, ViewStyle } from "react-native";
import { Action } from "../../../types/actions";
import { useTokenStyles } from "../../hooks/use-token-styles";
import { buildActionItemStyles, resolveActionItemTokens } from "./styles";

export interface ActionItemProps extends Action, Omit<PressableProps, "id" | "style"> {
    style?: StyleProp<ViewStyle>
}

export default function ActionItem({ title, color, id, style, ...props }: ActionItemProps) {

    const { styles } = useTokenStyles({
        resolver: resolveActionItemTokens,
        builder: buildActionItemStyles
    })

    return (
        <View style={[styles.shadowContainer, style]}>
            <Pressable {...props} style={styles.container}>
                <View style={[styles.marker, { backgroundColor: color }]} />
                <Text style={styles.title}>{title}</Text>
            </Pressable>
        </View>
    );
}