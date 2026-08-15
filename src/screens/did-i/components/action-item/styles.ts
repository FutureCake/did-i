import { StyleSheet } from "react-native";
import { TokenDefintions, UITheme } from "../../../../types/styles";
import { BORDER_RADIUS } from "./constants";

export interface ActionItemTokens {
    backgroundColor: string;
    completedUIColor: string;
}

const themeTokens: TokenDefintions<UITheme, ActionItemTokens> = {
    dark: {
        backgroundColor: "#000000",
        completedUIColor: "#FFFFFF",
    },
    light: {
        backgroundColor: "#FFFFFF",
        completedUIColor: "#000000",
    }
}

export function resolveActionItemTokens(params: {
    uiTheme: UITheme;
    completedUIColor: string;
}): ActionItemTokens {

    const base: ActionItemTokens = {
        backgroundColor: "",
        completedUIColor: ""
    };

    const merged = {
        ...base,
        ...themeTokens[params.uiTheme],
    };

    merged.completedUIColor = params.completedUIColor || merged.completedUIColor;

    return merged;
}

const DELETE_BUTTON_COLOR = "#d73431";
const EDIT_BUTTON_COLOR = "#000000";

export function buildActionItemStyles(tokens: ActionItemTokens) {
    return StyleSheet.create({
        container: {
            backgroundColor: tokens.backgroundColor,
            height: 68,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 10,
            paddingLeft: 20,
            borderRadius: BORDER_RADIUS,
        },
        marker: {
            width: 28,
            aspectRatio: 1,
            borderRadius: 14,
        },
        title: {
            fontSize: 34,
            fontFamily: "inter-bold",
        },
        wrapper: {
            position: "relative",
            overflow: "hidden",
            borderRadius: BORDER_RADIUS,
        },
        underlayLeft: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "flex-start",
            paddingLeft: 24,
        },
        underlayRight: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            overflow: "hidden",
            backgroundColor: DELETE_BUTTON_COLOR,
        },
        completedBg: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 16,
        },
        completedText: {
            color: tokens.completedUIColor,
            fontSize: 20,
            fontFamily: "inter-bold",
        },
        button: {
            flex: 1,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            borderTopRightRadius: BORDER_RADIUS,
            borderBottomRightRadius: BORDER_RADIUS,
        },
        editButton: {
            backgroundColor: EDIT_BUTTON_COLOR,
            paddingLeft: BORDER_RADIUS,
            zIndex: 1,
        },
        deleteButton: {
            backgroundColor: DELETE_BUTTON_COLOR,
        },
        completedActionCloseText: {
            color: tokens.completedUIColor,
        },
        buttonText: {
            color: "#FFF",
            fontSize: 22,
            fontFamily: "inter-bold",
        },
    });
}