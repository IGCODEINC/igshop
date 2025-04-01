import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Info,
  Github,
  Globe,
  Mail,
  Shield,
  BookOpen,
} from "lucide-react-native";

export default function AboutAppScreen() {
  const router = useRouter();
  const appVersion = "1.0.0";
  const buildNumber = "100";

  const handleBack = () => {
    router.back();
  };

  const openWebsite = () => {
    Linking.openURL("https://example.com");
  };

  const openPrivacyPolicy = () => {
    Linking.openURL("https://example.com/privacy");
  };

  const openTermsOfService = () => {
    Linking.openURL("https://example.com/terms");
  };

  const sendEmail = () => {
    Linking.openURL("mailto:support@example.com");
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-white p-6 pt-12 flex-row items-center border-b border-gray-200">
        <TouchableOpacity
          onPress={handleBack}
          className="p-2 rounded-full bg-gray-100"
        >
          <ArrowLeft size={20} color="#4B5563" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800 ml-4">
          Sobre o App
        </Text>
      </View>

      <ScrollView className="flex-1 p-6">
        {/* App Info */}
        <View className="bg-white rounded-xl p-6 shadow-sm mb-6 items-center">
          <Image
            source={require("../assets/images/icon.png")}
            style={{ width: 80, height: 80 }}
            contentFit="contain"
            className="rounded-xl mb-4"
          />
          <Text className="text-2xl font-bold text-gray-800 mb-1">
            SuperApp
          </Text>
          <Text className="text-gray-500 mb-4">
            Versão {appVersion} (Build {buildNumber})
          </Text>

          <View className="w-full bg-blue-50 rounded-lg p-4 mb-4">
            <Text className="text-center text-blue-700">
              Plataforma de entrega e serviços multifuncionais
            </Text>
          </View>

          <Text className="text-gray-600 text-center mb-6">
            SuperApp é uma plataforma completa que reúne serviços de entrega de
            comida, compras de supermercado, serviços profissionais e comércio
            eletrônico em um único aplicativo.
          </Text>

          <View className="flex-row justify-center space-x-4 mb-2">
            <TouchableOpacity
              onPress={openWebsite}
              className="bg-blue-100 p-3 rounded-full"
            >
              <Globe size={24} color="#2563EB" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={sendEmail}
              className="bg-blue-100 p-3 rounded-full"
            >
              <Mail size={24} color="#2563EB" />
            </TouchableOpacity>
            <TouchableOpacity className="bg-blue-100 p-3 rounded-full">
              <Github size={24} color="#2563EB" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Team */}
        <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <View className="flex-row items-center mb-4">
            <View className="bg-blue-100 p-2 rounded-full">
              <Info size={20} color="#2563EB" />
            </View>
            <Text className="ml-3 text-lg font-semibold text-gray-800">
              Equipe de Desenvolvimento
            </Text>
          </View>

          <Text className="text-gray-600 mb-4">
            Desenvolvido com ❤️ pela equipe SuperApp.
          </Text>

          <Text className="text-gray-600 mb-2">
            Agradecemos a todos os nossos usuários pelo apoio contínuo e
            feedback que nos ajudam a melhorar o aplicativo constantemente.
          </Text>
        </View>

        {/* Legal */}
        <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <View className="flex-row items-center mb-4">
            <View className="bg-blue-100 p-2 rounded-full">
              <Shield size={20} color="#2563EB" />
            </View>
            <Text className="ml-3 text-lg font-semibold text-gray-800">
              Informações Legais
            </Text>
          </View>

          <TouchableOpacity
            onPress={openPrivacyPolicy}
            className="flex-row items-center py-3 border-b border-gray-100"
          >
            <BookOpen size={18} color="#4B5563" />
            <Text className="ml-3 text-gray-700">Política de Privacidade</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={openTermsOfService}
            className="flex-row items-center py-3"
          >
            <BookOpen size={18} color="#4B5563" />
            <Text className="ml-3 text-gray-700">Termos de Serviço</Text>
          </TouchableOpacity>
        </View>

        {/* Credits */}
        <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <Text className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} SuperApp. Todos os direitos
            reservados.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
