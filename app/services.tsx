import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  Search,
  Star,
  Clock,
  MapPin,
  Heart,
  Briefcase,
  Calendar,
  Tool,
  Home,
  Scissors,
  Car,
  Laptop,
  Paintbrush,
} from "lucide-react-native";
import Header from "./components/Header";
import BottomNavigation from "./components/BottomNavigation";

interface ServiceProvider {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  category: string;
  price: string;
  distance: string;
  availability: string;
  isFavorite: boolean;
}

export default function ServicesScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "Todos", icon: Briefcase },
    { id: "cleaning", name: "Limpeza", icon: Home },
    { id: "repair", name: "Reparos", icon: Tool },
    { id: "beauty", name: "Beleza", icon: Scissors },
    { id: "auto", name: "Automotivo", icon: Car },
    { id: "tech", name: "Tecnologia", icon: Laptop },
    { id: "design", name: "Design", icon: Paintbrush },
  ];

  const serviceProviders: ServiceProvider[] = [
    {
      id: "1",
      name: "Limpeza Residencial Express",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&q=80",
      rating: 4.8,
      reviewCount: 156,
      category: "cleaning",
      price: "A partir de R$ 120,00",
      distance: "2.3 km",
      availability: "Hoje - 14:00, 16:00",
      isFavorite: true,
    },
    {
      id: "2",
      name: "Técnico em Informática 24h",
      image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=300&q=80",
      rating: 4.6,
      reviewCount: 98,
      category: "tech",
      price: "A partir de R$ 80,00",
      distance: "3.5 km",
      availability: "Hoje - 18:00, 20:00",
      isFavorite: false,
    },
    {
      id: "3",
      name: "Salão de Beleza Maria",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&q=80",
      rating: 4.9,
      reviewCount: 212,
      category: "beauty",
      price: "A partir de R$ 50,00",
      distance: "1.8 km",
      availability: "Amanhã - 09:00, 11:00, 14:00",
      isFavorite: false,
    },
    {
      id: "4",
      name: "Mecânica Rápida",
      image: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=300&q=80",
      rating: 4.5,
      reviewCount: 87,
      category: "auto",
      price: "A partir de R$ 150,00",
      distance: "4.2 km",
      availability: "Amanhã - 08:00, 10:00, 14:00",
      isFavorite: true,
    },
    {
      id: "5",
      name: "Eletricista 24h",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&q=80",
      rating: 4.7,
      reviewCount: 124,
      category: "repair",
      price: "A partir de R$ 100,00",
      distance: "2.7 km",
      availability: "Hoje - 16:00, 18:00, 20:00",
      isFavorite: false,
    },
    {
      id: "6",
      name: "Design Gráfico & Web",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&q=80",
      rating: 4.8,
      reviewCount: 76,
      category: "design",
      price: "A partir de R$ 200,00",
      distance: "Online",
      availability: "Disponível online",
      isFavorite: false,
    },
  ];

  const handleCategoryPress = (categoryId: string) => {
    setActiveCategory(categoryId === "all" ? null : categoryId);
  };

  const handleServicePress = (serviceId: string) => {
    // Navigate to service provider details
    router.push(`/service-provider?id=${serviceId}`);
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const filteredServices = activeCategory
    ? serviceProviders.filter((service) => service.category === activeCategory)
    : serviceProviders;

  const searchedServices = searchQuery
    ? filteredServices.filter((service) =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredServices;

  return (
    <View className="flex-1 bg-gray-100">
      <Header
        showSearch={false}
        onSearchPress={() => {}}
        onProfilePress={() => router.push("/profile")}
      />

      {/* Search Bar */}
      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2">
          <Search size={18} color="#9CA3AF" />
          <TextInput
            className="flex-1 ml-2 text-gray-800"
            placeholder="Buscar serviços"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={handleSearchChange}
          />
        </View>
      </View>

      {/* Categories */}
      <View className="bg-white py-4 border-b border-gray-200">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          className="gap-4"
        >
          {categories.map((category) => {
            const CategoryIcon = category.icon;
            const isActive =
              activeCategory === category.id ||
              (category.id === "all" && !activeCategory);

            return (
              <TouchableOpacity
                key={category.id}
                onPress={() => handleCategoryPress(category.id)}
                className="items-center"
              >
                <View
                  className={`w-14 h-14 rounded-full items-center justify-center mb-1 ${isActive ? "bg-blue-600" : "bg-gray-100"}`}
                >
                  <CategoryIcon
                    size={24}
                    color={isActive ? "white" : "#4B5563"}
                  />
                </View>
                <Text
                  className={`text-xs ${isActive ? "text-blue-600 font-medium" : "text-gray-600"}`}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Service Providers List */}
      {searchedServices.length === 0 ? (
        <View className="flex-1 justify-center items-center p-6">
          <Briefcase size={48} color="#9CA3AF" />
          <Text className="text-gray-500 text-lg font-medium mt-4 mb-2">
            Nenhum serviço encontrado
          </Text>
          <Text className="text-gray-400 text-center">
            Tente mudar os filtros ou a busca.
          </Text>
        </View>
      ) : (
        <FlatList
          data={searchedServices}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleServicePress(item.id)}
              className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden"
            >
              <View className="flex-row">
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 100, height: 100 }}
                  contentFit="cover"
                />
                <View className="flex-1 p-3">
                  <View className="flex-row justify-between items-start">
                    <View className="flex-1 mr-2">
                      <Text className="font-bold text-gray-800">{item.name}</Text>