import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import {
  ShoppingBag,
  Pizza,
  ShoppingCart,
  Briefcase,
  ClipboardList,
  Utensils,
  Truck,
  Heart,
  Gift,
} from "lucide-react-native";

interface ServiceModuleProps {
  onModuleSelect?: (module: string) => void;
}

const ServiceModules = ({ onModuleSelect = () => {} }: ServiceModuleProps) => {
  const router = useRouter();

  const modules = [
    {
      id: "food",
      name: "Restaurantes",
      icon: Utensils,
      color: "#FF5A5F",
      route: "/food",
    },
    {
      id: "grocery",
      name: "Mercado",
      icon: ShoppingCart,
      color: "#4CAF50",
      route: "/grocery",
    },
    {
      id: "services",
      name: "Serviços",
      icon: Briefcase,
      color: "#2196F3",
      route: "/services",
    },
    {
      id: "shopping",
      name: "Shopping",
      icon: ShoppingBag,
      color: "#9C27B0",
      route: "/shopping",
    },
    {
      id: "delivery",
      name: "Entregas",
      icon: Truck,
      color: "#8B5CF6",
      route: "/delivery",
    },
    {
      id: "health",
      name: "Saúde",
      icon: Heart,
      color: "#EF4444",
      route: "/health",
    },
    {
      id: "gifts",
      name: "Presentes",
      icon: Gift,
      color: "#06B6D4",
      route: "/gifts",
    },
    {
      id: "orders",
      name: "Pedidos",
      icon: ClipboardList,
      color: "#FF9800",
      route: "/orders",
    },
  ];

  const handleModulePress = (moduleId: string, route: string) => {
    onModuleSelect(moduleId);
    // In a real app, this would navigate to the respective module
    router.push(route);
  };

  return (
    <View className="bg-white py-4 shadow-sm">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        className="gap-6"
      >
        {modules.map((module) => (
          <TouchableOpacity
            key={module.id}
            className="items-center justify-center mx-2"
            onPress={() => handleModulePress(module.id, module.route)}
            activeOpacity={0.7}
          >
            <View
              className="w-16 h-16 rounded-full items-center justify-center mb-1"
              style={{ backgroundColor: `${module.color}15` }} // 15% opacity of the color
            >
              <module.icon size={28} color={module.color} />
            </View>
            <Text className="text-xs font-medium text-gray-700">
              {module.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ServiceModules;
