import { StyleSheet } from "react-native";
import { TokenDefintions, UITheme } from "../../types/styles";

export interface DidITokens {
    backgroundColor: string;
}

const themeTokens: TokenDefintions<UITheme, DidITokens> = {
    dark: {
        backgroundColor: "#000000",
    },
    light: {
        backgroundColor: "#FFFFFF",
    }
}

export function resolveDidITokens(params: {
    uiTheme: UITheme
}): DidITokens {

    const base: DidITokens = {
        backgroundColor: "",
    };

    const merged = {
        ...base,
        ...themeTokens[params.uiTheme],
    };

    return merged;
}

export function buildDidIStyles(tokens: DidITokens) {
    return StyleSheet.create({

        container: {
            gap: 16,
            paddingHorizontal: 16
        },
    });
}