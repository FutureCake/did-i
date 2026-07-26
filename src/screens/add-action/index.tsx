import { useState } from "react";
import { TextInput } from "react-native";
import ColorPicker, { ColorFormatsObject, HueSlider, Panel1 } from "reanimated-color-picker";
import FloatingSheet from "../../shared/components/floating-sheet";
import ScreenLayout from "../../shared/components/screen-layout";
import { randomHexColor } from "../../shared/logic/colors";

export default function NewAction() {

    const [actionColor, setActionColor] = useState(randomHexColor(1));
    const [actionName, setActionName] = useState("Close the door");

    const updatedActionColor =
        (color: ColorFormatsObject) => setActionColor(color.hex);

    return (

        <ScreenLayout header={"New Action"}>
            <FloatingSheet>
                <TextInput
                    placeholder="Enter action name"
                    value={actionName}
                    onChangeText={setActionName}
                />
            </FloatingSheet>
            <FloatingSheet>
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
            </FloatingSheet>
        </ScreenLayout>

    )
}