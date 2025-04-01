import React, { useState } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import Header from "./components/Header";
import ServiceModules from "./components/ServiceModules";
import ActiveOrders from "./components/ActiveOrders";
import Recommendations from "./components/Recommendations";
import NearbyPromotions from "./components/NearbyPromotions";
import BottomNavigation from "./components/BottomNavigation";
import AuthModal from "./components/AuthModal";

export default function HomeScreen() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (method: string, data: any) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log(`Login with ${method}:`, data);
      setIsLoading(false);
      setShowAuthModal(false);
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Header onProfilePress={() => setShowAuthModal(true)} />

      <ScrollView className="flex-1 pb-20">
        <ServiceModules />
        <ActiveOrders />
        <Recommendations />
        <NearbyPromotions />
      </ScrollView>

      <BottomNavigation activeTab="home" />

      {showAuthModal && (
        <AuthModal
          isVisible={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
          isLoading={isLoading}
        />
      )}
    </SafeAreaView>
  );
}
