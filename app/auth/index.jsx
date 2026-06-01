import { View, KeyboardAvoidingView, Platform } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import YellowBg from "../../assets/yellowBg.svg";
import { LoginForm } from "../../components/auth/LoginForm";
import { LoginHeader } from "../../components/auth/LoginHeader";
import { LoginContainer } from "../../components/auth/LoginContainer";

export default function Authentication() {
  return (
    <LoginContainer>
      {({ theme, styles, loginMutation, handleLogin }) => {
        return (
          <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              keyboardVerticalOffset={Platform.OS === "ios" ? 5 : 5}
            >
              <View style={styles.container}>
                <LoginHeader styles={styles} />

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
      }}
    </LoginContainer>
  );
}
