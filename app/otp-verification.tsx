import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, ChevronRight } from "lucide-react-native";

export default function OTPVerificationScreen() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (text: string, index: number) => {
    if (text.length > 1) {
      text = text[text.length - 1];
    }

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to next input if current input is filled
    if (text !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Move to previous input on backspace if current input is empty
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpValue = otp.join("");
    console.log(`Verifying OTP: ${otpValue}`);
    // Implement actual OTP verification logic here
    router.replace("/");
  };

  const handleResend = () => {
    // Implement resend OTP logic here
    setTimer(60);
    console.log("Resending OTP");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView className="flex-1">
        <View className="flex-1 p-6 pt-12">
          {/* Back Button */}
          <TouchableOpacity
            onPress={handleBack}
            className="p-2 rounded-full bg-gray-100 self-start mb-6"
          >
            <ArrowLeft size={20} color="#4B5563" />
          </TouchableOpacity>

          {/* Title */}
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            Verificação de código
          </Text>
          <Text className="text-base text-gray-600 mb-8">
            Enviamos um código de 6 dígitos para seu telefone
          </Text>

          {/* OTP Input */}
          <View className="flex-row justify-between mb-8">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                className="bg-gray-100 rounded-lg w-12 h-12 text-center text-xl font-bold text-gray-800"
                value={digit}
                onChangeText={(text) => handleOtpChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
              />
            ))}
          </View>

          {/* Verify Button */}
          <TouchableOpacity
            className="bg-blue-600 rounded-lg py-3 flex-row justify-center items-center mb-6"
            onPress={handleVerify}
          >
            <Text className="text-white font-medium mr-2">Verificar</Text>
            <ChevronRight size={20} color="white" />
          </TouchableOpacity>

          {/* Resend Code */}
          <View className="flex-row justify-center items-center">
            <Text className="text-gray-600">
              Não recebeu o código? {timer > 0 ? `Aguarde ${timer}s` : ""}
            </Text>
            {timer === 0 && (
              <TouchableOpacity onPress={handleResend} className="ml-1">
                <Text className="text-blue-600 font-medium">Reenviar</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
