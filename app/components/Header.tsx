import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Search, User } from "lucide-react-native";

interface HeaderProps {
  onSearchPress?: () => void;
  onProfilePress?: () => void;
  showSearch?: boolean;
}

const Header = ({
  onSearchPress = () => {},
  onProfilePress = () => {},
  showSearch = true,
}: HeaderProps) => {
  const router = useRouter();

  return (
    <View className="bg-white w-full px-4 pt-12 pb-2 border-b border-gray-200 shadow-sm">
      <View className="flex-row items-center justify-between">
        {/* App Logo */}
        <TouchableOpacity
          onPress={() => router.push("/")}
          className="flex-row items-center"
        >
          <Image
            source={require("../../assets/images/icon.png")}
            style={{ width: 32, height: 32 }}
            contentFit="contain"
            className="rounded-full"
          />
          <Text className="ml-2 text-xl font-bold text-blue-600">SuperApp</Text>
        </TouchableOpacity>

        {/* Right side icons */}
        <View className="flex-row items-center">
          {showSearch && (
            <TouchableOpacity
              onPress={onSearchPress}
              className="mr-4 p-2 bg-gray-100 rounded-full"
            >
              <Search size={20} color="#4B5563" />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={onProfilePress}
            className="p-2 bg-gray-100 rounded-full"
          >
            <User size={20} color="#4B5563" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search bar - conditionally rendered */}
      {showSearch && (
        <View className="mt-3 flex-row items-center bg-gray-100 rounded-full px-3 py-2">
          <Search size={16} color="#9CA3AF" />
          <TextInput
            placeholder="Search for food, groceries, services..."
            className="flex-1 ml-2 text-gray-800 text-base"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      )}
    </View>
  );
};

export default Header;
