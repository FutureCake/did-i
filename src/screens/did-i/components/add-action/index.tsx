import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTokenStyles } from "../../../../shared/hooks/use-token-styles";
import { buildAddActionStyles, resolveAddActionTokens } from "./styles";

export interface AddActionProps {
    onAddAction?: () => void;
}

export default function AddAction({ onAddAction }: AddActionProps) {

    const { bottom } = useSafeAreaInsets();
    const { styles } = useTokenStyles({
        resolver: resolveAddActionTokens,
        builder: buildAddActionStyles
    });

    return (
        <View style={[styles.container, { paddingBottom: bottom }]}>
            {/* <View>
                <Text>Click below to add a new action of something you do, but then 5 minutes later forget about and start doubing yourself for the rest of the day like closing the front door</Text>
            </View> */}
            <Pressable style={styles.action} onPress={onAddAction}>
                <Text style={styles.actionText}>Create new action</Text>
            </Pressable>
        </View>
    );
}