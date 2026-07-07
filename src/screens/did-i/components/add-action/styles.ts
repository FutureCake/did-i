import { StyleSheet } from "react-native";
import { TokenDefintions, UITheme } from "../../../../types/styles";

export interface AddActionTokens {
    color: string;
}

const themeTokens: TokenDefintions<UITheme, AddActionTokens> = {
    dark: {
        color: "#FFF",
    },
    light: {
        color: "#000",
    }
}

export function resolveAddActionTokens(params: {
    uiTheme: UITheme
}): AddActionTokens {

    const base: AddActionTokens = {
        color: "",
    };

    const merged = {
        ...base,
        ...themeTokens[params.uiTheme],
    };

    return merged;
}

export function buildAddActionStyles(tokens: AddActionTokens) {
    return StyleSheet.create({
        container: {
            marginHorizontal: 16,
        },
        action: {
            backgroundColor: "#097801",
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 8,

        },
        actionText: {
            textAlign: "center",
            color: "#FFF",
            fontSize: 32,
            fontWeight: "bold"
        }
    });
}