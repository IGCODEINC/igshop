import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Clock,
  Package,
  ShoppingBag,
  Utensils,
  ChevronRight,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react-native";

interface Order {
  id: string;
  type: "food" | "grocery" | "shopping" | "service";
  storeName: string;
  date: string;
  total: string;
  status: "completed" | "cancelled" | "in-progress" | "pending";
  items: number;
  image: string;
}

export default function OrderHistoryScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-1234",
      type: "food",
      storeName: "Restaurante Italiano",
      date: "15 Out 2023, 19:30",
      total: "R$ 78,90",
      status: "completed",
      items: 3,
      image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&q=80",
    },
    {
      id: "ORD-1235",
      type: "grocery",
      storeName: "Supermercado Express",
      date: "12 Out 2023, 10:15",
      total: "R$ 156,45",
      status: "completed",
      items: 12,
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&q=80",
    },
    {
      id: "ORD-1236",
      type: "shopping",
      storeName: "Loja de Eletrônicos",
      date: "05 Out 2023, 14:20",
      total: "R$ 1.299,00",
      status: "completed",
      items: 1,
      image:
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200&q=80",
    },
    {
      id: "ORD-1237",
      type: "food",
      storeName: "Hamburgueria Artesanal",
      date: "01 Out 2023, 20:45",
      total: "R$ 64,80",
      status: "cancelled",
      items: 2,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80",
    },
    {
      id: "ORD-1238",
      type: "service",
      storeName: "Serviço de Limpeza",
      date: "28 Set 2023, 09:00",
      total: "R$ 120,00",
      status: "completed",
      items: 1,
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&q=80",
    },
    {
      id: "ORD-1239",
      type: "grocery",
      storeName: "Mercado Orgânico",
      date: "Hoje, 16:30",
      total: "R$ 89,70",
      status: "in-progress",
      items: 8,
      image:
        "https://images.unsplash.com/photo-1543168256-418811576931?w=200&q=80",
    },
  ]);

  const handleBack = () => {
    router.back();
  };

  const handleOrderPress = (orderId: string) => {
    // Navigate to order details
    router.push(`/order-details?id=${orderId}`);
  };

  const handleFilterPress = (filter: string) => {
    setIsLoading(true);
    setActiveFilter(activeFilter === filter ? null : filter);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600";
      case "cancelled":
        return "text-red-600";
      case "in-progress":
        return "text-blue-600";
      case "pending":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={16} color="#10B981" />;
      case "cancelled":
        return <XCircle size={16} color="#EF4444" />;
      case "in-progress":
        return <Clock size={16} color="#2563EB" />;
      case "pending":
        return <AlertCircle size={16} color="#F59E0B" />;
      default:
        return null;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "food":
        return <Utensils size={20} color="#2563EB" />;
      case "grocery":
        return <ShoppingBag size={20} color="#2563EB" />;
      case "shopping":
        return <Package size={20} color="#2563EB" />;
      case "service":
        return <Clock size={20} color="#2563EB" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Concluído";
      case "cancelled":
        return "Cancelado";
      case "in-progress":
        return "Em andamento";
      case "pending":
        return "Pendente";
      default:
        return status;
    }
  };

  const filteredOrders = activeFilter
    ? orders.filter((order) => order.type === activeFilter)
    : orders;

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
          Histórico de Pedidos
        </Text>
      </View>

      {/* Search Bar */}
      <View className="bg-white px-6 py-3 border-b border-gray-200">
        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2">
          <Search size={18} color="#9CA3AF" />
          <Text className="ml-2 text-gray-400">Buscar pedidos...</Text>
        </View>
      </View>

      {/* Filters */}
      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 2 }}
        >
          <TouchableOpacity
            onPress={() => handleFilterPress("food")}
            className={`flex-row items-center px-4 py-2 rounded-full mr-2 ${activeFilter === "food" ? "bg-blue-100" : "bg-gray-100"}`}
          >
            <Utensils
              size={16}
              color={activeFilter === "food" ? "#2563EB" : "#6B7280"}
            />
            <Text
              className={`ml-2 ${activeFilter === "food" ? "text-blue-600" : "text-gray-600"}`}
            >
              Comida
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleFilterPress("grocery")}
            className={`flex-row items-center px-4 py-2 rounded-full mr-2 ${activeFilter === "grocery" ? "bg-blue-100" : "bg-gray-100"}`}
          >
            <ShoppingBag
              size={16}
              color={activeFilter === "grocery" ? "#2563EB" : "#6B7280"}
            />
            <Text
              className={`ml-2 ${activeFilter === "grocery" ? "text-blue-600" : "text-gray-600"}`}
            >
              Mercado
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleFilterPress("shopping")}
            className={`flex-row items-center px-4 py-2 rounded-full mr-2 ${activeFilter === "shopping" ? "bg-blue-100" : "bg-gray-100"}`}
          >
            <Package
              size={16}
              color={activeFilter === "shopping" ? "#2563EB" : "#6B7280"}
            />
            <Text
              className={`ml-2 ${activeFilter === "shopping" ? "text-blue-600" : "text-gray-600"}`}
            >
              Compras
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleFilterPress("service")}
            className={`flex-row items-center px-4 py-2 rounded-full mr-2 ${activeFilter === "service" ? "bg-blue-100" : "bg-gray-100"}`}
          >
            <Clock
              size={16}
              color={activeFilter === "service" ? "#2563EB" : "#6B7280"}
            />
            <Text
              className={`ml-2 ${activeFilter === "service" ? "text-blue-600" : "text-gray-600"}`}
            >
              Serviços
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Orders List */}
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#2563EB" />
        </View>
      ) : filteredOrders.length === 0 ? (
        <View className="flex-1 justify-center items-center p-6">
          <Package size={48} color="#9CA3AF" />
          <Text className="text-gray-500 text-lg font-medium mt-4 mb-2">
            Nenhum pedido encontrado
          </Text>
          <Text className="text-gray-400 text-center">
            Não encontramos pedidos com os filtros selecionados.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredOrders}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleOrderPress(item.id)}
              className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden"
            >
              <View className="flex-row">
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 80, height: 80 }}
                  contentFit="cover"
                />
                <View className="flex-1 p-3">
                  <View className="flex-row justify-between items-start">
                    <View className="flex-1 mr-2">
                      <Text className="font-bold text-gray-800">
                        {item.storeName}
                      </Text>
                      <Text className="text-gray-500 text-sm">{item.date}</Text>
                    </View>
                    <View className="bg-blue-50 p-1 rounded-full">
                      {getTypeIcon(item.type)}
                    </View>
                  </View>

                  <View className="flex-row justify-between items-center mt-2">
                    <View className="flex-row items-center">
                      <Text className="text-gray-600 text-sm mr-1">
                        {item.items} {item.items > 1 ? "itens" : "item"}
                      </Text>
                      <Text className="font-medium text-gray-800">
                        {item.total}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      {getStatusIcon(item.status)}
                      <Text
                        className={`ml-1 text-sm ${getStatusColor(item.status)}`}
                      >
                        {getStatusText(item.status)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View className="bg-gray-50 px-4 py-2 flex-row justify-between items-center">
                <Text className="text-blue-600 font-medium">
                  Ver detalhes do pedido
                </Text>
                <ChevronRight size={16} color="#2563EB" />
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
