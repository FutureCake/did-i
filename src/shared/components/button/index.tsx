import { Pressable, PressableProps, Text } from "react-native";
import { useTokenStyles } from "../../hooks/use-token-styles";
import { buildButtonStyles, resolveButtonTokens } from "./styles";

export interface ButtonProps extends PressableProps {
    title: string;
}

export default function Button({ title, ...props }: ButtonProps) {

    const { styles } = useTokenStyles({
        resolver: resolveButtonTokens,
        builder: buildButtonStyles,
    });

    return (
        <Pressable style={styles.container} {...props}>
            <Text style={styles.title}>{title}</Text>
        </Pressable>
    );
}