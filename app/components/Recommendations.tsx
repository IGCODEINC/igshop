import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Star } from "lucide-react-native";

interface RecommendationItem {
  id: string;
  name: string;
  image: string;
  rating: number;
  category: string;
  deliveryTime: string;
  price: string;
}

interface RecommendationsProps {
  title?: string;
  items?: RecommendationItem[];
}

const Recommendations = ({
  title = "Recommended for you",
  items = [
    {
      id: "1",
      name: "Burger King",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
      rating: 4.5,
      category: "Fast Food",
      deliveryTime: "15-25 min",
      price: "$$",
    },
    {
      id: "2",
      name: "Sushi Express",
      image:
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=80",
      rating: 4.8,
      category: "Japanese",
      deliveryTime: "25-35 min",
      price: "$$$",
    },
    {
      id: "3",
      name: "Pizza Hut",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80",
      rating: 4.2,
      category: "Pizza",
      deliveryTime: "20-30 min",
      price: "$$",
    },
    {
      id: "4",
      name: "Salad Bowl",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80",
      rating: 4.7,
      category: "Healthy",
      deliveryTime: "15-25 min",
      price: "$$",
    },
  ],
}: RecommendationsProps) => {
  return (
    <View className="bg-white p-4 mb-4">
      <Text className="text-xl font-bold mb-3">{title}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="-mx-1"
      >
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            className="mx-2 w-40 rounded-lg overflow-hidden"
            activeOpacity={0.7}
          >
            <View className="relative">
              <Image
                source={{ uri: item.image }}
                className="w-full h-28 rounded-t-lg"
                resizeMode="cover"
              />
              <View className="absolute bottom-1 left-1 bg-white px-2 py-1 rounded-full flex-row items-center">
                <Star size={12} color="#FFD700" fill="#FFD700" />
                <Text className="text-xs ml-1 font-medium">{item.rating}</Text>
              </View>
            </View>

            <View className="p-2 bg-gray-50 rounded-b-lg">
              <Text className="font-bold" numberOfLines={1}>
                {item.name}
              </Text>
              <Text className="text-xs text-gray-500">{item.category}</Text>
              <View className="flex-row justify-between mt-1">
                <Text className="text-xs">{item.deliveryTime}</Text>
                <Text className="text-xs">{item.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Recommendations;
