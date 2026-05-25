import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { CustomButton } from "../../../components/ui/CustomButton";
import React from "react";
import {} from "./edit.styles";

import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useCurrentUserProfile } from "../../../hooks/useUser";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../context/ThemeContext";
import { VerificationModal } from "../../../components/ui/VerificationModal";
import { ProfileAvatar } from "../../../components/profile/ProfileAvatar";
import { ProfileReadOnlyFields } from "../../../components/profile/ProfileReadOnlyFields";
import { ProfileForm } from "../../../components/profile/ProfileForm";

import { useEditProfileLogic } from "../../../hooks/useEditProfileLogic";

export default function EditProfile() {
  const { t } = useTranslation();
  const router = useRouter();
  const { theme } = useTheme();
  const styles = makeStyles(theme);
  const { userProfile } = useCurrentUserProfile();

  const { state, handlers } = useEditProfileLogic(userProfile);

  const { verificationModal, isPending } = state;
  const {
    handleSendVerificationCode,
    handleVerifyCode,
    closeVerificationModal,
    handleFormSubmit,
  } = handlers;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <CustomButton
          variant="custom"
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Feather name="chevron-left" size={22} color={theme.textSecondary} />
          <Text style={styles.backText}>{t("edit.back")}</Text>
        </CustomButton>
        <Text style={styles.headerTitle}>{t("edit.editProfile")}</Text>
        <View style={{ width: 70 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={5}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <ProfileAvatar userProfile={userProfile} theme={theme} />
          <ProfileReadOnlyFields userProfile={userProfile} theme={theme} />
          <ProfileForm
            userProfile={userProfile}
            theme={theme}
            onSubmit={handleFormSubmit}
            isPending={updateMutation.isPending}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <VerificationModal
        visible={verificationModal.visible}
        title={
          verificationModal.type === "phone"
            ? "Verify Your Phone Number"
            : "Verify Your Email"
        }
        message={
          verificationModal.type === "phone"
            ? "We'll send a verification code to your phone number to confirm the change."
            : "We'll send a verification code to your email to confirm the change."
        }
        verificationType={verificationModal.type}
        contact={verificationModal.contact}
        onSendCode={handleSendVerificationCode}
        onVerifyCode={handleVerifyCode}
        onSuccess={closeVerificationModal}
        onCancel={closeVerificationModal}
        isLoading={updateMutation.isPending}
      />
    </SafeAreaView>
  );
}
