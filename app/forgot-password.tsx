import React, { useState } from "react";
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
import { AtSign, Phone, ChevronRight, ArrowLeft } from "lucide-react-native";

export default function ForgotPasswordScreen() {
  const [activeTab, setActiveTab] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const handleResetPassword = () => {
    // Implement actual reset password logic here
    if (activeTab === "email") {
      console.log(`Reset password for email: ${email}`);
      // Send email with reset link
      alert("Um link de redefinição foi enviado para seu email.");
      router.push("/login");
    } else {
      console.log(`Reset password for phone: ${phone}`);
      // Send SMS with verification code
      router.push("/otp-verification");
    }
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
            Esqueceu a senha?
          </Text>
          <Text className="text-base text-gray-600 mb-8">
            Escolha como deseja redefinir sua senha
          </Text>

          {/* Tabs */}
          <View className="flex-row mb-6 border-b border-gray-200">
            <TouchableOpacity
              className={`flex-1 py-3 ${activeTab === "email" ? "border-b-2 border-blue-600" : ""}`}
              onPress={() => setActiveTab("email")}
            >
              <Text
                className={`text-center font-medium ${activeTab === "email" ? "text-blue-600" : "text-gray-500"}`}
              >
                Email
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-1 py-3 ${activeTab === "phone" ? "border-b-2 border-blue-600" : ""}`}
              onPress={() => setActiveTab("phone")}
            >
              <Text
                className={`text-center font-medium ${activeTab === "phone" ? "text-blue-600" : "text-gray-500"}`}
              >
                Telefone
              </Text>
            </TouchableOpacity>
          </View>

          {/* Email Input */}
          {activeTab === "email" && (
            <View className="relative mb-6">
              <View className="absolute left-3 top-3 z-10">
                <AtSign size={20} color="#6b7280" />
              </View>
              <TextInput
                className="bg-gray-100 rounded-lg px-10 py-3 text-gray-800"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          )}

          {/* Phone Input */}
          {activeTab === "phone" && (
            <View className="relative mb-6">
              <View className="absolute left-3 top-3 z-10">
                <Phone size={20} color="#6b7280" />
              </View>
              <TextInput
                className="bg-gray-100 rounded-lg px-10 py-3 text-gray-800"
                placeholder="Telefone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>
          )}

          {/* Reset Button */}
          <TouchableOpacity
            className="bg-blue-600 rounded-lg py-3 flex-row justify-center items-center mb-6"
            onPress={handleResetPassword}
          >
            <Text className="text-white font-medium mr-2">
              {activeTab === "email" ? "Enviar link" : "Enviar código"}
            </Text>
            <ChevronRight size={20} color="white" />
          </TouchableOpacity>

          {/* Login Link */}
          <View className="flex-row justify-center">
            <Text className="text-gray-600">Lembrou a senha? </Text>
            <TouchableOpacity onPress={handleBack}>
              <Text className="text-blue-600 font-medium">Voltar ao login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
