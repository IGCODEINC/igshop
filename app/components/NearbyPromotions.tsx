import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { MapPin, Tag, Clock } from "lucide-react-native";

interface PromotionProps {
  id: string;
  title: string;
  businessName: string;
  discount: string;
  imageUrl: string;
  distance: string;
  expiresIn: string;
  category: string;
}

interface NearbyPromotionsProps {
  promotions?: PromotionProps[];
  onPromotionPress?: (promotion: PromotionProps) => void;
}

const PromotionCard = ({
  promotion,
  onPress,
}: {
  promotion: PromotionProps;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="mr-4 w-64 rounded-xl overflow-hidden bg-white shadow-md"
    >
      <View className="relative">
        <Image
          source={{ uri: promotion.imageUrl }}
          className="w-full h-32"
          resizeMode="cover"
        />
        <View className="absolute top-2 right-2 bg-red-500 px-2 py-1 rounded-full">
          <Text className="text-white font-bold text-xs">
            {promotion.discount}
          </Text>
        </View>
      </View>

      <View className="p-3">
        <Text className="font-bold text-base mb-1">{promotion.title}</Text>
        <Text className="text-gray-600 text-sm mb-2">
          {promotion.businessName}
        </Text>

        <View className="flex-row justify-between items-center mt-2">
          <View className="flex-row items-center">
            <MapPin size={14} color="#6b7280" />
            <Text className="text-gray-500 text-xs ml-1">
              {promotion.distance}
            </Text>
          </View>

          <View className="flex-row items-center">
            <Tag size={14} color="#6b7280" />
            <Text className="text-gray-500 text-xs ml-1">
              {promotion.category}
            </Text>
          </View>

          <View className="flex-row items-center">
            <Clock size={14} color="#6b7280" />
            <Text className="text-gray-500 text-xs ml-1">
              {promotion.expiresIn}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const NearbyPromotions = ({
  promotions = defaultPromotions,
  onPromotionPress,
}: NearbyPromotionsProps) => {
  const handlePromotionPress = (promotion: PromotionProps) => {
    if (onPromotionPress) {
      onPromotionPress(promotion);
    }
  };

  return (
    <View className="bg-gray-50 p-4">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold">Nearby Promotions</Text>
        <TouchableOpacity>
          <Text className="text-blue-500">See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="pb-2"
      >
        {promotions.map((promotion) => (
          <PromotionCard
            key={promotion.id}
            promotion={promotion}
            onPress={() => handlePromotionPress(promotion)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const defaultPromotions: PromotionProps[] = [
  {
    id: "1",
    title: "50% OFF on First Order",
    businessName: "Burger Palace",
    discount: "50% OFF",
    imageUrl:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
    distance: "1.2 km",
    expiresIn: "2 days",
    category: "Food",
  },
  {
    id: "2",
    title: "Buy 1 Get 1 Free",
    businessName: "Fresh Market",
    discount: "BOGO",
    imageUrl:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80",
    distance: "0.8 km",
    expiresIn: "Today",
    category: "Grocery",
  },
  {
    id: "3",
    title: "30% OFF on All Services",
    businessName: "CleanPro",
    discount: "30% OFF",
    imageUrl:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&q=80",
    distance: "2.5 km",
    expiresIn: "3 days",
    category: "Services",
  },
  {
    id: "4",
    title: "Free Delivery on Orders $50+",
    businessName: "Tech Store",
    discount: "Free Delivery",
    imageUrl:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&q=80",
    distance: "3.1 km",
    expiresIn: "1 week",
    category: "Shopping",
  },
];

export default NearbyPromotions;
