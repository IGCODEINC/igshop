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
  ShoppingCart,
  Plus,
} from "lucide-react-native";
import Header from "./components/Header";
import BottomNavigation from "./components/BottomNavigation";

interface Store {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  distance: string;
  type: string;
  isFavorite: boolean;
}

interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  unit: string;
  storeId: string;
}

export default function GroceryScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "Todos" },
    { id: "supermarket", name: "Supermercados" },
    { id: "convenience", name: "Conveniência" },
    { id: "organic", name: "Orgânicos" },
    { id: "butcher", name: "Açougue" },
    { id: "bakery", name: "Padaria" },
    { id: "pharmacy", name: "Farmácia" },
    { id: "petshop", name: "Pet Shop" },
  ];

  const stores: Store[] = [
    {
      id: "1",
      name: "Supermercado Express",
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&q=80",
      rating: 4.6,
      deliveryTime: "30-45 min",
      deliveryFee: "R$ 5,99",
      distance: "1.8 km",
      type: "supermarket",
      isFavorite: true,
    },
    {
      id: "2",
      name: "Mercado Orgânico",
      image:
        "https://images.unsplash.com/photo-1543168256-418811576931?w=300&q=80",
      rating: 4.8,
      deliveryTime: "40-55 min",
      deliveryFee: "R$ 7,99",
      distance: "3.2 km",
      type: "organic",
      isFavorite: false,
    },
    {
      id: "3",
      name: "Mini Mercado 24h",
      image:
        "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=300&q=80",
      rating: 4.3,
      deliveryTime: "20-35 min",
      deliveryFee: "R$ 4,99",
      distance: "1.2 km",
      type: "convenience",
      isFavorite: false,
    },
  ];

  const featuredProducts: Product[] = [
    {
      id: "p1",
      name: "Banana Prata",
      image:
        "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=200&q=80",
      price: "R$ 5,99",
      unit: "kg",
      storeId: "1",
    },
    {
      id: "p2",
      name: "Leite Integral",
      image:
        "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&q=80",
      price: "R$ 4,79",
      originalPrice: "R$ 5,99",
      discount: "20%",
      unit: "1L",
      storeId: "1",
    },
    {
      id: "p3",
      name: "Pão Francês",
      image:
        "https://images.unsplash.com/photo-1549931319-a545dcf3bc7c?w=200&q=80",
      price: "R$ 12,90",
      unit: "kg",
      storeId: "2",
    },
    {
      id: "p4",
      name: "Maçã Fuji",
      image:
        "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=200&q=80",
      price: "R$ 8,99",
      originalPrice: "R$ 10,99",
      discount: "18%",
      unit: "kg",
      storeId: "2",
    },
  ];

  const handleCategoryPress = (categoryId: string) => {
    setActiveCategory(categoryId === "all" ? null : categoryId);
  };

  const handleStorePress = (storeId: string) => {
    // Navigate to store details
    router.push(`/grocery-store?id=${storeId}`);
  };

  const handleProductPress = (productId: string, storeId: string) => {
    // Navigate to product details
    router.push(`/product?id=${productId}&storeId=${storeId}`);
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const filteredStores = activeCategory
    ? stores.filter((store) => store.type === activeCategory)
    : stores;

  const searchedStores = searchQuery
    ? filteredStores.filter((store) =>
        store.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : filteredStores;

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
            placeholder="Buscar mercados ou produtos"
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

      <ScrollView className="flex-1">
        {/* Featured Products */}
        <View className="mt-4 mb-6">
          <View className="flex-row justify-between items-center px-4 mb-3">
            <Text className="text-lg font-bold text-gray-800">
              Ofertas do dia
            </Text>
            <TouchableOpacity>
              <Text className="text-blue-600">Ver todas</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 16, paddingRight: 8 }}
          >
            {featuredProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                onPress={() => handleProductPress(product.id, product.storeId)}
                className="bg-white rounded-xl shadow-sm mr-3 w-[140px] overflow-hidden"
              >
                <Image
                  source={{ uri: product.image }}
                  style={{ width: "100%", height: 100 }}
                  contentFit="cover"
                />
                {product.discount && (
                  <View className="absolute top-2 left-2 bg-red-500 px-2 py-1 rounded">
                    <Text className="text-white text-xs font-bold">
                      -{product.discount}
                    </Text>
                  </View>
                )}
                <View className="p-2">
                  <Text className="text-gray-800 font-medium" numberOfLines={1}>
                    {product.name}
                  </Text>
                  <Text className="text-gray-500 text-xs">{product.unit}</Text>
                  <View className="flex-row items-center mt-1">
                    <Text className="text-blue-700 font-bold">
                      {product.price}
                    </Text>
                    {product.originalPrice && (
                      <Text className="text-gray-400 text-xs ml-1 line-through">
                        {product.originalPrice}
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity className="mt-2 bg-blue-600 rounded-full p-1 w-7 h-7 items-center justify-center">
                    <Plus size={16} color="white" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Stores List */}
        <View className="px-4 mb-4">
          <Text className="text-lg font-bold text-gray-800 mb-3">
            Mercados próximos
          </Text>

          {searchedStores.length === 0 ? (
            <View className="bg-white rounded-xl p-6 items-center">
              <ShoppingCart size={48} color="#9CA3AF" />
              <Text className="text-gray-500 text-lg font-medium mt-4 mb-2">
                Nenhum mercado encontrado
              </Text>
              <Text className="text-gray-400 text-center">
                Tente mudar os filtros ou a busca.
              </Text>
            </View>
          ) : (
            searchedStores.map((store) => (
              <TouchableOpacity
                key={store.id}
                onPress={() => handleStorePress(store.id)}
                className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden"
              >
                <View className="relative">
                  <Image
                    source={{ uri: store.image }}
                    style={{ width: "100%", height: 120 }}
                    contentFit="cover"
                  />
                  <TouchableOpacity className="absolute top-2 right-2 bg-white p-2 rounded-full">
                    <Heart
                      size={20}
                      color={store.isFavorite ? "#EF4444" : "#9CA3AF"}
                      fill={store.isFavorite ? "#EF4444" : "none"}
                    />
                  </TouchableOpacity>
                </View>
                <View className="p-3">
                  <View className="flex-row justify-between items-start">
                    <Text className="font-bold text-lg text-gray-800">
                      {store.name}
                    </Text>
                    <View className="flex-row items-center bg-blue-50 px-2 py-1 rounded">
                      <Star size={14} color="#F59E0B" fill="#F59E0B" />
                      <Text className="text-blue-700 font-medium ml-1">
                        {store.rating}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row items-center flex-wrap mt-2">
                    <View className="flex-row items-center mr-3">
                      <Clock size={14} color="#6B7280" />
                      <Text className="text-gray-600 text-sm ml-1">
                        {store.deliveryTime}
                      </Text>
                    </View>
                    <View className="flex-row items-center mr-3">
                      <MapPin size={14} color="#6B7280" />
                      <Text className="text-gray-600 text-sm ml-1">
                        {store.distance}
                      </Text>
                    </View>
                    <Text className="text-gray-600 text-sm">
                      Entrega {store.deliveryFee}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

      <BottomNavigation />
    </View>
  );
}
