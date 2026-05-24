import {
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { CustomButton } from "../../components/ui/CustomButton";
import React, { useState } from "react";
import {} from "./recovery.styles";

import { router } from "expo-router";
import { phoneWidth } from "../../constants/Dimensions";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/MziuriLogo.svg";
import GreyBg from "../../assets/greyBg.svg";
import { useTheme } from "../../context/ThemeContext";
import { showSuccessToast, showErrorToast } from "../../utils/toastUtils";
import { useMutation } from "@tanstack/react-query";
import { authAPI } from "../../api/apiClient";
import { RecoveryEmailStep } from "../../components/auth/RecoveryEmailStep";
import { RecoveryCodeStep } from "../../components/auth/RecoveryCodeStep";
import { RecoveryPasswordStep } from "../../components/auth/RecoveryPasswordStep";

export default function PasswordRecovery() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = makeStyles(theme);
  const [step, setStep] = useState("email");
  const [userEmail, setUserEmail] = useState("");
  const [resetToken, setResetToken] = useState("");

  const forgotPasswordMutation = useMutation({
    mutationFn: (email) => authAPI.forgotPassword(email),
    onSuccess: () => {
      showSuccessToast(t("common.success"), t("recovery.codeSent"));
      setStep("code");
    },
    onError: (error) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        t("recovery.emailNotFound");
      showErrorToast(t("common.error"), message);
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: ({ email, token, password, confirmPassword }) =>
      authAPI.resetPassword(email, token, password, confirmPassword),
    onSuccess: () => {
      showSuccessToast(t("common.success"), t("recovery.passwordResetSuccess"));
      setTimeout(() => router.replace("/auth"), 1500);
    },
    onError: (error) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      showErrorToast(t("common.error"), message);
    },
  });

  const handleEmailSubmit = (values) => {
    setUserEmail(values.email);
    forgotPasswordMutation.mutate(values.email);
  };

  const handleCodeSubmit = (values) => {
    setResetToken(values.code);
    showSuccessToast(t("common.success"), t("recovery.verifySuccess"));
    setStep("password");
  };

  const handlePasswordSubmit = (values) => {
    resetPasswordMutation.mutate({
      email: userEmail,
      token: resetToken,
      password: values.password,
      confirmPassword: values.confirmPassword,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 5 : 5}
      >
        <View style={styles.container}>
          <CustomButton
            variant="custom"
            style={styles.backButton}
            onPress={() => {
              if (step === "email") {
                router.back();
              } else if (step === "code") {
                setStep("email");
                setUserEmail("");
              } else {
                setStep("code");
              }
            }}
          >
            <Ionicons name="arrow-back" size={24} color="#243d4d" />
          </CustomButton>

          <Logo style={styles.logo} />

          {step === "email" && (
            <RecoveryEmailStep
              onSubmit={handleEmailSubmit}
              isPending={forgotPasswordMutation.isPending}
              theme={theme}
            />
          )}

          {step === "code" && (
            <RecoveryCodeStep
              onSubmit={handleCodeSubmit}
              userEmail={userEmail}
              theme={theme}
            />
          )}

          {step === "password" && (
            <RecoveryPasswordStep
              onSubmit={handlePasswordSubmit}
              isPending={resetPasswordMutation.isPending}
              theme={theme}
            />
          )}
        </View>
      </KeyboardAvoidingView>
      <GreyBg style={styles.background} />
    </SafeAreaView>
  );
}
