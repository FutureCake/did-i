import { StyleSheet } from "react-native";
import { TokenDefintions, UITheme } from "../../../types/styles";

export interface ButtonTokens {
    backgroundColor: string;
    color: string;
}

const themeTokens: TokenDefintions<UITheme, ButtonTokens> = {
    dark: {
        backgroundColor: "#FFFFFF",
        color: "#000000"
    },
    light: {
        backgroundColor: "#000000",
        color: "#FFFFFF"
    }
}

export function resolveButtonTokens(params: {
    uiTheme: UITheme
}): ButtonTokens {

    const base: ButtonTokens = {
        backgroundColor: "",
        color: ""
    };

    const merged = {
        ...base,
        ...themeTokens[params.uiTheme],
    };

    return merged;
}

export function buildButtonStyles(tokens: ButtonTokens) {
    return StyleSheet.create({
        container: {
            backgroundColor: tokens.backgroundColor,
            paddingVertical: 18,
            borderRadius: 25,
            justifyContent: "center",
            alignItems: "center"
        },
        title: {
            fontSize: 40,
            textAlign: "center",
            color: tokens.color
        },
    });
}