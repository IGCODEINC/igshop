import React, { useEffect } from "react";
import { View } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  withSpring,
  withRepeat,
  Easing,
  runOnJS,
} from "react-native-reanimated";

export default function SplashScreen() {
  const router = useRouter();
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const rotation = useSharedValue(0);
  const translateY = useSharedValue(20);

  const navigateToOnboarding = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.replace("/onboarding");
  };

  useEffect(() => {
    // Initial animation sequence
    translateY.value = withSequence(
      withTiming(-20, { duration: 800, easing: Easing.out(Easing.back()) }),
      withTiming(0, { duration: 600, easing: Easing.inOut(Easing.quad) }),
    );

    // Opacity animation
    opacity.value = withSequence(
      withTiming(1, { duration: 800, easing: Easing.out(Easing.exp) }),
      withDelay(
        2000,
        withTiming(0, { duration: 800, easing: Easing.in(Easing.exp) }, () => {
          runOnJS(navigateToOnboarding)();
        }),
      ),
    );

    // Scale animation with spring physics for more natural feel
    scale.value = withSequence(
      withSpring(1.2, { damping: 12, stiffness: 100 }),
      withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) }),
      withDelay(2000, withSpring(0.8, { damping: 10, stiffness: 80 })),
    );

    // Subtle rotation animation
    rotation.value = withSequence(
      withTiming(0.05, { duration: 400 }),
      withTiming(-0.05, { duration: 800 }),
      withTiming(0, { duration: 400 }),
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { scale: scale.value },
        { translateY: translateY.value },
        { rotate: `${rotation.value}rad` },
      ],
    };
  });

  return (
    <View className="flex-1 bg-gradient-to-b from-blue-700 to-blue-500 justify-center items-center">
      <Animated.View style={animatedStyle} className="shadow-2xl">
        <Image
          source={require("../assets/images/icon.png")}
          style={{ width: 150, height: 150 }}
          contentFit="contain"
          className="rounded-3xl shadow-lg"
        />
      </Animated.View>
    </View>
  );
}
