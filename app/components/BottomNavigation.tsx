import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Home, ShoppingBag, Search, Clock, User } from "lucide-react-native";

interface BottomNavigationProps {
  activeTab?: string;
}

const BottomNavigation = ({ activeTab = "home" }: BottomNavigationProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { key: "home", label: "Home", icon: Home, route: "/" },
    { key: "search", label: "Search", icon: Search, route: "/search" },
    { key: "orders", label: "Orders", icon: Clock, route: "/orders" },
    {
      key: "shopping",
      label: "Shopping",
      icon: ShoppingBag,
      route: "/shopping",
    },
    { key: "profile", label: "Profile", icon: User, route: "/profile" },
  ];

  const handleTabPress = (route: string) => {
    router.push(route);
  };

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex-row justify-between items-center h-[70px] px-2 pb-2 pt-1">
      {tabs.map((tab) => {
        const isActive =
          tab.key === activeTab || (tab.key === "home" && pathname === "/");
        const IconComponent = tab.icon;

        return (
          <TouchableOpacity
            key={tab.key}
            className={`flex-1 items-center justify-center py-1 ${isActive ? "" : ""}`}
            onPress={() => handleTabPress(tab.route)}
            accessibilityLabel={tab.label}
            accessibilityRole="button"
          >
            <IconComponent
              size={24}
              color={isActive ? "#0066FF" : "#71717A"}
              strokeWidth={2}
            />
            <Text
              className={`text-xs mt-1 ${isActive ? "text-blue-600 font-medium" : "text-zinc-500"}`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavigation;
