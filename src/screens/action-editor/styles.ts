import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    section: {
        padding: 8,
        backgroundColor: "#fff",
        gap: 8,
    },
    label: {
        fontSize: 16,
        color: "#4f4f4f",
        paddingLeft: 20,
        fontFamily: "inter",
    },
    textInput: {
        paddingVertical: 7,
        fontSize: 32,
        borderColor: "#e4e4e4",
        borderWidth: 1,
        borderRadius: 28,
        paddingLeft: 18,
        fontFamily: "inter",
    },
    colorPicker: {
        gap: 8,
    },
    panelsWapper: {
        flexDirection: "row",
        gap: 8,
    },
    panel1: {
        borderRadius: 28,
    },
    preview: {
        borderRadius: 28,
        height: 56,
        aspectRatio: 1,
    },
    hueSlider: {
        borderRadius: 28,
        flexGrow: 1,
    }
});