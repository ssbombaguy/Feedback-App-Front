import { Stack , router } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { isLoggedIn } from "../utils/AsyncStorage";

export default function RootLayout() {
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const isUserLoggedIn = await isLoggedIn();
      
      if (isUserLoggedIn) {
        router.replace("/(tabs)/(feedback)");
      } else {
        router.replace("/auth");
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      router.replace("/auth");
    }
  };

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}
