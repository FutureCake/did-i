import { StackActions, useNavigation } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import ColorPicker, { ColorFormatsObject, HueSlider, Panel1, Preview } from "reanimated-color-picker";
import BottomSheet from "../../shared/components/bottom-sheet";
import Button from "../../shared/components/button";
import FloatingSheet from "../../shared/components/floating-sheet";
import ScreenLayout from "../../shared/components/screen-layout";
import { randomHexColor } from "../../shared/logic/colors";
import { generateId } from "../../shared/logic/id";
import type { RootStackParamList } from "../../shared/navigation";
import { useActionsStore } from "../../shared/stores/actions";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "action-editor">;

export default function ActionEditor({ route }: Props) {

    const actionId = route.params?.actionId;

    const { dispatch } = useNavigation();
    const [actionColor, setActionColor] = useState<string | undefined>(undefined);
    const [actionName, setActionName] = useState<string | undefined>(undefined);
    const { getAction, addAction, updateAction } = useActionsStore();

    useEffect(() => {
        if (!actionId) {
            setActionName(undefined);
            setActionColor(randomHexColor(1));
            return;
        }
        const data = getAction(actionId);
        setActionName(data?.title ?? undefined);
        setActionColor(data?.color ?? randomHexColor(1));
    }, [actionId]);


    const updatedActionColor =
        (color: ColorFormatsObject) => setActionColor(color.hex);

    const addActionHandler = () => {

        if (!actionName || !actionColor) {
            return;
        }

        if (actionId) {
            updateAction(actionId, {
                title: actionName,
                color: actionColor,
            });
        } else {
            addAction({
                id: generateId(),
                title: actionName,
                color: actionColor,
            });
        }

        dispatch(StackActions.pop(1));
    }

    const isValid = !!actionName && !!actionColor;

    const hasChanges = (() => {
        if (!actionId) return isValid;
        const existing = getAction(actionId);
        if (!existing) return isValid;
        return actionName !== existing.title || actionColor !== existing.color;
    })();

    return (

        <ScreenLayout
            header={actionId ? "Edit Action" : "New Action"}
            footer={
                <BottomSheet>
                    <Button
                        disabled={!hasChanges}
                        title={actionId ? "Save changes" : "Add action"}
                        onPress={addActionHandler}
                    />
                    <Button
                        variant="shy"
                        title={"<- back"}
                        onPress={() => dispatch(StackActions.pop(1))}
                    />
                </BottomSheet>
            }
        >
            <FloatingSheet contentStyle={styles.section}>
                <Text style={styles.label}>
                    Action name
                </Text>
                <TextInput
                    placeholder="Enter action name"
                    placeholderTextColor="#b8b8b8"
                    value={actionName}
                    onChangeText={setActionName}
                    style={styles.textInput}
                />
            </FloatingSheet>
            <FloatingSheet
                contentStyle={styles.section}
                allowOverflow
            >
                <Text style={styles.label}>Action color</Text>
                <ColorPicker
                    value={actionColor}
                    sliderThickness={25}
                    thumbSize={24}
                    thumbShape='circle'
                    onChangeJS={updatedActionColor}
                    onCompleteJS={updatedActionColor}
                    style={styles.colorPicker}
                    boundedThumb={false}
                >
                    <Panel1 style={styles.panel1} />
                    <View style={styles.panelsWapper}>
                        <HueSlider
                            style={styles.hueSlider}
                            sliderThickness={56}
                            boundedThumb={true}
                            thumbShape="line"
                        />
                        <Preview
                            hideText
                            hideInitialColor
                            style={styles.preview} />
                    </View>

                </ColorPicker>
            </FloatingSheet>
        </ScreenLayout>

    )
}