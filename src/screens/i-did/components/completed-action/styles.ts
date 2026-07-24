import { StyleSheet } from "react-native";
import { TokenDefintions, UITheme } from "../../../../types/styles";

export interface CompletedActionItemTokens {
    backgroundColor: string;
}

const themeTokens: TokenDefintions<UITheme, CompletedActionItemTokens> = {
    dark: {
        backgroundColor: "#000000",
    },
    light: {
        backgroundColor: "#FFFFFF",
    }
}

export function resolveCompletedActionItemTokens(params: {
    uiTheme: UITheme
}): CompletedActionItemTokens {

    const base: CompletedActionItemTokens = {
        backgroundColor: "",
    };

    const merged = {
        ...base,
        ...themeTokens[params.uiTheme],
    };

    return merged;
}

export function buildCompletedActionItemStyles(tokens: CompletedActionItemTokens) {
    return StyleSheet.create({
        container: {
            backgroundColor: tokens.backgroundColor,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 15,
            paddingLeft: 20,
            paddingTop: 8,
            paddingBottom: 12,
            borderRadius: 34,
        },
        marker: {
            width: 28,
            aspectRatio: 1,
            borderRadius: 14,
        },
        content: {
            gap: 4,
        },
        title: {
            fontSize: 34,
            fontWeight: "bold"
        },
        time: {
            fontSize: 14,
            color: "#888",
        }
    });
}