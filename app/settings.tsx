import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Switch } from "react-native";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Bell,
  Globe,
  Moon,
  Lock,
  Shield,
  HelpCircle,
  Info,
  ChevronRight,
} from "lucide-react-native";

export default function SettingsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState({
    pushEnabled: true,
    emailEnabled: true,
    orderUpdates: true,
    promotions: false,
  });
  const [darkMode, setDarkMode] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleNavigate = (route: string) => {
    router.push(route);
  };

  const toggleSwitch = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    });
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-white p-6 pt-12 flex-row items-center">
        <TouchableOpacity
          onPress={handleBack}
          className="p-2 rounded-full bg-gray-100"
        >
          <ArrowLeft size={20} color="#4B5563" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800 ml-4">
          Configurações
        </Text>
      </View>

      <ScrollView className="flex-1">
        {/* Notifications Section */}
        <View className="mt-4 mb-2 px-6">
          <Text className="text-lg font-bold text-gray-800">Notificações</Text>
        </View>

        <View className="bg-white mb-4">
          <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
            <View className="flex-row items-center">
              <View className="bg-blue-100 p-2 rounded-full">
                <Bell size={20} color="#2563EB" />
              </View>
              <Text className="ml-3 text-gray-800">Notificações push</Text>
            </View>
            <Switch
              value={notifications.pushEnabled}
              onValueChange={() => toggleSwitch("pushEnabled")}
              trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
              thumbColor={notifications.pushEnabled ? "#2563EB" : "#F3F4F6"}
            />
          </View>

          <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
            <View className="flex-row items-center">
              <View className="bg-blue-100 p-2 rounded-full">
                <Bell size={20} color="#2563EB" />
              </View>
              <Text className="ml-3 text-gray-800">Notificações por email</Text>
            </View>
            <Switch
              value={notifications.emailEnabled}
              onValueChange={() => toggleSwitch("emailEnabled")}
              trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
              thumbColor={notifications.emailEnabled ? "#2563EB" : "#F3F4F6"}
            />
          </View>

          <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
            <View className="flex-row items-center">
              <Text className="ml-8 text-gray-800">
                Atualizações de pedidos
              </Text>
            </View>
            <Switch
              value={notifications.orderUpdates}
              onValueChange={() => toggleSwitch("orderUpdates")}
              trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
              thumbColor={notifications.orderUpdates ? "#2563EB" : "#F3F4F6"}
            />
          </View>

          <View className="flex-row items-center justify-between p-4">
            <View className="flex-row items-center">
              <Text className="ml-8 text-gray-800">Promoções e ofertas</Text>
            </View>
            <Switch
              value={notifications.promotions}
              onValueChange={() => toggleSwitch("promotions")}
              trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
              thumbColor={notifications.promotions ? "#2563EB" : "#F3F4F6"}
            />
          </View>
        </View>

        {/* Appearance Section */}
        <View className="mb-2 px-6">
          <Text className="text-lg font-bold text-gray-800">Aparência</Text>
        </View>

        <View className="bg-white mb-4">
          <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
            <View className="flex-row items-center">
              <View className="bg-blue-100 p-2 rounded-full">
                <Globe size={20} color="#2563EB" />
              </View>
              <Text className="ml-3 text-gray-800">Idioma</Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-gray-500 mr-2">Português</Text>
              <ChevronRight size={20} color="#9CA3AF" />
            </View>
          </View>

          <View className="flex-row items-center justify-between p-4">
            <View className="flex-row items-center">
              <View className="bg-blue-100 p-2 rounded-full">
                <Moon size={20} color="#2563EB" />
              </View>
              <Text className="ml-3 text-gray-800">Modo escuro</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
              thumbColor={darkMode ? "#2563EB" : "#F3F4F6"}
            />
          </View>
        </View>

        {/* Security Section */}
        <View className="mb-2 px-6">
          <Text className="text-lg font-bold text-gray-800">Segurança</Text>
        </View>

        <View className="bg-white mb-4">
          <TouchableOpacity
            onPress={() => handleNavigate("/security-settings")}
            className="flex-row items-center justify-between p-4 border-b border-gray-100"
          >
            <View className="flex-row items-center">
              <View className="bg-blue-100 p-2 rounded-full">
                <Lock size={20} color="#2563EB" />
              </View>
              <Text className="ml-3 text-gray-800">Alterar senha</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleNavigate("/privacy-settings")}
            className="flex-row items-center justify-between p-4"
          >
            <View className="flex-row items-center">
              <View className="bg-blue-100 p-2 rounded-full">
                <Shield size={20} color="#2563EB" />
              </View>
              <Text className="ml-3 text-gray-800">Privacidade</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View className="mb-2 px-6">
          <Text className="text-lg font-bold text-gray-800">Sobre</Text>
        </View>

        <View className="bg-white mb-8">
          <TouchableOpacity
            onPress={() => handleNavigate("/support-help")}
            className="flex-row items-center justify-between p-4 border-b border-gray-100"
          >
            <View className="flex-row items-center">
              <View className="bg-blue-100 p-2 rounded-full">
                <HelpCircle size={20} color="#2563EB" />
              </View>
              <Text className="ml-3 text-gray-800">Ajuda e suporte</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleNavigate("/about-app")}
            className="flex-row items-center justify-between p-4"
          >
            <View className="flex-row items-center">
              <View className="bg-blue-100 p-2 rounded-full">
                <Info size={20} color="#2563EB" />
              </View>
              <Text className="ml-3 text-gray-800">Sobre o app</Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-gray-500 mr-2">Versão 1.0.0</Text>
              <ChevronRight size={20} color="#9CA3AF" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
