import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  TextInput,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  User,
  MapPin,
  CreditCard,
  Settings,
  Bell,
  LogOut,
  ChevronRight,
  Camera,
  Edit2,
  ArrowLeft,
} from "lucide-react-native";
import Header from "./components/Header";
import BottomNavigation from "./components/BottomNavigation";

export default function ProfileScreen() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "João Silva",
    email: "joao.silva@example.com",
    phone: "(11) 98765-4321",
    profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=joao",
  });

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Save profile logic here
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset form data
  };

  const handleChangeProfilePicture = () => {
    // Implement image picker logic
    console.log("Change profile picture");
  };

  const handleNavigate = (route: string) => {
    router.push(route);
  };

  const handleLogout = () => {
    // Implement logout logic
    router.replace("/login");
  };

  return (
    <View className="flex-1 bg-gray-100">
      <Header showSearch={false} />

      <ScrollView className="flex-1 pb-20">
        {!isEditing ? (
          <View className="bg-white p-6 mb-4">
            <View className="flex-row items-center">
              <Image
                source={{ uri: userData.profilePicture }}
                style={{ width: 80, height: 80 }}
                contentFit="cover"
                className="rounded-full"
              />
              <View className="ml-4 flex-1">
                <Text className="text-xl font-bold text-gray-800">
                  {userData.name}
                </Text>
                <Text className="text-gray-600">{userData.email}</Text>
                <Text className="text-gray-600">{userData.phone}</Text>
              </View>
              <TouchableOpacity
                onPress={handleEditProfile}
                className="p-2 bg-gray-100 rounded-full"
              >
                <Edit2 size={20} color="#4B5563" />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View className="bg-white p-6 mb-4">
            <View className="items-center mb-6">
              <View className="relative">
                <Image
                  source={{ uri: userData.profilePicture }}
                  style={{ width: 100, height: 100 }}
                  contentFit="cover"
                  className="rounded-full"
                />
                <TouchableOpacity
                  onPress={handleChangeProfilePicture}
                  className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full"
                >
                  <Camera size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 mb-1">Nome completo</Text>
              <TextInput
                className="bg-gray-100 rounded-lg px-4 py-3 text-gray-800"
                value={userData.name}
                onChangeText={(text) =>
                  setUserData({ ...userData, name: text })
                }
              />
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 mb-1">Email</Text>
              <TextInput
                className="bg-gray-100 rounded-lg px-4 py-3 text-gray-800"
                value={userData.email}
                onChangeText={(text) =>
                  setUserData({ ...userData, email: text })
                }
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View className="mb-6">
              <Text className="text-gray-700 mb-1">Telefone</Text>
              <TextInput
                className="bg-gray-100 rounded-lg px-4 py-3 text-gray-800"
                value={userData.phone}
                onChangeText={(text) =>
                  setUserData({ ...userData, phone: text })
                }
                keyboardType="phone-pad"
              />
            </View>

            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={handleCancelEdit}
                className="bg-gray-200 rounded-lg py-3 px-6"
              >
                <Text className="text-gray-800 font-medium">Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSaveProfile}
                className="bg-blue-600 rounded-lg py-3 px-6"
              >
                <Text className="text-white font-medium">Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Profile Menu */}
        <View className="bg-white mb-4">
          <TouchableOpacity
            onPress={() => handleNavigate("/manage-addresses")}
            className="flex-row items-center justify-between p-4 border-b border-gray-100"
          >
            <View className="flex-row items-center">
              <View className="bg-blue-100 p-2 rounded-full">
                <MapPin size={20} color="#2563EB" />
              </View>
              <Text className="ml-3 text-gray-800 font-medium">
                Meus endereços
              </Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleNavigate("/manage-cards")}
            className="flex-row items-center justify-between p-4 border-b border-gray-100"
          >
            <View className="flex-row items-center">
              <View className="bg-blue-100 p-2 rounded-full">
                <CreditCard size={20} color="#2563EB" />
              </View>
              <Text className="ml-3 text-gray-800 font-medium">
                Métodos de pagamento
              </Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleNavigate("/order-history")}
            className="flex-row items-center justify-between p-4 border-b border-gray-100"
          >
            <View className="flex-row items-center">
              <View className="bg-blue-100 p-2 rounded-full">
                <Bell size={20} color="#2563EB" />
              </View>
              <Text className="ml-3 text-gray-800 font-medium">
                Histórico de pedidos
              </Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleNavigate("/settings")}
            className="flex-row items-center justify-between p-4"
          >
            <View className="flex-row items-center">
              <View className="bg-blue-100 p-2 rounded-full">
                <Settings size={20} color="#2563EB" />
              </View>
              <Text className="ml-3 text-gray-800 font-medium">
                Configurações
              </Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-white flex-row items-center justify-center p-4 mb-8"
        >
          <LogOut size={20} color="#EF4444" />
          <Text className="ml-2 text-red-500 font-medium">Sair da conta</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNavigation activeTab="profile" />
    </View>
  );
}
