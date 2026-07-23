import { StyleSheet } from "react-native";
import { TokenDefintions, UITheme } from "../../../types/styles";

export interface ScreenLayoutTokens {
    backgroundColor: string;
    headerColor: string;
}

const themeTokens: TokenDefintions<UITheme, ScreenLayoutTokens> = {
    dark: {
        backgroundColor: "#000000",
        headerColor: "#FFF",
    },
    light: {
        backgroundColor: "#FFFFFF",
        headerColor: "#000",
    }
}

export function resolveScreenLayoutTokens(params: {
    uiTheme: UITheme
}): ScreenLayoutTokens {

    const base: ScreenLayoutTokens = {
        backgroundColor: "",
        headerColor: "",
    };

    const merged = {
        ...base,
        ...themeTokens[params.uiTheme],
    };

    return merged;
}

export function buildScreenLayoutStyles(tokens: ScreenLayoutTokens) {
    return StyleSheet.create({
        root: {
            flex: 1,
            backgroundColor: tokens.backgroundColor,
        },
        footer: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: 16,
        },
        content: {
            flexGrow: 1,
            gap: 16,
            paddingHorizontal: 16,
        },
        header: {
            marginVertical: 16,
        },
        headerTitle: {
            color: tokens.headerColor,
            fontSize: 64,
            fontWeight: "bold",
        },
    });
}
