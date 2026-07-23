import { PropsWithChildren } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../button";
import FloatingSheet from "../floating-sheet";
import { styles } from "./styles";

export interface BottomSheetProps extends PropsWithChildren {
    onAddAction?: () => void;
}

export default function BottomSheet({ onAddAction, children }: BottomSheetProps) {

    const { bottom } = useSafeAreaInsets();

    return (
        <FloatingSheet style={{ marginBottom: bottom }}>
            <View style={styles.container}>
                {children}
                <Button title={"Add action"} onPress={onAddAction} />
            </View>
        </FloatingSheet>
    );
}