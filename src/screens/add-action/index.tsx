import { useState } from "react";
import { Text, TextInput } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
import ColorPicker, { ColorFormatsObject, HueSlider, Panel1 } from "reanimated-color-picker";
import { randomHexColor } from "../../shared/logic/colors";
import ActionItem from "../did-i/components/action-item";

export default function NewAction() {

    const [actionColor, setActionColor] = useState(randomHexColor(1));
    const [actionName, setActionName] = useState("Close the door");

    const updatedActionColor =
        (color: ColorFormatsObject) => setActionColor(color.hex);

    return (
        <SafeAreaView edges={['top']}>
            <KeyboardAvoidingView>
                <Text>New Action</Text>

                <TextInput
                    placeholder="Enter action name"
                    value={actionName}
                    onChangeText={setActionName}
                />
                <ColorPicker
                    value={actionColor}
                    sliderThickness={25}
                    thumbSize={24}
                    thumbShape='circle'
                    onChangeJS={updatedActionColor}
                    onCompleteJS={updatedActionColor}
                    style={{}}
                    boundedThumb={false}
                >
                    <Panel1 style={{}} />
                    <HueSlider style={{}} />

                </ColorPicker>

                <ActionItem name={actionName} color={actionColor} />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}