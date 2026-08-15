import { StyleSheet } from "react-native";
import { TokenDefintions, UITheme } from "../../../../types/styles";


export interface NoActionsTokens {
    color: string;
}
const themeTokens: TokenDefintions<UITheme, NoActionsTokens> = {
    dark: {
        color: "#FFF",
    },
    light: {
        color: "#adadad",
    },
};

export function resolveNoActionsTokens(params: { uiTheme: UITheme; }): NoActionsTokens {
    const base: NoActionsTokens = {
        color: "",
    };

    const merged = {
        ...base,
        ...themeTokens[params.uiTheme],
    };

    return merged;
}
export function buildNoActionsStyles(tokens: NoActionsTokens) {
    return StyleSheet.create({
        container: {
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 36,
            gap: 32,
            paddingTop: 16
        },
        text: {
            fontFamily: "inter-bold",
            textAlign: "center",
            fontSize: 28,
            color: tokens.color,
        },
    });
}
