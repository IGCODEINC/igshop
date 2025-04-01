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
  CreditCard,
  Calendar,
  Lock,
  Edit2,
  Trash2,
  Plus,
  Check,
} from "lucide-react-native";

interface Card {
  id: string;
  number: string;
  name: string;
  expiry: string;
  cvv: string;
  type: "visa" | "mastercard" | "amex" | "other";
  isDefault: boolean;
}

export default function ManageCardsScreen() {
  const [cards, setCards] = useState<Card[]>([
    {
      id: "1",
      number: "•••• •••• •••• 1234",
      name: "João Silva",
      expiry: "12/25",
      cvv: "***",
      type: "visa",
      isDefault: true,
    },
    {
      id: "2",
      number: "•••• •••• •••• 5678",
      name: "João Silva",
      expiry: "06/24",
      cvv: "***",
      type: "mastercard",
      isDefault: false,
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleAddCard = () => {
    setIsEditing(true);
    setCurrentCard({
      id: Date.now().toString(),
      number: "",
      name: "",
      expiry: "",
      cvv: "",
      type: "other",
      isDefault: cards.length === 0,
    });
  };

  const handleEditCard = (card: Card) => {
    setIsEditing(true);
    setCurrentCard(card);
  };

  const handleDeleteCard = (id: string) => {
    const newCards = cards.filter((card) => card.id !== id);
    setCards(newCards);
  };

  const handleSaveCard = () => {
    if (!currentCard) return;

    const newCards = cards.filter((card) => card.id !== currentCard.id);

    // If setting as default, remove default from others
    if (currentCard.isDefault) {
      newCards.forEach((card) => {
        card.isDefault = false;
      });
    }

    setCards([...newCards, currentCard]);
    setIsEditing(false);
    setCurrentCard(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentCard(null);
  };

  const updateCurrentCard = (field: keyof Card, value: any) => {
    if (!currentCard) return;
    setCurrentCard({ ...currentCard, [field]: value });
  };

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    const formatted = cleaned.replace(/(.{4})/g, "$1 ").trim();
    return formatted;
  };

  const formatExpiry = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    if (cleaned.length > 2) {
      return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
    }
    return cleaned;
  };

  const getCardTypeIcon = (type: string) => {
    switch (type) {
      case "visa":
        return "💳 Visa";
      case "mastercard":
        return "💳 Mastercard";
      case "amex":
        return "💳 American Express";
      default:
        return "💳 Cartão";
    }
  };

  const detectCardType = (number: string) => {
    const cleaned = number.replace(/\D/g, "");
    if (cleaned.startsWith("4")) return "visa";
    if (/^5[1-5]/.test(cleaned)) return "mastercard";
    if (/^3[47]/.test(cleaned)) return "amex";
    return "other";
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
              ? currentCard?.id && currentCard.id !== Date.now().toString()
                ? "Editar cartão"
                : "Novo cartão"
              : "Meus cartões"}
          </Text>
        </View>

        {!isEditing ? (
          <ScrollView className="flex-1">
            {cards.map((card) => (
              <View
                key={card.id}
                className="border border-gray-200 rounded-lg p-4 mb-4"
              >
                <View className="flex-row justify-between items-center mb-2">
                  <View className="flex-row items-center">
                    <Text className="font-medium text-gray-800">
                      {getCardTypeIcon(card.type)}
                    </Text>
                    {card.isDefault && (
                      <View className="bg-blue-100 rounded-full px-2 py-1 ml-2">
                        <Text className="text-xs text-blue-600">Padrão</Text>
                      </View>
                    )}
                  </View>
                  <View className="flex-row">
                    <TouchableOpacity
                      onPress={() => handleEditCard(card)}
                      className="p-2 mr-2"
                    >
                      <Edit2 size={16} color="#4B5563" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDeleteCard(card.id)}
                      className="p-2"
                    >
                      <Trash2 size={16} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text className="text-gray-600 mb-1">{card.number}</Text>
                <View className="flex-row justify-between">
                  <Text className="text-gray-600">{card.name}</Text>
                  <Text className="text-gray-600">Validade: {card.expiry}</Text>
                </View>
              </View>
            ))}

            {/* Add New Card Button */}
            <TouchableOpacity
              className="flex-row items-center justify-center p-4 border border-dashed border-gray-300 rounded-lg mb-6"
              onPress={handleAddCard}
            >
              <Plus size={20} color="#6B7280" />
              <Text className="font-medium text-gray-800 ml-2">
                Adicionar novo cartão
              </Text>
            </TouchableOpacity>
          </ScrollView>
        ) : (
          <ScrollView className="flex-1">
            {/* Card Form */}
            <View className="mb-4">
              <Text className="font-medium text-gray-800 mb-2">
                Número do cartão
              </Text>
              <View className="relative">
                <View className="absolute left-3 top-3 z-10">
                  <CreditCard size={20} color="#6b7280" />
                </View>
                <TextInput
                  className="bg-gray-100 rounded-lg px-10 py-3 text-gray-800"
                  placeholder="0000 0000 0000 0000"
                  value={currentCard?.number}
                  onChangeText={(text) => {
                    const formatted = formatCardNumber(text);
                    const type = detectCardType(text);
                    updateCurrentCard("number", formatted);
                    updateCurrentCard("type", type);
                  }}
                  keyboardType="number-pad"
                  maxLength={19} // 16 digits + 3 spaces
                />
              </View>
            </View>

            <View className="mb-4">
              <Text className="font-medium text-gray-800 mb-2">
                Nome no cartão
              </Text>
              <TextInput
                className="bg-gray-100 rounded-lg px-4 py-3 text-gray-800"
                placeholder="Nome como está no cartão"
                value={currentCard?.name}
                onChangeText={(text) => updateCurrentCard("name", text)}
                autoCapitalize="characters"
              />
            </View>

            <View className="flex-row mb-4">
              <View className="flex-1 mr-2">
                <Text className="font-medium text-gray-800 mb-2">Validade</Text>
                <View className="relative">
                  <View className="absolute left-3 top-3 z-10">
                    <Calendar size={20} color="#6b7280" />
                  </View>
                  <TextInput
                    className="bg-gray-100 rounded-lg px-10 py-3 text-gray-800"
                    placeholder="MM/AA"
                    value={currentCard?.expiry}
                    onChangeText={(text) => {
                      const formatted = formatExpiry(text);
                      updateCurrentCard("expiry", formatted);
                    }}
                    keyboardType="number-pad"
                    maxLength={5} // MM/YY
                  />
                </View>
              </View>

              <View className="flex-1 ml-2">
                <Text className="font-medium text-gray-800 mb-2">CVV</Text>
                <View className="relative">
                  <View className="absolute left-3 top-3 z-10">
                    <Lock size={20} color="#6b7280" />
                  </View>
                  <TextInput
                    className="bg-gray-100 rounded-lg px-10 py-3 text-gray-800"
                    placeholder="123"
                    value={currentCard?.cvv}
                    onChangeText={(text) => {
                      const cleaned = text.replace(/\D/g, "");
                      updateCurrentCard("cvv", cleaned);
                    }}
                    keyboardType="number-pad"
                    maxLength={4} // Some cards have 4-digit CVV
                    secureTextEntry
                  />
                </View>
              </View>
            </View>

            <View className="flex-row justify-between items-center mb-8">
              <Text className="font-medium text-gray-800">
                Definir como cartão padrão
              </Text>
              <Switch
                value={currentCard?.isDefault}
                onValueChange={(value) => updateCurrentCard("isDefault", value)}
                trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
                thumbColor={currentCard?.isDefault ? "#2563EB" : "#F3F4F6"}
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
                onPress={handleSaveCard}
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
