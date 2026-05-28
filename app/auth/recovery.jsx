import {
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { CustomButton } from "../../components/ui/CustomButton";
import React from "react";
import {makeStyles} from "./recovery.styles";

import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../assets/MziuriLogo.svg";
import GreyBg from "../../assets/greyBg.svg";
import { useTheme } from "../../context/ThemeContext";
import { RecoveryEmailStep } from "../../components/auth/RecoveryEmailStep";
import { RecoveryCodeStep } from "../../components/auth/RecoveryCodeStep";
import { RecoveryPasswordStep } from "../../components/auth/RecoveryPasswordStep";

import { usePasswordRecoveryLogic } from "../../hooks/usePasswordRecoveryLogic";

export default function PasswordRecovery() {
  const { theme } = useTheme();
  const styles = makeStyles(theme);

  const { state, handlers } = usePasswordRecoveryLogic();
  const { step, userEmail, isForgotPending, isResetPending } = state;
  const { handleEmailSubmit, handleCodeSubmit, handlePasswordSubmit, handleBack } = handlers;

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
            onPress={handleBack}
          >
            <Ionicons name="arrow-back" size={24} color="#243d4d" />
          </CustomButton>

          <Logo style={styles.logo} />

          {step === "email" && (
            <RecoveryEmailStep
              onSubmit={handleEmailSubmit}
              isPending={isForgotPending}
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
              isPending={isResetPending}
              theme={theme}
            />
          )}
        </View>
      </KeyboardAvoidingView>
      <GreyBg style={styles.background} />
    </SafeAreaView>
  );
}
