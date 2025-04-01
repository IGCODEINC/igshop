import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ChevronRight, ArrowRight } from "lucide-react-native";

const { width } = Dimensions.get("window");

const onboardingData = [
  {
    id: "1",
    title: "Tudo em um só lugar",
    description: "Comida, mercado, serviços e compras em um único aplicativo",
    image:
      "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=500&q=80",
  },
  {
    id: "2",
    title: "Entrega rápida",
    description:
      "Receba seus pedidos em minutos, não importa o que você precise",
    image:
      "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=500&q=80",
  },
  {
    id: "3",
    title: "Pagamento simplificado",
    description: "Múltiplas opções de pagamento e cashback em todas as compras",
    image:
      "https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?w=500&q=80",
  },
  {
    id: "4",
    title: "Pronto para começar?",
    description:
      "Crie sua conta ou faça login para aproveitar todos os benefícios",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&q=80",
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
      setCurrentIndex(currentIndex + 1);
    } else {
      router.replace("/login");
    }
  };

  const handleSkip = () => {
    router.replace("/login");
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <View
        style={{ width }}
        className="flex-1 justify-center items-center px-6"
      >
        <Image
          source={{ uri: item.image }}
          style={{ width: width * 0.8, height: width * 0.8 }}
          contentFit="cover"
          className="rounded-3xl mb-8"
        />
        <Text className="text-2xl font-bold text-center mb-4 text-gray-800">
          {item.title}
        </Text>
        <Text className="text-base text-center text-gray-600 mb-8 px-4">
          {item.description}
        </Text>
      </View>
    );
  };

  const isLastScreen = currentIndex === onboardingData.length - 1;

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row justify-end pt-12 pr-6">
        {!isLastScreen && (
          <TouchableOpacity onPress={handleSkip}>
            <Text className="text-blue-600 font-medium text-base">Pular</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />

      <View className="pb-12 px-6">
        <View className="flex-row justify-center mb-8">
          {onboardingData.map((_, index) => (
            <View
              key={index}
              className={`h-2 w-2 rounded-full mx-1 ${index === currentIndex ? "bg-blue-600 w-4" : "bg-gray-300"}`}
            />
          ))}
        </View>

        <TouchableOpacity
          className="bg-blue-600 rounded-full py-4 flex-row justify-center items-center"
          onPress={handleNext}
        >
          <Text className="text-white font-medium mr-2">
            {isLastScreen ? "Começar" : "Próximo"}
          </Text>
          {isLastScreen ? (
            <ArrowRight size={20} color="white" />
          ) : (
            <ChevronRight size={20} color="white" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
