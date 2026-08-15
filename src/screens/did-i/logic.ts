import { generateId } from "../../shared/logic/id";
import { ActionData } from "../../types/actions";

export function getCommonActions(): ActionData[] {
    return [
        {
            id: generateId(),
            title: "Take my keys",
            color: "#5465ff",
        },
        {
            id: generateId(),
            title: "Lock the door",
            color: "#8011d5",
        },
        {
            id: generateId(),
            title: "Turn off the lights",
            color: "#ffae35",
        },
        {
            id: generateId(),
            title: "Turn off the stove",
            color: "#f23400",
        },
        {
            id: generateId(),
            title: "Close the windows",
            color: "#61d2ff",
        },
    ];
}