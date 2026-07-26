import { StyleSheet } from "react-native";
import { ButtonVariant } from ".";
import { TokenDefintions, UITheme } from "../../../types/styles";
import resolveTokens from "../../logic/styles";

export interface ButtonTokens {
    paddingVertical: number;
    fontSize: number;
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

const variantTokens: TokenDefintions<ButtonVariant, ButtonTokens, UITheme> = {
    primary: {
        paddingVertical: 18,
        fontSize: 40,
    },
    shy: (theme: UITheme) => ({
        backgroundColor: undefined,
        color: theme === "dark" ? "#FFFFFF" : "#000000",
        paddingVertical: 9,
        fontSize: 20,
    })
}

export function resolveButtonTokens(params: {
    uiTheme: UITheme
    variant: ButtonVariant
}): ButtonTokens {

    const base: ButtonTokens = {
        paddingVertical: 0,
        fontSize: 0,
        backgroundColor: "",
        color: ""
    };

    const merged = {
        ...base,
        ...themeTokens[params.uiTheme],
        ...resolveTokens(variantTokens, params.variant, params.uiTheme),
    };

    return merged;
}

export function buildButtonStyles(tokens: ButtonTokens) {
    return StyleSheet.create({
        container: {
            backgroundColor: tokens.backgroundColor,
            paddingVertical: tokens.paddingVertical,
            borderRadius: 25,
            justifyContent: "center",
            alignItems: "center"
        },
        title: {
            fontSize: tokens.fontSize,
            textAlign: "center",
            color: tokens.color
        },
    });
}