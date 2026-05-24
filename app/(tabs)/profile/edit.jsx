import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import {} from "./edit.styles";

import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useCurrentUserProfile } from "../../../hooks/useUser";
import { userAPI, verificationAPI } from "../../../api/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../context/ThemeContext";
import { showSuccessToast, showErrorToast } from "../../../utils/toastUtils";
import { VerificationModal } from "../../../components/VerificationModal";
import { ProfileAvatar } from "../../../components/profile/ProfileAvatar";
import { ProfileReadOnlyFields } from "../../../components/profile/ProfileReadOnlyFields";
import { ProfileForm } from "../../../components/profile/ProfileForm";

export default function EditProfile() {
  const { t } = useTranslation();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { theme } = useTheme();
  const styles = makeStyles(theme);
  const { userProfile } = useCurrentUserProfile();

  const [verificationModal, setVerificationModal] = useState({
    visible: false,
    type: null,
    contact: null,
    pendingValue: null,
  });

  const updateMutation = useMutation({
    mutationFn: (data) => userAPI.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
      showSuccessToast(
        t("common.success"),
        t("profile.updateSuccess") || "Profile updated successfully",
      );
      closeVerificationModal();
      router.back();
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        t("profile.updateError");
      showErrorToast(t("common.error"), errorMessage);
    },
  });

  const handleSendVerificationCode = async (contact) => {
    try {
      if (verificationModal.type === "phone") {
        await verificationAPI.sendPhoneCode(contact);
      } else if (verificationModal.type === "email") {
        await verificationAPI.sendEmailCode(contact);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        `Failed to send ${verificationModal.type} code`;
      throw new Error(errorMessage);
    }
  };

  const handleVerifyCode = async (contact, code) => {
    try {
      if (verificationModal.type === "phone") {
        await verificationAPI.verifyPhoneCode(contact, code);
      } else if (verificationModal.type === "email") {
        await verificationAPI.verifyEmailCode(contact, code);
      }

      await updateMutation.mutateAsync({
        firstName: userProfile?.firstName,
        lastName: userProfile?.lastName,
        personalNumber: userProfile?.personalNumber,
        email:
          verificationModal.type === "email"
            ? verificationModal.pendingValue
            : userProfile?.email,
        city: userProfile?.city_id,
        school: userProfile?.school_id,
        phoneNumber:
          verificationModal.type === "phone"
            ? verificationModal.pendingValue
            : userProfile?.phoneNumber,
        linkedinUrl: userProfile?.linkedinUrl || null,
        githubUrl: userProfile?.githubUrl || null,
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Verification failed";
      throw new Error(errorMessage);
    }
  };

  const openVerificationModal = (type, newValue) => {
    setVerificationModal({
      visible: true,
      type,
      contact: newValue,
      pendingValue: newValue,
    });
  };

  const closeVerificationModal = () => {
    setVerificationModal({
      visible: false,
      type: null,
      contact: null,
      pendingValue: null,
    });
  };

  const handleFormSubmit = (values) => {
    const phoneChanged = values.phoneNumber !== userProfile?.phoneNumber;
    const emailChanged = values.email !== userProfile?.email;

    if (phoneChanged) {
      openVerificationModal("phone", values.phoneNumber);
    } else if (emailChanged) {
      openVerificationModal("email", values.email);
    } else {
      updateMutation.mutate({
        firstName: userProfile?.firstName,
        lastName: userProfile?.lastName,
        personalNumber: userProfile?.personalNumber,
        email: userProfile?.email,
        city: userProfile?.city_id,
        school: userProfile?.school_id,
        phoneNumber: values.phoneNumber,
        linkedinUrl: values.linkedinUrl || null,
        githubUrl: values.githubUrl || null,
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Feather name="chevron-left" size={22} color={theme.textSecondary} />
          <Text style={styles.backText}>{t("edit.back")}</Text>
        </TouchableOpacity>
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
