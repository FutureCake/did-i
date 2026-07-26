import { PropsWithChildren } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FloatingSheet from "../floating-sheet";
import { styles } from "./styles";

export interface BottomSheetProps extends PropsWithChildren {
}

export default function BottomSheet({ children }: BottomSheetProps) {

    const { bottom } = useSafeAreaInsets();

    return (
        <FloatingSheet style={{ marginBottom: bottom }}>
            <View style={styles.container}>
                {children}
            </View>
        </FloatingSheet>
    );
}