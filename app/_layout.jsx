import '../utils/firebase'; 
import { Stack, router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { QueryProvider } from "../context/QueryProvider";
import { I18nextProvider } from "react-i18next";
import i18n, { getStoredLanguage } from "../i18n/index";
import { PaperProvider } from "react-native-paper";
import { ThemeProvider } from "../context/ThemeContext";
import Toast from "react-native-toast-message";
import { CustomToast } from "../components/CustomToast";
import * as Notifications from "expo-notifications";
import { registerForPushNotifications } from "../utils/notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { notificationsAPI } from "../api/apiClient";

function RootLayoutContent() {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.replace("/(tabs)/(feedback)");
      } else {
        router.replace("/auth");
      }
    }
  }, [user, isLoading]);

  useEffect(() => {
    if (!user) return
    const sendToken = async () => {
      try {
        const token = await AsyncStorage.getItem('pushToken')
        if (token) {
          await notificationsAPI.saveToken(token)
        }
      } catch (error) {
        console.error('Failed to save push token:', error)
      }
    }
    sendToken()
  }, [user])

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  const [isInitialized, setIsInitialized] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        const language = await getStoredLanguage();
        await i18n.changeLanguage(language);
      } catch (error) {
        console.error("Failed to initialize language", error);
      } finally {
        setIsInitialized(true);
      }
    };
    initializeLanguage();
  }, []);

  useEffect(() => {
    registerForPushNotifications();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("🔔 Notification received:", notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("👆 Notification tapped:", response);
      });

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  if (!isInitialized) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <I18nextProvider i18n={i18n}>
          <QueryProvider>
            <AuthProvider>
              <PaperProvider>
                <RootLayoutContent />
              </PaperProvider>
            </AuthProvider>
          </QueryProvider>
        </I18nextProvider>
        <Toast
          config={{
            success: (props) => <CustomToast {...props} type="success" />,
            error: (props) => <CustomToast {...props} type="error" />,
            info: (props) => <CustomToast {...props} type="info" />,
          }}
        />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}