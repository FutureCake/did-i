import { StyleSheet } from "react-native";
import { TokenDefintions, UITheme } from "../../../types/styles";

export interface FloatingSheetTokens {
    backgroundColor: string;
    dropshadowColor: string;
    overflowStyle: "visible" | "hidden";
}

const themeTokens: TokenDefintions<UITheme, FloatingSheetTokens> = {
    dark: {
        backgroundColor: "#000000",
        dropshadowColor: "#FFFFFF"
    },
    light: {
        backgroundColor: "#FFFFFF",
        dropshadowColor: "#000000"
    }
}

export function resolveFloatingSheetTokens(params: {
    uiTheme: UITheme,
    overflow: boolean
}): FloatingSheetTokens {

    const base: FloatingSheetTokens = {
        backgroundColor: "",
        dropshadowColor: "",
        overflowStyle: "hidden",
    };

    const merged = {
        ...base,
        ...themeTokens[params.uiTheme],
    };

    merged.overflowStyle = params.overflow ? "visible" : "hidden";

    return merged;
}

export function buildFloatingSheetStyles(tokens: FloatingSheetTokens) {
    return StyleSheet.create({
        shadow: {
            borderRadius: 34,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.22,
            shadowRadius: 4,
            elevation: 6,
        },
        container: {
            backgroundColor: tokens.backgroundColor,
            overflow: tokens.overflowStyle,
            borderRadius: 34,
        }
    });
}