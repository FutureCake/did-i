import { type ReactNode } from "react";
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
    const { styles } = useTokenStyles({
        resolver: resolveScreenLayoutTokens,
        builder: buildScreenLayoutStyles,
    });

    return (
        <View style={styles.root}>
            <KeyboardAwareScrollView
                contentContainerStyle={styles.content}
                stickyHeaderIndices={headerSticky ? [0] : undefined}
            >
                <View style={[styles.header, { paddingTop: top }]}>
                    <Text style={styles.headerTitle}>{header}</Text>
                </View>
                {children}
            </KeyboardAwareScrollView>
            <View style={styles.footer}>{footer}</View>
        </View>
    );
}
