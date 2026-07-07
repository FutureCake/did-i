import { StyleSheet } from "react-native";
import { TokenDefintions, UITheme } from "../../../types/styles";

export interface ActionItemTokens {
    backgroundColor: string;
}

const themeTokens: TokenDefintions<UITheme, ActionItemTokens> = {
    dark: {
        backgroundColor: "#000000",
    },
    light: {
        backgroundColor: "#FFFFFF",
    }
}

export function resolveActionItemTokens(params: {
    uiTheme: UITheme
}): ActionItemTokens {

    const base: ActionItemTokens = {
        backgroundColor: "",
    };

    const merged = {
        ...base,
        ...themeTokens[params.uiTheme],
    };

    return merged;
}

export function buildActionItemStyles(tokens: ActionItemTokens) {
    return StyleSheet.create({
        shadowContainer: {
            borderRadius: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.22,
            shadowRadius: 4,
            elevation: 6,
        },
        container: {
            backgroundColor: tokens.backgroundColor,
            paddingVertical: 8,
            paddingRight: 16,
            paddingLeft: 8,
            overflow: "hidden",
            flexDirection: "row",
            borderRadius: 8,
        },
        marker: {
            alignSelf: "stretch",
            width: 8,
            borderRadius: 4,
            marginRight: 12,
        },
        title: {
            fontSize: 32
        },
    });
}