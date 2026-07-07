import { Text, View, ViewProps } from "react-native";
import { useTokenStyles } from "../../../../shared/hooks/use-token-styles";
import { buildHeaderStyles, resolveHeaderTokens } from "./styles";

export interface HeaderProps extends ViewProps {

}

export default function Header(props: HeaderProps) {

    const { styles } = useTokenStyles({
        resolver: resolveHeaderTokens,
        builder: buildHeaderStyles
    });

    return (
        <View style={styles.container} {...props}>
            <Text style={styles.title}>Did I?</Text>
        </View>
    );
}