import { View, KeyboardAvoidingView, Platform } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GreyBg from "../../assets/greyBg.svg";
import { RecoveryEmailStep } from "../../components/auth/RecoveryEmailStep";
import { RecoveryCodeStep } from "../../components/auth/RecoveryCodeStep";
import { RecoveryPasswordStep } from "../../components/auth/RecoveryPasswordStep";
import { RecoveryHeader } from "../../components/auth/RecoveryHeader";
import { RecoveryContainer } from "../../components/auth/RecoveryContainer";

export default function PasswordRecovery() {
  return (
    <RecoveryContainer>
      {({ theme, styles, state, handlers }) => {
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
                <RecoveryHeader handleBack={handleBack} styles={styles} />

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
      }}
    </RecoveryContainer>
  );
}
