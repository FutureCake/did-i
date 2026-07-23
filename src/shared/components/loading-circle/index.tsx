import { type ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedProps, useSharedValue, type SharedValue } from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export interface LoadingCircleProps {
    size?: number;
    strokeWidth?: number;
    color?: string;
    trackColor?: string;
    progress?: number | SharedValue<number>;
    children?: ReactNode;
}

export default function LoadingCircle({
    size = 48,
    strokeWidth = 4,
    color = "#007AFF",
    trackColor = "transparent",
    progress = 0,
    children,
}: LoadingCircleProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    const isAnimated = typeof progress === "object" && "value" in progress;
    const fallbackProgress = useSharedValue(isAnimated ? 0 : (progress as number));

    // Keep fallback in sync when a static number is passed
    if (!isAnimated) {
        fallbackProgress.value = progress as number;
    }

    const progressValue = isAnimated ? (progress as SharedValue<number>) : fallbackProgress;

    const animatedProps = useAnimatedProps(() => {
        const p = Math.max(0, Math.min(1, progressValue.value));
        return {
            strokeDashoffset: circumference * (1 - p),
        };
    });

    return (
        <View style={[styles.container, { width: size, height: size }]}>
            <Svg width={size} height={size} style={styles.svg}>
                {/* Track */}
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={trackColor}
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                {/* Progress arc */}
                <AnimatedCircle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeLinecap="round"
                    rotation={-90}
                    origin={`${size / 2}, ${size / 2}`}
                    animatedProps={animatedProps}
                />
            </Svg>
            {children && <View style={styles.center}>{children}</View>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    svg: {
        position: "absolute",
    },
    center: {
        justifyContent: "center",
        alignItems: "center",
    },
});
