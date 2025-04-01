import React, { useState, useEffect } from "react";
import { View, Modal, TouchableOpacity, Text, Pressable } from "react-native";
import { X } from "lucide-react-native";
import LoginForm from "./LoginForm";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { Shadow } from "react-native-shadow-2";

interface AuthModalProps {
  isVisible?: boolean;
  onClose?: () => void;
  onLogin?: (method: string, data: any) => void;
  isLoading?: boolean;
}

const AuthModal = ({
  isVisible = true,
  onClose = () => {},
  onLogin = () => {},
  isLoading = false,
}: AuthModalProps) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);
  const translateY = useSharedValue(50);

  useEffect(() => {
    if (isVisible) {
      opacity.value = withTiming(1, {
        duration: 300,
        easing: Easing.out(Easing.cubic),
      });
      scale.value = withSpring(1, { damping: 15, stiffness: 120 });
      translateY.value = withSpring(0, { damping: 15, stiffness: 120 });
    } else {
      opacity.value = withTiming(0, { duration: 200 });
      scale.value = withTiming(0.9, { duration: 200 });
      translateY.value = withTiming(50, { duration: 200 });
    }
  }, [isVisible]);

  const backdropAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const modalAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }, { translateY: translateY.value }],
      opacity: interpolate(
        opacity.value,
        [0, 0.5, 1],
        [0, 0.8, 1],
        Extrapolate.CLAMP,
      ),
    };
  });

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
      animationType="none"
    >
      <Animated.View
        className="flex-1 justify-center items-center"
        style={backdropAnimatedStyle}
      >
        <Pressable className="absolute inset-0 bg-black/50" onPress={onClose} />
        <Animated.View style={modalAnimatedStyle}>
          <Shadow
            distance={10}
            startColor="rgba(0, 0, 0, 0.1)"
            offset={[0, 4]}
            style={{ borderRadius: 16 }}
          >
            <View className="bg-white rounded-2xl p-6 w-[90%] max-w-md">
              <View className="flex-row justify-between items-center mb-6">
                <Text className="text-2xl font-bold text-gray-800">
                  Sign In
                </Text>
                <TouchableOpacity
                  onPress={onClose}
                  className="p-2 bg-gray-100 rounded-full"
                >
                  <X size={20} color="#4B5563" />
                </TouchableOpacity>
              </View>

              <LoginForm onLogin={onLogin} isLoading={isLoading} />
            </View>
          </Shadow>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

export default AuthModal;
