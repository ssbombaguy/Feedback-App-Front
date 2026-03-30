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
import { View, Text } from "react-native";  



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

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  const [isInitialized, setIsInitialized] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [pushToken, setPushToken] = useState('')

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
    registerForPushNotifications().then(token => {
      if (token) setPushToken(token) // add this
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("🔔 Notification received:", notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("👆 Notification tapped:", response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
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
                {pushToken ? ( 
                  <View style={{ position: 'absolute', top: 60, left: 10, right: 10, backgroundColor: 'black', padding: 10, zIndex: 9999 }}>
                    <Text selectable style={{ color: 'white', fontSize: 10 }}>{pushToken}</Text>
                  </View>
                ) : null}
              </PaperProvider>
            </AuthProvider>
          </QueryProvider>
          <Toast
            config={{
              success: (props) => <CustomToast {...props} type="success" />,
              error: (props) => <CustomToast {...props} type="error" />,
              info: (props) => <CustomToast {...props} type="info" />,
            }}
          />
        </I18nextProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}