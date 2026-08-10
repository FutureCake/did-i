import { Text, View } from "react-native";
import { useTokenStyles } from "../../../../shared/hooks/use-token-styles";
import { buildNoActionsStyles, resolveNoActionsTokens } from "./styles";

export default function NoActions() {

    const { styles } = useTokenStyles({
        resolver: resolveNoActionsTokens,
        builder: buildNoActionsStyles,
    });

    return (
        <View style={styles.container}>
            <Text style={styles.text}>You have no actions yet.</Text>
            <Text style={styles.text}>Click below to add your first action</Text>
        </View>
    );
}

