import { LinearGradient } from "expo-linear-gradient";
import { type ReactNode, useState } from "react";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTokenStyles } from "../../hooks/use-token-styles";
import { buildScreenLayoutStyles, resolveScreenLayoutTokens } from "./styles";

export interface ScreenLayoutProps {
    header: string;
    headerSticky?: boolean;
    footer?: ReactNode;
    children?: ReactNode;
}

export default function ScreenLayout({ header, headerSticky = false, footer, children }: ScreenLayoutProps) {

    const { top } = useSafeAreaInsets();
    const [footerHeight, setFooterHeight] = useState(0);
    const { styles } = useTokenStyles({
        resolver: resolveScreenLayoutTokens,
        builder: buildScreenLayoutStyles,
    });

    return (
        <View style={styles.root}>
            <KeyboardAwareScrollView
                style={{ marginBottom: footerHeight / 2 }}
                contentContainerStyle={[styles.content, { paddingBottom: footerHeight }]}
                stickyHeaderIndices={headerSticky ? [0] : undefined}
            >
                <View style={[styles.header]}>
                    <LinearGradient
                        colors={["#fff", "rgba(255, 255, 255, 0)"]}
                        locations={[0.75, 1]}
                        style={styles.headerGradient}
                    />
                    <Text style={[styles.headerTitle, { paddingTop: top }]}>{header}</Text>
                </View>
                {children}
            </KeyboardAwareScrollView>
            <View style={styles.footer} onLayout={(e) => setFooterHeight(e.nativeEvent.layout.height)}>{footer}</View>
        </View>
    );
}
