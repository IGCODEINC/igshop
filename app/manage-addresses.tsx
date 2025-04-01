import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Switch,
} from "react-native";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  MapPin,
  Home,
  Briefcase,
  Heart,
  Edit2,
  Trash2,
  Plus,
} from "lucide-react-native";

interface Address {
  id: string;
  title: string;
  address: string;
  complement?: string;
  reference?: string;
  isDefault: boolean;
}

export default function ManageAddressesScreen() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      title: "Casa",
      address: "Rua das Flores, 123 - Jardim Primavera, São Paulo - SP",
      complement: "Apto 101",
      reference: "Próximo ao mercado",
      isDefault: true,
    },
    {
      id: "2",
      title: "Trabalho",
      address: "Av. Paulista, 1000 - Bela Vista, São Paulo - SP",
      complement: "10º andar",
      isDefault: false,
    },
    {
      id: "3",
      title: "Academia",
      address: "Rua dos Esportes, 50 - Moema, São Paulo - SP",
      isDefault: false,
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleAddAddress = () => {
    setIsEditing(true);
    setCurrentAddress({
      id: Date.now().toString(),
      title: "",
      address: "",
      isDefault: addresses.length === 0,
    });
  };

  const handleEditAddress = (address: Address) => {
    setIsEditing(true);
    setCurrentAddress(address);
  };

  const handleDeleteAddress = (id: string) => {
    const newAddresses = addresses.filter((address) => address.id !== id);
    setAddresses(newAddresses);
  };

  const handleSaveAddress = () => {
    if (!currentAddress) return;

    const newAddresses = addresses.filter(
      (address) => address.id !== currentAddress.id,
    );

    // If setting as default, remove default from others
    if (currentAddress.isDefault) {
      newAddresses.forEach((address) => {
        address.isDefault = false;
      });
    }

    setAddresses([...newAddresses, currentAddress]);
    setIsEditing(false);
    setCurrentAddress(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentAddress(null);
  };

  const updateCurrentAddress = (field: keyof Address, value: any) => {
    if (!currentAddress) return;
    setCurrentAddress({ ...currentAddress, [field]: value });
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
            {isEditing
              ? currentAddress?.id
                ? "Editar endereço"
                : "Novo endereço"
              : "Meus endereços"}
          </Text>
        </View>

        {!isEditing ? (
          <ScrollView className="flex-1">
            {addresses.map((address) => (
              <View
                key={address.id}
                className="border border-gray-200 rounded-lg p-4 mb-4"
              >
                <View className="flex-row justify-between items-center mb-2">
                  <View className="flex-row items-center">
                    <View
                      className={`p-2 rounded-full ${address.isDefault ? "bg-blue-100" : "bg-gray-100"}`}
                    >
                      {address.title === "Casa" ? (
                        <Home
                          size={16}
                          color={address.isDefault ? "#2563EB" : "#6B7280"}
                        />
                      ) : address.title === "Trabalho" ? (
                        <Briefcase
                          size={16}
                          color={address.isDefault ? "#2563EB" : "#6B7280"}
                        />
                      ) : (
                        <MapPin
                          size={16}
                          color={address.isDefault ? "#2563EB" : "#6B7280"}
                        />
                      )}
                    </View>
                    <Text className="font-medium text-gray-800 ml-2">
                      {address.title}
                    </Text>
                    {address.isDefault && (
                      <View className="bg-blue-100 rounded-full px-2 py-1 ml-2">
                        <Text className="text-xs text-blue-600">Padrão</Text>
                      </View>
                    )}
                  </View>
                  <View className="flex-row">
                    <TouchableOpacity
                      onPress={() => handleEditAddress(address)}
                      className="p-2 mr-2"
                    >
                      <Edit2 size={16} color="#4B5563" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDeleteAddress(address.id)}
                      className="p-2"
                    >
                      <Trash2 size={16} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text className="text-gray-600 mb-1">{address.address}</Text>
                {address.complement && (
                  <Text className="text-gray-600 mb-1">
                    Complemento: {address.complement}
                  </Text>
                )}
                {address.reference && (
                  <Text className="text-gray-600">
                    Referência: {address.reference}
                  </Text>
                )}
              </View>
            ))}

            {/* Add New Address Button */}
            <TouchableOpacity
              className="flex-row items-center justify-center p-4 border border-dashed border-gray-300 rounded-lg mb-6"
              onPress={handleAddAddress}
            >
              <Plus size={20} color="#6B7280" />
              <Text className="font-medium text-gray-800 ml-2">
                Adicionar novo endereço
              </Text>
            </TouchableOpacity>
          </ScrollView>
        ) : (
          <ScrollView className="flex-1">
            {/* Address Form */}
            <View className="mb-4">
              <Text className="font-medium text-gray-800 mb-2">Título</Text>
              <TextInput
                className="bg-gray-100 rounded-lg px-4 py-3 text-gray-800"
                placeholder="Ex: Casa, Trabalho, Academia"
                value={currentAddress?.title}
                onChangeText={(text) => updateCurrentAddress("title", text)}
              />
            </View>

            <View className="mb-4">
              <Text className="font-medium text-gray-800 mb-2">Endereço</Text>
              <TextInput
                className="bg-gray-100 rounded-lg px-4 py-3 text-gray-800"
                placeholder="Rua, número, bairro, cidade, estado"
                value={currentAddress?.address}
                onChangeText={(text) => updateCurrentAddress("address", text)}
              />
            </View>

            <View className="mb-4">
              <Text className="font-medium text-gray-800 mb-2">
                Complemento (opcional)
              </Text>
              <TextInput
                className="bg-gray-100 rounded-lg px-4 py-3 text-gray-800"
                placeholder="Apartamento, bloco, andar"
                value={currentAddress?.complement}
                onChangeText={(text) =>
                  updateCurrentAddress("complement", text)
                }
              />
            </View>

            <View className="mb-6">
              <Text className="font-medium text-gray-800 mb-2">
                Ponto de referência (opcional)
              </Text>
              <TextInput
                className="bg-gray-100 rounded-lg px-4 py-3 text-gray-800"
                placeholder="Próximo a..."
                value={currentAddress?.reference}
                onChangeText={(text) => updateCurrentAddress("reference", text)}
              />
            </View>

            <View className="flex-row justify-between items-center mb-8">
              <Text className="font-medium text-gray-800">
                Definir como endereço padrão
              </Text>
              <Switch
                value={currentAddress?.isDefault}
                onValueChange={(value) =>
                  updateCurrentAddress("isDefault", value)
                }
                trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
                thumbColor={currentAddress?.isDefault ? "#2563EB" : "#F3F4F6"}
              />
            </View>

            {/* Save and Cancel Buttons */}
            <View className="flex-row justify-between mb-6">
              <TouchableOpacity
                className="flex-1 bg-gray-200 rounded-lg py-3 mr-2"
                onPress={handleCancelEdit}
              >
                <Text className="text-gray-800 font-medium text-center">
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 bg-blue-600 rounded-lg py-3 ml-2"
                onPress={handleSaveAddress}
              >
                <Text className="text-white font-medium text-center">
                  Salvar
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
