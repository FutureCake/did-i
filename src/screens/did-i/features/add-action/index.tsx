import { Pressable, Text, View } from "react-native";

export interface AddActionProps {
    onAddAction?: () => void;
}

export default function AddAction({ onAddAction }: AddActionProps) {
    return (
        <View>
            <View>
                <Text>Click below to add a new action of something you do, but then 5 minutes later forget about and start doubing yourself for the rest of the day like closing the front door</Text>
            </View>
            <Pressable onPress={onAddAction}>
                <Text>Create new action</Text>
            </Pressable>
        </View>
    );
}