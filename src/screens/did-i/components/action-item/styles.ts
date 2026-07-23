import { StyleSheet } from "react-native";
import { TokenDefintions, UITheme } from "../../../../types/styles";

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
        container: {
            backgroundColor: tokens.backgroundColor,
            height: 68,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 15,
            paddingLeft: 20,
            borderRadius: 34
        },
        marker: {
            width: 28,
            aspectRatio: 1,
            borderRadius: 14,
        },
        title: {
            fontSize: 34,
            fontWeight: "bold"
        },
    });
}