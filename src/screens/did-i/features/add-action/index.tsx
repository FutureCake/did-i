import { Pressable, Text } from "react-native";

export interface AddActionProps {
    onAddAction?: () => void;
}

export default function AddAction({ onAddAction }: AddActionProps) {
    return (
        <Pressable onPress={onAddAction}>
            <Text>Add Action</Text>
        </Pressable>
    );
}