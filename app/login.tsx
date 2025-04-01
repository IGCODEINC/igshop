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
  Facebook,
  Mail,
  Instagram,
} from "lucide-react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    // Implement actual login logic here
    router.replace("/");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // Implement social login logic
    router.replace("/");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView className="flex-1">
        <View className="flex-1 p-6 pt-16">
          {/* Logo and Welcome Text */}
          <View className="items-center mb-10">
            <Image
              source={require("../assets/images/icon.png")}
              style={{ width: 80, height: 80 }}
              contentFit="contain"
              className="rounded-full mb-4"
            />
            <Text className="text-2xl font-bold text-gray-800 mb-2">
              Bem-vindo de volta!
            </Text>
            <Text className="text-base text-gray-600 text-center">
              Faça login para continuar usando o SuperApp
            </Text>
          </View>

          {/* Email Input */}
          <View className="relative mb-4">
            <View className="absolute left-3 top-3 z-10">
              <AtSign size={20} color="#6b7280" />
            </View>
            <TextInput
              className="bg-gray-100 rounded-lg px-10 py-3 text-gray-800"
              placeholder="Email ou telefone"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password Input */}
          <View className="relative mb-2">
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

          {/* Forgot Password */}
          <TouchableOpacity
            className="self-end mb-6"
            onPress={handleForgotPassword}
          >
            <Text className="text-blue-600 text-sm">Esqueceu a senha?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            className="bg-blue-600 rounded-lg py-3 flex-row justify-center items-center mb-6"
            onPress={handleLogin}
          >
            <Text className="text-white font-medium mr-2">Entrar</Text>
            <ChevronRight size={20} color="white" />
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-[1px] bg-gray-300" />
            <Text className="mx-4 text-gray-500">ou continue com</Text>
            <View className="flex-1 h-[1px] bg-gray-300" />
          </View>

          {/* Social Login Buttons */}
          <View className="flex-row justify-between mb-8">
            <TouchableOpacity
              className="bg-[#4267B2] rounded-lg py-3 px-4 flex-row justify-center items-center flex-1 mr-2"
              onPress={() => handleSocialLogin("facebook")}
            >
              <Facebook size={20} color="white" />
              <Text className="text-white font-medium ml-2">Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-[#DB4437] rounded-lg py-3 px-4 flex-row justify-center items-center flex-1 mx-2"
              onPress={() => handleSocialLogin("google")}
            >
              <Mail size={20} color="white" />
              <Text className="text-white font-medium ml-2">Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] rounded-lg py-3 px-4 flex-row justify-center items-center flex-1 ml-2"
              onPress={() => handleSocialLogin("instagram")}
            >
              <Instagram size={20} color="white" />
              <Text className="text-white font-medium ml-2">Instagram</Text>
            </TouchableOpacity>
          </View>

          {/* Register Link */}
          <View className="flex-row justify-center">
            <Text className="text-gray-600">Não tem uma conta? </Text>
            <TouchableOpacity onPress={handleRegister}>
              <Text className="text-blue-600 font-medium">Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
