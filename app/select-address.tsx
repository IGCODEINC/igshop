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
import { ArrowLeft, MapPin, Search, Plus, Check } from "lucide-react-native";

interface Address {
  id: string;
  title: string;
  address: string;
  isDefault: boolean;
}

export default function SelectAddressScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      title: "Casa",
      address: "Rua das Flores, 123 - Jardim Primavera, São Paulo - SP",
      isDefault: true,
    },
    {
      id: "2",
      title: "Trabalho",
      address: "Av. Paulista, 1000 - Bela Vista, São Paulo - SP",
      isDefault: false,
    },
    {
      id: "3",
      title: "Academia",
      address: "Rua dos Esportes, 50 - Moema, São Paulo - SP",
      isDefault: false,
    },
  ]);

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleAddressSelect = (address: Address) => {
    console.log("Selected address:", address);
    router.back();
  };

  const handleAddNewAddress = () => {
    router.push("/manage-addresses");
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    // Implement search logic here
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <View className="flex-1 p-6 pt-12">
        {/* Header */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity
            onPress={handleBack}
            className="p-2 rounded-full bg-gray-100"
          >
            <ArrowLeft size={20} color="#4B5563" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-800 ml-4">
            Selecionar endereço
          </Text>
        </View>

        {/* Search Bar */}
        <View className="relative mb-6">
          <View className="absolute left-3 top-3 z-10">
            <Search size={20} color="#6b7280" />
          </View>
          <TextInput
            className="bg-gray-100 rounded-lg px-10 py-3 text-gray-800"
            placeholder="Buscar endereço"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        {/* Map Placeholder */}
        <View className="bg-gray-200 h-40 rounded-lg mb-6 items-center justify-center">
          <Text className="text-gray-500">Mapa será exibido aqui</Text>
          <Text className="text-gray-500 text-sm">
            (Implementação com MapView do Expo)
          </Text>
        </View>

        {/* Address List */}
        <ScrollView className="flex-1">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Endereços salvos
          </Text>

          {addresses.map((address) => (
            <TouchableOpacity
              key={address.id}
              className="flex-row items-center p-4 border border-gray-200 rounded-lg mb-3"
              onPress={() => handleAddressSelect(address)}
            >
              <View
                className={`p-2 rounded-full ${address.isDefault ? "bg-blue-100" : "bg-gray-100"}`}
              >
                <MapPin
                  size={20}
                  color={address.isDefault ? "#2563EB" : "#6B7280"}
                />
              </View>
              <View className="flex-1 ml-3">
                <View className="flex-row items-center">
                  <Text className="font-medium text-gray-800">
                    {address.title}
                  </Text>
                  {address.isDefault && (
                    <View className="bg-blue-100 rounded-full px-2 py-1 ml-2">
                      <Text className="text-xs text-blue-600">Padrão</Text>
                    </View>
                  )}
                </View>
                <Text className="text-gray-600 text-sm mt-1">
                  {address.address}
                </Text>
              </View>
              {address.isDefault && (
                <Check size={20} color="#2563EB" className="ml-2" />
              )}
            </TouchableOpacity>
          ))}

          {/* Add New Address Button */}
          <TouchableOpacity
            className="flex-row items-center p-4 border border-dashed border-gray-300 rounded-lg mb-6"
            onPress={handleAddNewAddress}
          >
            <View className="p-2 rounded-full bg-gray-100">
              <Plus size={20} color="#6B7280" />
            </View>
            <Text className="font-medium text-gray-800 ml-3">
              Adicionar novo endereço
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
