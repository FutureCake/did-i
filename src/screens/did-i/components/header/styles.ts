import { StyleSheet } from "react-native";
import { TokenDefintions, UITheme } from "../../../../types/styles";

export interface HeaderTokens {
    color: string;
}

const themeTokens: TokenDefintions<UITheme, HeaderTokens> = {
    dark: {
        color: "#FFF",
    },
    light: {
        color: "#000",
    }
}

export function resolveHeaderTokens(params: {
    uiTheme: UITheme
}): HeaderTokens {

    const base: HeaderTokens = {
        color: "",
    };

    const merged = {
        ...base,
        ...themeTokens[params.uiTheme],
    };

    return merged;
}

export function buildHeaderStyles(tokens: HeaderTokens) {
    return StyleSheet.create({
        container: {
            marginVertical: 16,
        },
        title: {
            color: tokens.color,
            fontSize: 64,
            fontWeight: "bold"
        }
    });
}