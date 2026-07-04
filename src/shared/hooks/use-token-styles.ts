import { useMemo } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { UITheme } from "../../types/styles";

type StylesType<T> = StyleSheet.NamedStyles<T>

export interface UseTokenStylesProps<TTokens, TProps, TStyles extends StylesType<TStyles>> {
    resolver: (props: TProps & { uiTheme: UITheme }) => TTokens;
    builder: (tokens: TTokens) => TStyles;
    props?: TProps;
}

export function useTokenStyles<TTokens, TProps, TStyles extends StylesType<TStyles>>(
    { resolver, builder, props }: UseTokenStylesProps<TTokens, TProps, TStyles>
) {
    let colorScheme = useColorScheme();
    colorScheme = colorScheme === "dark" ? "dark" : "light";

    return useMemo(() => {
        const tokens = resolver({ ...props as TProps, uiTheme: colorScheme });
        const styles = builder(tokens);

        return { tokens, styles, colorScheme };
    }, [resolver, builder, props, colorScheme]);
}