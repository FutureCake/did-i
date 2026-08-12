import { Keyframe } from "react-native-reanimated";

export const exitHeightAnimation = new Keyframe({
    0: { transform: [{ scaleY: 1 }] },
    100: { transform: [{ scaleY: 0 }] },
}).duration(300);