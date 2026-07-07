import { StyleSheet } from "react-native";
import { TokenDefintions, UITheme } from "../../../../types/styles";

export interface MostRecentActionTokens {
    backgroundColor: string;
    actionColor?: string;
}

const themeTokens: TokenDefintions<UITheme, MostRecentActionTokens> = {
    dark: {
        backgroundColor: "#000",
    },
    light: {
        backgroundColor: "#FFF",
    }
}

export function resolveMostRecentActionTokens(params: {
    uiTheme: UITheme,
    actionColor?: string
}): MostRecentActionTokens {

    const base: MostRecentActionTokens = {
        backgroundColor: "",
        actionColor: params.actionColor,
    };

    const merged = {
        ...base,
        ...themeTokens[params.uiTheme],
    };

    return merged;
}

export function buildMostRecentActionStyles(tokens: MostRecentActionTokens) {
    return StyleSheet.create({
        container: {
            marginVertical: 16,
            marginHorizontal: 16,
            backgroundColor: tokens.backgroundColor,
            borderColor: tokens.actionColor,
            borderWidth: 2,
            padding: 16,
            borderRadius: 8,
            shadowColor: tokens.actionColor,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.4,
            shadowRadius: 6,
            elevation: 6,
        },
        indicator: {
            fontSize: 18,

        },
        action: {
            fontSize: 32,
            fontWeight: "bold",
            marginTop: 4,
            marginBottom: 8,
        },
        history: {
            color: "#092aff",
            textDecorationLine: "underline",
        }
    });
}