import { Text, View } from "react-native";
import { useTokenStyles } from "../../../../shared/hooks/use-token-styles";
import { buildNoActionsStyles, resolveNoActionsTokens } from "./styles";

export default function NoHistory() {

    const { styles } = useTokenStyles({
        resolver: resolveNoActionsTokens,
        builder: buildNoActionsStyles,
    });

    return (
        <View style={styles.container}>
            <Text style={styles.text}>You have no completed actions yet.</Text>
            <Text style={styles.text}>Complete an action in the "Did I" screen for it to show up here.</Text>
        </View>
    );
}

