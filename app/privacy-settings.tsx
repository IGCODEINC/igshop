import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Switch } from "react-native";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Shield,
  Eye,
  Bell,
  MapPin,
  Database,
} from "lucide-react-native";

export default function PrivacySettingsScreen() {
  const router = useRouter();
  const [privacySettings, setPrivacySettings] = useState({
    locationTracking: true,
    dataCollection: true,
    targetedAds: false,
    shareUsageData: false,
    activityStatus: true,
  });

  const handleBack = () => {
    router.back();
  };

  const toggleSwitch = (key: keyof typeof privacySettings) => {
    setPrivacySettings({
      ...privacySettings,
      [key]: !privacySettings[key],
    });
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
          Privacidade
        </Text>
      </View>

      <ScrollView className="flex-1 p-6">
        <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <View className="flex-row items-center mb-6">
            <View className="bg-blue-100 p-3 rounded-full">
              <Shield size={24} color="#2563EB" />
            </View>
            <Text className="ml-4 text-lg font-semibold text-gray-800">
              Configurações de Privacidade
            </Text>
          </View>

          <Text className="text-gray-600 mb-6">
            Controle como seus dados são usados e compartilhados no aplicativo.
          </Text>

          {/* Location Tracking */}
          <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
            <View className="flex-row items-center flex-1 mr-4">
              <View className="bg-blue-50 p-2 rounded-full">
                <MapPin size={20} color="#2563EB" />
              </View>
              <View className="ml-3">
                <Text className="text-gray-800 font-medium">Localização</Text>
                <Text className="text-gray-500 text-sm">
                  Permitir rastreamento de localização
                </Text>
              </View>
            </View>
            <Switch
              value={privacySettings.locationTracking}
              onValueChange={() => toggleSwitch("locationTracking")}
              trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
              thumbColor={
                privacySettings.locationTracking ? "#2563EB" : "#F3F4F6"
              }
            />
          </View>

          {/* Data Collection */}
          <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
            <View className="flex-row items-center flex-1 mr-4">
              <View className="bg-blue-50 p-2 rounded-full">
                <Database size={20} color="#2563EB" />
              </View>
              <View className="ml-3">
                <Text className="text-gray-800 font-medium">
                  Coleta de dados
                </Text>
                <Text className="text-gray-500 text-sm">
                  Permitir coleta de dados de uso
                </Text>
              </View>
            </View>
            <Switch
              value={privacySettings.dataCollection}
              onValueChange={() => toggleSwitch("dataCollection")}
              trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
              thumbColor={
                privacySettings.dataCollection ? "#2563EB" : "#F3F4F6"
              }
            />
          </View>

          {/* Targeted Ads */}
          <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
            <View className="flex-row items-center flex-1 mr-4">
              <View className="bg-blue-50 p-2 rounded-full">
                <Eye size={20} color="#2563EB" />
              </View>
              <View className="ml-3">
                <Text className="text-gray-800 font-medium">
                  Anúncios personalizados
                </Text>
                <Text className="text-gray-500 text-sm">
                  Permitir anúncios baseados em seus interesses
                </Text>
              </View>
            </View>
            <Switch
              value={privacySettings.targetedAds}
              onValueChange={() => toggleSwitch("targetedAds")}
              trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
              thumbColor={privacySettings.targetedAds ? "#2563EB" : "#F3F4F6"}
            />
          </View>

          {/* Share Usage Data */}
          <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
            <View className="flex-row items-center flex-1 mr-4">
              <View className="bg-blue-50 p-2 rounded-full">
                <Database size={20} color="#2563EB" />
              </View>
              <View className="ml-3">
                <Text className="text-gray-800 font-medium">
                  Compartilhar dados
                </Text>
                <Text className="text-gray-500 text-sm">
                  Compartilhar dados com parceiros
                </Text>
              </View>
            </View>
            <Switch
              value={privacySettings.shareUsageData}
              onValueChange={() => toggleSwitch("shareUsageData")}
              trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
              thumbColor={
                privacySettings.shareUsageData ? "#2563EB" : "#F3F4F6"
              }
            />
          </View>

          {/* Activity Status */}
          <View className="flex-row items-center justify-between p-4">
            <View className="flex-row items-center flex-1 mr-4">
              <View className="bg-blue-50 p-2 rounded-full">
                <Bell size={20} color="#2563EB" />
              </View>
              <View className="ml-3">
                <Text className="text-gray-800 font-medium">
                  Status de atividade
                </Text>
                <Text className="text-gray-500 text-sm">
                  Mostrar quando você está online
                </Text>
              </View>
            </View>
            <Switch
              value={privacySettings.activityStatus}
              onValueChange={() => toggleSwitch("activityStatus")}
              trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
              thumbColor={
                privacySettings.activityStatus ? "#2563EB" : "#F3F4F6"
              }
            />
          </View>
        </View>

        <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Política de Privacidade
          </Text>
          <Text className="text-gray-600 mb-3">
            Nossa política de privacidade explica como coletamos, usamos e
            protegemos suas informações pessoais quando você usa nosso
            aplicativo.
          </Text>
          <TouchableOpacity className="mb-4">
            <Text className="text-blue-600 font-medium">
              Ler política de privacidade completa
            </Text>
          </TouchableOpacity>

          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Termos de Uso
          </Text>
          <Text className="text-gray-600 mb-3">
            Nossos termos de uso estabelecem as regras e diretrizes para o uso
            do aplicativo e seus serviços.
          </Text>
          <TouchableOpacity>
            <Text className="text-blue-600 font-medium">
              Ler termos de uso completos
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="bg-white rounded-xl p-4 shadow-sm mb-6 items-center">
          <Text className="text-red-600 font-medium">
            Solicitar exclusão de dados
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
