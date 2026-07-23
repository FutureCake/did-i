import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    cancelAnimation,
    Easing,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import FloatingSheet from "../../../../shared/components/floating-sheet";
import LoadingCircle from "../../../../shared/components/loading-circle";
import { useTokenStyles } from "../../../../shared/hooks/use-token-styles";
import { Action } from "../../../../types/actions";
import { buildActionItemStyles, resolveActionItemTokens } from "./styles";

export interface ActionItemProps extends Action {
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}

const SWIPE_THRESHOLD = 0.2;
const BUTTON_WIDTH = 60;
const LEFT_BUTTONS_WIDTH = BUTTON_WIDTH * 2;
const BORDER_RADIUS = 34;

export default function ActionItem({ title, color, id, style, onPress, onEdit, onDelete }: ActionItemProps) {

    const { styles } = useTokenStyles({
        resolver: resolveActionItemTokens,
        builder: buildActionItemStyles,
    });

    const translateX = useSharedValue(0);
    const containerWidth = useSharedValue(0);
    const circleProgress = useSharedValue(0);
    const buttonsOpen = useSharedValue(false);

    const handleComplete = () => {
        console.log("completed");
        onPress?.();
    };

    const handleCancelCircle = () => {
        // Cancel the fill animation and snap back immediately
        cancelAnimation(circleProgress);
        circleProgress.value = 0;
        translateX.value = withTiming(0, { duration: 300 });
    };

    const pan = Gesture.Pan()
        .activeOffsetX([-10, 10])
        .failOffsetY([-5, 5])
        .onUpdate((e) => {
            if (buttonsOpen.value) {
                // When buttons are open, offset from the open position
                const newX = -LEFT_BUTTONS_WIDTH + e.translationX;
                if (newX < -LEFT_BUTTONS_WIDTH) {
                    // Rubber-band stretch when pulling further left
                    const overshoot = -newX - LEFT_BUTTONS_WIDTH;
                    const dampened = LEFT_BUTTONS_WIDTH + overshoot * 0.3;
                    translateX.value = -dampened;
                } else {
                    translateX.value = Math.min(0, newX);
                }
            } else if (e.translationX > 0) {
                translateX.value = e.translationX;
            } else {
                // Swipe left: allow overscroll past buttons with rubber-band resistance
                if (e.translationX < -LEFT_BUTTONS_WIDTH) {
                    const overshoot = -e.translationX - LEFT_BUTTONS_WIDTH;
                    // Dampen the overshoot (diminishing returns)
                    const dampened = LEFT_BUTTONS_WIDTH + overshoot * 0.3;
                    translateX.value = -dampened;
                } else {
                    translateX.value = e.translationX;
                }
            }
        })
        .onEnd((e) => {
            const threshold = containerWidth.value * SWIPE_THRESHOLD;

            if (buttonsOpen.value) {
                if (e.translationX > LEFT_BUTTONS_WIDTH * SWIPE_THRESHOLD) {
                    // Swiped far enough right — close buttons
                    buttonsOpen.value = false;
                    translateX.value = withSpring(0, { damping: 40, stiffness: 200 });
                } else {
                    // Not far enough or pulled further left — spring back to open
                    translateX.value = withSpring(-LEFT_BUTTONS_WIDTH, { damping: 40, stiffness: 200 });
                }
            } else if (e.translationX > threshold) {
                // Snap right to reveal completed underlay
                translateX.value = withTiming(containerWidth.value, { duration: 200 }, (finished) => {
                    if (!finished) return;
                    // Start filling the circle over 1500ms
                    circleProgress.value = withTiming(1, { duration: 1500, easing: Easing.linear }, (fillFinished) => {
                        if (!fillFinished) return;
                        // Fill complete — trigger the action and animate back
                        scheduleOnRN(handleComplete);
                        circleProgress.value = 0;
                        translateX.value = withTiming(0, { duration: 300 });
                    });
                });
            } else if (e.translationX < -LEFT_BUTTONS_WIDTH * 0.5) {
                // Snap left to show buttons
                buttonsOpen.value = true;
                translateX.value = withSpring(-LEFT_BUTTONS_WIDTH, { damping: 30, stiffness: 180 });
            } else {
                // Snap back
                buttonsOpen.value = false;
                translateX.value = withSpring(0, { damping: 30, stiffness: 180 });
            }
        });

    const tap = Gesture.Tap()
        .onEnd(() => {
            translateX.value = withTiming(containerWidth.value, { duration: 200 }, (finished) => {
                if (!finished) return;
                circleProgress.value = withTiming(1, { duration: 1500, easing: Easing.linear }, (fillFinished) => {
                    if (!fillFinished) return;
                    scheduleOnRN(handleComplete);
                    circleProgress.value = 0;
                    translateX.value = withTiming(0, { duration: 300 });
                });
            });
        });

    const gesture = Gesture.Race(pan, tap);

    const foregroundStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    const rightButtonsStyle = useAnimatedStyle(() => ({
        width: translateX.value >= 0 ? 0 : -translateX.value + BORDER_RADIUS,
    }));

    const iconOpacityStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            -translateX.value,
            [0, LEFT_BUTTONS_WIDTH * 0.4, LEFT_BUTTONS_WIDTH * 0.7, LEFT_BUTTONS_WIDTH],
            [0, 0.1, 0.4, 1],
            'clamp'
        ),
    }));

    return (
        <FloatingSheet style={style}>
            <View
                style={localStyles.wrapper}
                onLayout={(e) => {
                    containerWidth.value = e.nativeEvent.layout.width;
                }}
            >
                {/* Right-swipe underlay: red completed */}
                <View style={[localStyles.underlayLeft, localStyles.completedBg, { backgroundColor: color }]}>
                    <Text style={localStyles.completedText}>Completed</Text>
                    <Pressable onPress={handleCancelCircle}>
                        <LoadingCircle size={40} progress={circleProgress} color="#FFF">
                            <Text style={localStyles.buttonText}>✕</Text>
                        </LoadingCircle>
                    </Pressable>
                </View>

                {/* Left-swipe underlay: edit + delete buttons */}
                <Animated.View style={[localStyles.underlayRight, rightButtonsStyle]}>
                    <Pressable style={[localStyles.button, localStyles.editButton]} onPress={onEdit}>
                        <Animated.Text style={[localStyles.buttonText, iconOpacityStyle]}>✎</Animated.Text>
                    </Pressable>
                    <Pressable style={[localStyles.button, localStyles.deleteButton]} onPress={onDelete}>
                        <Animated.Text style={[localStyles.buttonText, iconOpacityStyle]}>✕</Animated.Text>
                    </Pressable>
                </Animated.View>

                <GestureDetector gesture={gesture}>
                    <Animated.View style={[styles.container, foregroundStyle]}>
                        <View style={[styles.marker, { backgroundColor: color }]} />
                        <Text style={styles.title}>{title}</Text>
                    </Animated.View>
                </GestureDetector>
            </View>
        </FloatingSheet>
    );
}

const localStyles = StyleSheet.create({
    wrapper: {
        position: "relative",
        overflow: "hidden",
        borderRadius: 34,
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
        backgroundColor: "#E53935",
    },
    completedBg: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
    },
    completedText: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "bold",
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
        backgroundColor: "#1E88E5",
        paddingLeft: BORDER_RADIUS,
        zIndex: 1,
    },
    deleteButton: {
        backgroundColor: "#E53935",
    },
    buttonText: {
        color: "#FFF",
        fontSize: 22,
        fontWeight: "bold",
    },
});