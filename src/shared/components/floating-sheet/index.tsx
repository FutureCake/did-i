import { View, ViewProps } from "react-native";
import { useTokenStyles } from "../../hooks/use-token-styles";
import { buildFloatingSheetStyles, resolveFloatingSheetTokens } from "./styles";

export interface FloatingSheetProps extends ViewProps {
    allowOverflow?: boolean;
    contentStyle?: ViewProps["style"];
}

export default function FloatingSheet({ children, style, contentStyle, allowOverflow = false }: FloatingSheetProps) {

    const { styles } = useTokenStyles({
        resolver: resolveFloatingSheetTokens,
        builder: buildFloatingSheetStyles,
        props: { overflow: allowOverflow }
    });

    return (
        <View style={[style, styles.shadow]}>
            <View style={[styles.container, contentStyle]}>
                {children}
            </View>
        </View>
    )
}