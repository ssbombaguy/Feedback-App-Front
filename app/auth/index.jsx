import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { setLoggedIn } from "../../utils/AsyncStorage";
import { phoneWidth } from "../../constants/Dimensions";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/MziuriLogo.svg";
import YellowBg from "../../assets/yellowBg";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { showErrorToast } from "../../utils/toastUtils";
import { LoginForm } from "../../components/auth/LoginForm";

export default function Authentication() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { login } = useAuth();
  const styles = makeStyles(theme);

  const loginMutation = useMutation({
    mutationFn: (values) =>
      login(values.email, values.password, values.rememberMe),
    onSuccess: async (response) => {
      if (response?.user) {
        await setLoggedIn(response.user);
        router.replace("/(tabs)/(feedback)");
      }
    },
    onError: (error) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      showErrorToast(t("common.error"), message);
    },
  });

  const handleLogin = (values) => {
    loginMutation.mutate(values);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 5 : 5}
      >
        <View style={styles.container}>
          <View style={styles.topPart}>
            <Logo style={styles.logo} />
            <Text style={styles.smallTitle}>{t("auth.welcomeBack")}</Text>
          </View>

          <Text style={styles.bigTitle}>{t("auth.signIn")}</Text>

          <LoginForm
            onSubmit={handleLogin}
            isPending={loginMutation.isPending}
            theme={theme}
          />
        </View>
      </KeyboardAvoidingView>
      <YellowBg style={styles.background} />
    </SafeAreaView>
  );
}

const makeStyles = (theme) =>
  StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.background },
    container: {
      flex: 1,
      justifyContent: "flex-start",
      padding: 24,
      paddingHorizontal: 50,
      width: phoneWidth,
    },
    topPart: { alignSelf: "center" },
    logo: {
      width: 220,
      height: 120,
      resizeMode: "contain",
      alignSelf: "center",
    },
    smallTitle: {
      fontSize: 20,
      fontWeight: "600",
      marginBottom: 24,
      textAlign: "center",
      color: theme.textSecondary,
    },
    bigTitle: {
      fontSize: 35,
      fontWeight: "700",
      marginBottom: 20,
      marginTop: 40,
      color: theme.textSecondary,
      textAlign: "center",
    },
    background: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      zIndex: -50,
      alignSelf: "center",
    },
  });
