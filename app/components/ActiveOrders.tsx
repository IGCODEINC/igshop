import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { MapPin, Clock, Package, ChevronRight } from "lucide-react-native";
import { Image } from "expo-image";

interface OrderItem {
  id: string;
  type: "food" | "grocery" | "service" | "shopping";
  title: string;
  vendor: string;
  status: "preparing" | "on-the-way" | "arriving" | "in-progress";
  eta: string;
  image: string;
  address: string;
}

interface ActiveOrdersProps {
  orders?: OrderItem[];
  onOrderPress?: (orderId: string) => void;
}

const ActiveOrders = ({
  orders = [
    {
      id: "1",
      type: "food",
      title: "Lunch Order",
      vendor: "Burger Palace",
      status: "on-the-way",
      eta: "15-20 min",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150&q=80",
      address: "123 Main St",
    },
    {
      id: "2",
      type: "grocery",
      title: "Weekly Groceries",
      vendor: "Fresh Market",
      status: "preparing",
      eta: "30-40 min",
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=150&q=80",
      address: "123 Main St",
    },
  ],
  onOrderPress = (orderId) => console.log(`Order ${orderId} pressed`),
}: ActiveOrdersProps) => {
  if (orders.length === 0) {
    return (
      <View className="bg-white p-4 rounded-lg my-2 shadow-sm">
        <Text className="text-lg font-semibold mb-2">Active Orders</Text>
        <View className="items-center justify-center py-6">
          <Package size={40} color="#9ca3af" />
          <Text className="text-gray-500 mt-2 text-center">
            No active orders
          </Text>
          <Text className="text-gray-400 text-sm text-center">
            Your active orders will appear here
          </Text>
        </View>
      </View>
    );
  }

  const getStatusColor = (status: OrderItem["status"]) => {
    switch (status) {
      case "preparing":
        return "bg-blue-500";
      case "on-the-way":
        return "bg-orange-500";
      case "arriving":
        return "bg-green-500";
      case "in-progress":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: OrderItem["status"]) => {
    switch (status) {
      case "preparing":
        return "Preparing";
      case "on-the-way":
        return "On the way";
      case "arriving":
        return "Arriving soon";
      case "in-progress":
        return "In progress";
      default:
        return "Processing";
    }
  };

  const getTypeIcon = (type: OrderItem["type"]) => {
    switch (type) {
      case "food":
        return <Package size={16} color="#f97316" />;
      case "grocery":
        return <Package size={16} color="#22c55e" />;
      case "service":
        return <Package size={16} color="#8b5cf6" />;
      case "shopping":
        return <Package size={16} color="#3b82f6" />;
      default:
        return <Package size={16} color="#6b7280" />;
    }
  };

  return (
    <View className="bg-white p-4 rounded-lg my-2 shadow-sm">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-lg font-semibold">Active Orders</Text>
        <TouchableOpacity>
          <Text className="text-blue-500 text-sm">View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="-mx-1"
      >
        {orders.map((order) => (
          <TouchableOpacity
            key={order.id}
            className="bg-gray-50 rounded-lg p-3 mr-3 w-64 shadow-sm"
            onPress={() => onOrderPress(order.id)}
          >
            <View className="flex-row items-center mb-2">
              <View className="h-12 w-12 rounded-md overflow-hidden mr-3">
                <Image
                  source={{ uri: order.image }}
                  style={{ width: "100%", height: "100%" }}
                  contentFit="cover"
                />
              </View>
              <View className="flex-1">
                <Text className="font-semibold">{order.title}</Text>
                <Text className="text-gray-500 text-xs">{order.vendor}</Text>
              </View>
              <ChevronRight size={16} color="#9ca3af" />
            </View>

            <View className="flex-row items-center mb-2">
              <View
                className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(order.status)}`}
              />
              <Text className="text-sm">{getStatusText(order.status)}</Text>
              <View className="flex-row items-center ml-auto">
                <Clock size={14} color="#6b7280" className="mr-1" />
                <Text className="text-xs text-gray-500">{order.eta}</Text>
              </View>
            </View>

            <View className="flex-row items-center">
              <MapPin size={14} color="#6b7280" className="mr-1" />
              <Text className="text-xs text-gray-500 flex-1" numberOfLines={1}>
                {order.address}
              </Text>
              {getTypeIcon(order.type)}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ActiveOrders;
