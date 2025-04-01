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
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  AtSign,
  Lock,
  ChevronRight,
  User,
  Phone,
  ArrowLeft,
} from "lucide-react-native";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleRegister = () => {
    // Implement actual registration logic here
    router.push("/otp-verification");
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
            Criar uma conta
          </Text>
          <Text className="text-base text-gray-600 mb-8">
            Preencha seus dados para se cadastrar
          </Text>

          {/* Name Input */}
          <View className="relative mb-4">
            <View className="absolute left-3 top-3 z-10">
              <User size={20} color="#6b7280" />
            </View>
            <TextInput
              className="bg-gray-100 rounded-lg px-10 py-3 text-gray-800"
              placeholder="Nome completo"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

          {/* Email Input */}
          <View className="relative mb-4">
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

          {/* Phone Input */}
          <View className="relative mb-4">
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

          {/* Password Input */}
          <View className="relative mb-4">
            <View className="absolute left-3 top-3 z-10">
              <Lock size={20} color="#6b7280" />
            </View>
            <TextInput
              className="bg-gray-100 rounded-lg px-10 py-3 text-gray-800"
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {/* Confirm Password Input */}
          <View className="relative mb-6">
            <View className="absolute left-3 top-3 z-10">
              <Lock size={20} color="#6b7280" />
            </View>
            <TextInput
              className="bg-gray-100 rounded-lg px-10 py-3 text-gray-800"
              placeholder="Confirmar senha"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          {/* Register Button */}
          <TouchableOpacity
            className="bg-blue-600 rounded-lg py-3 flex-row justify-center items-center mb-6"
            onPress={handleRegister}
          >
            <Text className="text-white font-medium mr-2">Cadastrar</Text>
            <ChevronRight size={20} color="white" />
          </TouchableOpacity>

          {/* Login Link */}
          <View className="flex-row justify-center">
            <Text className="text-gray-600">Já tem uma conta? </Text>
            <TouchableOpacity onPress={handleBack}>
              <Text className="text-blue-600 font-medium">Faça login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
