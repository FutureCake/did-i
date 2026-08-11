import { Pressable, PressableProps, Text } from "react-native";
import { useTokenStyles } from "../../hooks/use-token-styles";
import { buildButtonStyles, resolveButtonTokens } from "./styles";

export type ButtonVariant = "primary" | "shy";

export interface ButtonProps extends PressableProps {
    title: string;
    variant?: ButtonVariant;
}

export default function Button({ title, variant = "primary", disabled, ...props }: ButtonProps) {

    const { styles } = useTokenStyles({
        resolver: resolveButtonTokens,
        builder: buildButtonStyles,
        props: { variant, disabled }
    });

    return (
        <Pressable style={styles.container} disabled={disabled} {...props}>
            <Text style={styles.title}>{title}</Text>
        </Pressable>
    );
}