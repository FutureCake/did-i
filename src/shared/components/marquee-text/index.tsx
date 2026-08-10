import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { type StyleProp, Text, type TextStyle, View } from "react-native";
import Animated, {
    cancelAnimation,
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";

type FadeEdge = "left" | "right" | "both";

interface MarqueeTextProps {
    children: string;
    style?: StyleProp<TextStyle>;
    speed?: number;
    pauseDuration?: number;
    gap?: number;
    animate?: boolean;
    fade?: FadeEdge;
    fadeWidth?: number;
}

function MeasureElement({ onLayout, children }: { onLayout: (width: number) => void; children: React.ReactNode }) {
    return (
        <Animated.ScrollView
            horizontal
            style={{ position: "absolute", opacity: 0 }}
            pointerEvents="box-none"
        >
            <View onLayout={(e) => onLayout(e.nativeEvent.layout.width)}>
                {children}
            </View>
        </Animated.ScrollView>
    );
}

export default function MarqueeText({
    children,
    style,
    speed = 30,
    pauseDuration = 1500,
    gap = 48,
    animate = true,
    fade,
    fadeWidth = 10,
}: MarqueeTextProps) {

    const translateX = useSharedValue(0);
    const fadeOpacity = useSharedValue(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const [textWidth, setTextWidth] = useState(0);

    const overflow = textWidth > containerWidth && containerWidth > 0;
    const shouldAnimate = animate && overflow;

    const showFadeLeft = (fade === "left" || fade === "both") && overflow;
    const showFadeRight = (fade === "right" || fade === "both") && overflow;
    const cycleWidth = textWidth + gap;

    useEffect(() => {
        cancelAnimation(translateX);
        cancelAnimation(fadeOpacity);
        translateX.value = 0;
        fadeOpacity.value = 0;

        if (!shouldAnimate) return;

        const duration = (cycleWidth / speed) * 1000;
        const fadeInDuration = 300;
        const fadeOutDuration = 300;

        // Fade: 0 on mount, fade in when scroll starts, fade out before reset, repeat
        fadeOpacity.value = withDelay(
            pauseDuration,
            withRepeat(
                withSequence(
                    withTiming(1, { duration: fadeInDuration }),
                    withDelay(duration - fadeInDuration - fadeOutDuration, withTiming(0, { duration: fadeOutDuration })),
                    withDelay(pauseDuration, withTiming(0, { duration: 0 })),
                ),
                -1,
            ),
        );

        translateX.value = withDelay(
            pauseDuration,
            withRepeat(
                withSequence(
                    withTiming(-cycleWidth, { duration, easing: Easing.linear }),
                    withDelay(pauseDuration, withTiming(0, { duration: 0 })),
                ),
                -1,
            ),
        );
    }, [shouldAnimate, textWidth, containerWidth]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    const fadeAnimatedStyle = useAnimatedStyle(() => ({
        opacity: fadeOpacity.value,
    }));

    return (
        <View
            style={{ overflow: "hidden", flex: 1 }}
            onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
        >
            <MeasureElement onLayout={setTextWidth}>
                <Text style={style}>{children}</Text>
            </MeasureElement>
            <Animated.View style={[{ flexDirection: "row" }, animatedStyle]}>
                <Text numberOfLines={1} style={[style, { width: textWidth }]}>
                    {children}
                </Text>
                {overflow && (
                    <Text numberOfLines={1} style={[style, { width: textWidth, marginLeft: gap }]}>
                        {children}
                    </Text>
                )}
            </Animated.View>
            {showFadeLeft && (
                <Animated.View style={[{ position: "absolute", left: 0, top: 0, bottom: 0, width: fadeWidth }, fadeAnimatedStyle]} pointerEvents="none">
                    <LinearGradient
                        colors={["rgba(255,255,255,1)", "rgba(255,255,255,0)"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ flex: 1 }}
                    />
                </Animated.View>
            )}
            {showFadeRight && (
                <Animated.View style={[{ position: "absolute", right: 0, top: 0, bottom: 0, width: fadeWidth }, fadeAnimatedStyle]} pointerEvents="none">
                    <LinearGradient
                        colors={["rgba(255,255,255,0)", "rgba(255,255,255,1)"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ flex: 1 }}
                    />
                </Animated.View>
            )}
        </View>
    );
}
