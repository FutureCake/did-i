import { StackActions, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { TextInput } from "react-native";
import ColorPicker, { ColorFormatsObject, HueSlider, Panel1 } from "reanimated-color-picker";
import BottomSheet from "../../shared/components/bottom-sheet";
import Button from "../../shared/components/button";
import FloatingSheet from "../../shared/components/floating-sheet";
import ScreenLayout from "../../shared/components/screen-layout";
import { randomHexColor } from "../../shared/logic/colors";

export default function ActionEditor() {

    const { dispatch } = useNavigation();
    const [actionColor, setActionColor] = useState(randomHexColor(1));
    const [actionName, setActionName] = useState("Close the door");

    const updatedActionColor =
        (color: ColorFormatsObject) => setActionColor(color.hex);

    return (

        <ScreenLayout
            header={"New Action"}
            footer={
                <BottomSheet>
                    <Button title={"Add action"} />
                    <Button title={"<- back"} onPress={() => dispatch(StackActions.pop(1))} />
                </BottomSheet>
            }
        >
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