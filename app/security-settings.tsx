import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  Shield,
  CheckCircle,
} from "lucide-react-native";

export default function SecuritySettingsScreen() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleBack = () => {
    router.back();
  };

  const handleChangePassword = () => {
    // Reset messages
    setSuccessMessage("");
    setErrorMessage("");

    // Validate inputs
    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage("Todos os campos são obrigatórios");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("As senhas não coincidem");
      return;
    }

    if (newPassword.length < 8) {
      setErrorMessage("A nova senha deve ter pelo menos 8 caracteres");
      return;
    }

    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage("Senha alterada com sucesso!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }, 1500);
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
          Alterar Senha
        </Text>
      </View>

      <ScrollView className="flex-1 p-6">
        <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <View className="flex-row items-center mb-6">
            <View className="bg-blue-100 p-3 rounded-full">
              <Lock size={24} color="#2563EB" />
            </View>
            <Text className="ml-4 text-lg font-semibold text-gray-800">
              Altere sua senha
            </Text>
          </View>

          <Text className="text-gray-600 mb-6">
            Para sua segurança, escolha uma senha forte que você não use em
            outros sites.
          </Text>

          {/* Current Password */}
          <View className="mb-4">
            <Text className="text-gray-700 mb-2 font-medium">Senha atual</Text>
            <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-3">
              <TextInput
                className="flex-1 text-gray-800"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry={!showCurrentPassword}
                placeholder="Digite sua senha atual"
                placeholderTextColor="#9CA3AF"
              />
              <TouchableOpacity
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? (
                  <EyeOff size={20} color="#6B7280" />
                ) : (
                  <Eye size={20} color="#6B7280" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* New Password */}
          <View className="mb-4">
            <Text className="text-gray-700 mb-2 font-medium">Nova senha</Text>
            <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-3">
              <TextInput
                className="flex-1 text-gray-800"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNewPassword}
                placeholder="Digite sua nova senha"
                placeholderTextColor="#9CA3AF"
              />
              <TouchableOpacity
                onPress={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeOff size={20} color="#6B7280" />
                ) : (
                  <Eye size={20} color="#6B7280" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password */}
          <View className="mb-6">
            <Text className="text-gray-700 mb-2 font-medium">
              Confirmar nova senha
            </Text>
            <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-3">
              <TextInput
                className="flex-1 text-gray-800"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                placeholder="Confirme sua nova senha"
                placeholderTextColor="#9CA3AF"
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} color="#6B7280" />
                ) : (
                  <Eye size={20} color="#6B7280" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Error Message */}
          {errorMessage ? (
            <View className="mb-4 p-3 bg-red-50 rounded-lg">
              <Text className="text-red-600">{errorMessage}</Text>
            </View>
          ) : null}

          {/* Success Message */}
          {successMessage ? (
            <View className="mb-4 p-3 bg-green-50 rounded-lg flex-row items-center">
              <CheckCircle size={20} color="#10B981" />
              <Text className="text-green-600 ml-2">{successMessage}</Text>
            </View>
          ) : null}

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleChangePassword}
            disabled={isLoading}
            className={`rounded-lg py-3 px-6 ${isLoading ? "bg-blue-400" : "bg-blue-600"} items-center`}
          >
            <Text className="text-white font-medium">
              {isLoading ? "Processando..." : "Alterar Senha"}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <View className="flex-row items-center mb-4">
            <View className="bg-blue-100 p-3 rounded-full">
              <Shield size={24} color="#2563EB" />
            </View>
            <Text className="ml-4 text-lg font-semibold text-gray-800">
              Dicas de segurança
            </Text>
          </View>

          <View className="mb-3">
            <Text className="text-gray-700 font-medium mb-1">
              Crie uma senha forte
            </Text>
            <Text className="text-gray-600">
              Use uma combinação de letras maiúsculas, minúsculas, números e
              símbolos.
            </Text>
          </View>

          <View className="mb-3">
            <Text className="text-gray-700 font-medium mb-1">
              Não reutilize senhas
            </Text>
            <Text className="text-gray-600">
              Evite usar a mesma senha em diferentes serviços ou sites.
            </Text>
          </View>

          <View>
            <Text className="text-gray-700 font-medium mb-1">
              Atualize regularmente
            </Text>
            <Text className="text-gray-600">
              Altere sua senha periodicamente para maior segurança.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
