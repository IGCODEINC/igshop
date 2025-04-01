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
  Filter,
  Star,
  Clock,
  MapPin,
  Heart,
  ChevronDown,
  Utensils,
} from "lucide-react-native";
import Header from "./components/Header";
import BottomNavigation from "./components/BottomNavigation";

interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: string;
  distance: string;
  categories: string[];
  isFavorite: boolean;
}

export default function FoodScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "Todos" },
    { id: "pizza", name: "Pizza" },
    { id: "burger", name: "Hambúrguer" },
    { id: "japanese", name: "Japonês" },
    { id: "italian", name: "Italiano" },
    { id: "brazilian", name: "Brasileiro" },
    { id: "dessert", name: "Sobremesas" },
    { id: "healthy", name: "Saudável" },
  ];

  const restaurants: Restaurant[] = [
    {
      id: "1",
      name: "Pizzaria Napolitana",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&q=80",
      rating: 4.8,
      reviewCount: 342,
      deliveryTime: "25-35 min",
      deliveryFee: "R$ 5,99",
      distance: "1.2 km",
      categories: ["pizza", "italian"],
      isFavorite: true,
    },
    {
      id: "2",
      name: "Burger House",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&q=80",
      rating: 4.5,
      reviewCount: 187,
      deliveryTime: "30-45 min",
      deliveryFee: "R$ 6,99",
      distance: "2.5 km",
      categories: ["burger"],
      isFavorite: false,
    },
    {
      id: "3",
      name: "Sushi Express",
      image:
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&q=80",
      rating: 4.7,
      reviewCount: 256,
      deliveryTime: "40-55 min",
      deliveryFee: "R$ 7,99",
      distance: "3.1 km",
      categories: ["japanese"],
      isFavorite: true,
    },
    {
      id: "4",
      name: "Trattoria Italiana",
      image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&q=80",
      rating: 4.6,
      reviewCount: 198,
      deliveryTime: "35-50 min",
      deliveryFee: "R$ 8,99",
      distance: "4.2 km",
      categories: ["italian"],
      isFavorite: false,
    },
    {
      id: "5",
      name: "Açaí Tropical",
      image:
        "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=300&q=80",
      rating: 4.4,
      reviewCount: 145,
      deliveryTime: "20-30 min",
      deliveryFee: "R$ 4,99",
      distance: "1.8 km",
      categories: ["dessert", "brazilian"],
      isFavorite: false,
    },
    {
      id: "6",
      name: "Salada & Cia",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&q=80",
      rating: 4.3,
      reviewCount: 112,
      deliveryTime: "25-40 min",
      deliveryFee: "R$ 5,99",
      distance: "2.3 km",
      categories: ["healthy"],
      isFavorite: false,
    },
  ];

  const handleCategoryPress = (categoryId: string) => {
    setActiveCategory(categoryId === "all" ? null : categoryId);
  };

  const handleRestaurantPress = (restaurantId: string) => {
    // Navigate to restaurant details
    router.push(`/restaurant?id=${restaurantId}`);
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const filteredRestaurants = activeCategory
    ? restaurants.filter((restaurant) =>
        restaurant.categories.includes(activeCategory),
      )
    : restaurants;

  const searchedRestaurants = searchQuery
    ? filteredRestaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : filteredRestaurants;

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
            placeholder="Buscar restaurantes ou pratos"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={handleSearchChange}
          />
        </View>
      </View>

      {/* Categories */}
      <View className="bg-white py-3 border-b border-gray-200">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          className="gap-3"
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => handleCategoryPress(category.id)}
              className={`px-4 py-2 rounded-full ${activeCategory === category.id || (category.id === "all" && !activeCategory) ? "bg-blue-600" : "bg-gray-100"}`}
            >
              <Text
                className={`font-medium ${activeCategory === category.id || (category.id === "all" && !activeCategory) ? "text-white" : "text-gray-700"}`}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Filters */}
      <View className="flex-row justify-between items-center bg-white px-4 py-3 border-b border-gray-200">
        <TouchableOpacity className="flex-row items-center">
          <Text className="text-gray-700 mr-1">Ordenar</Text>
          <ChevronDown size={16} color="#4B5563" />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center">
          <Text className="text-gray-700 mr-1">Entrega</Text>
          <ChevronDown size={16} color="#4B5563" />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center">
          <Text className="text-gray-700 mr-1">Preço</Text>
          <ChevronDown size={16} color="#4B5563" />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center bg-gray-100 px-3 py-1 rounded-full">
          <Filter size={16} color="#4B5563" />
          <Text className="text-gray-700 ml-1">Filtros</Text>
        </TouchableOpacity>
      </View>

      {/* Restaurant List */}
      {searchedRestaurants.length === 0 ? (
        <View className="flex-1 justify-center items-center p-6">
          <Utensils size={48} color="#9CA3AF" />
          <Text className="text-gray-500 text-lg font-medium mt-4 mb-2">
            Nenhum restaurante encontrado
          </Text>
          <Text className="text-gray-400 text-center">
            Tente mudar os filtros ou a busca.
          </Text>
        </View>
      ) : (
        <FlatList
          data={searchedRestaurants}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleRestaurantPress(item.id)}
              className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden"
            >
              <View className="relative">
                <Image
                  source={{ uri: item.image }}
                  style={{ width: "100%", height: 150 }}
                  contentFit="cover"
                />
                <TouchableOpacity className="absolute top-2 right-2 bg-white p-2 rounded-full">
                  <Heart
                    size={20}
                    color={item.isFavorite ? "#EF4444" : "#9CA3AF"}
                    fill={item.isFavorite ? "#EF4444" : "none"}
                  />
                </TouchableOpacity>
              </View>
              <View className="p-3">
                <View className="flex-row justify-between items-start">
                  <Text className="font-bold text-lg text-gray-800">
                    {item.name}
                  </Text>
                  <View className="flex-row items-center bg-blue-50 px-2 py-1 rounded">
                    <Star size={14} color="#F59E0B" fill="#F59E0B" />
                    <Text className="text-blue-700 font-medium ml-1">
                      {item.rating}
                    </Text>
                  </View>
                </View>

                <Text className="text-gray-500 text-sm mb-2">
                  {item.reviewCount} avaliações
                </Text>

                <View className="flex-row items-center flex-wrap">
                  <View className="flex-row items-center mr-3">
                    <Clock size={14} color="#6B7280" />
                    <Text className="text-gray-600 text-sm ml-1">
                      {item.deliveryTime}
                    </Text>
                  </View>
                  <View className="flex-row items-center mr-3">
                    <MapPin size={14} color="#6B7280" />
                    <Text className="text-gray-600 text-sm ml-1">
                      {item.distance}
                    </Text>
                  </View>
                  <Text className="text-gray-600 text-sm">
                    Entrega {item.deliveryFee}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      <BottomNavigation />
    </View>
  );
}
