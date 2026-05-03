import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import { TextInput } from "react-native-paper";
import { useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useCurrentUserProfile } from "../../../api/useUser";
import { userAPI, verificationAPI } from "../../../api/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as Yup from "yup";
import { Feather } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../context/ThemeContext";
import { showSuccessToast, showErrorToast } from "../../../utils/toastUtils";
import * as ImagePicker from "expo-image-picker";
import { VerificationModal } from "../../../components/VerificationModal";
import { useState } from "react";

export default function EditProfile() {
  const { t } = useTranslation();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { theme } = useTheme();
  const styles = makeStyles(theme);
  const { userProfile } = useCurrentUserProfile();

  // Verification modal states
  const [verificationModal, setVerificationModal] = useState({
    visible: false,
    type: null, // 'phone' or 'email'
    contact: null,
    pendingValue: null, // stores the new value being verified
  });

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string().required(t("profile.phoneRequired")),
    email: Yup.string().email(t("profile.invalidEmail")).required(t("profile.emailRequired")),
    linkedinUrl: Yup.string().url(t("profile.invalidUrl")).nullable(),
    githubUrl: Yup.string().url(t("profile.invalidUrl")).nullable(),
  });

  const photoMutation = useMutation({
    mutationFn: (uri) => userAPI.uploadPhoto(uri),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
      showSuccessToast(t("common.success"), t("profile.photoUpdated"));
    },
    onError: () => {
      showErrorToast(t("common.error"), t("profile.photoError"));
    },
  });

  const handlePickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      photoMutation.mutate(result.assets[0].uri);
    }
  };

  // Send verification code (phone or email)
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

  // Verify the code and update profile
  const handleVerifyCode = async (contact, code) => {
    try {
      if (verificationModal.type === "phone") {
        await verificationAPI.verifyPhoneCode(contact, code);
      } else if (verificationModal.type === "email") {
        await verificationAPI.verifyEmailCode(contact, code);
      }

      // After verification succeeds, update the profile
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
        error.response?.data?.message ||
        error.message ||
        "Verification failed";
      throw new Error(errorMessage);
    }
  };

  const updateMutation = useMutation({
    mutationFn: (data) => userAPI.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
      showSuccessToast(t("common.success"), t("profile.updateSuccess"));
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

  // Open verification modal for phone or email
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

  const readOnlyFields = [
    { label: t("profile.firstName"), value: userProfile?.firstName },
    { label: t("profile.lastName"), value: userProfile?.lastName },
    { label: t("profile.privateNumber"), value: userProfile?.personalNumber },
  ];

  const photoUri = userProfile?.photo
    ? `${process.env.EXPO_PUBLIC_API_URL.replace(/\/api\/v1\/?$/, "")}${userProfile.photo}`
    : null;

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
          <TouchableOpacity
            onPress={handlePickPhoto}
            style={styles.avatarContainer}
          >
            <View style={styles.avatarWrapper}>
              {photoMutation.isPending ? (
                <ActivityIndicator size="large" color={theme.textSecondary} />
              ) : photoUri ? (
                <Image
                  source={{ uri: photoUri }}
                  style={styles.avatarImage}
                  onError={(e) =>
                    console.log("Image error:", e.nativeEvent.error)
                  }
                  onLoad={() => console.log("Image loaded successfully")}
                />
              ) : (
                <FontAwesome
                  name="user-circle-o"
                  size={80}
                  color={theme.textSecondary}
                />
              )}
              <View style={styles.editOverlay}>
                <Feather name="camera" size={14} color="#fff" />
              </View>
            </View>
            <Text style={styles.avatarName}>
              {userProfile?.firstName} {userProfile?.lastName}
            </Text>
            <Text style={styles.avatarEmail}>{userProfile?.email}</Text>
          </TouchableOpacity>

          {/* Read-only section */}
          <Text style={styles.sectionTitle}>{t("profile.readOnlyInfo")}</Text>
          <View style={styles.card}>
            {readOnlyFields.map((item, index) => (
              <View
                key={item.label}
                style={[
                  styles.cardRow,
                  index === readOnlyFields.length - 1 && {
                    borderBottomWidth: 0,
                  },
                ]}
              >
                <Text style={styles.cardLabel}>{item.label}</Text>
                <Text
                  style={styles.cardValue}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.value}
                </Text>
              </View>
            ))}
          </View>

          {/* Editable section */}
          <Text style={styles.sectionTitle}>{t("profile.editableInfo")}</Text>
          <Formik
            validationSchema={validationSchema}
            initialValues={{
              phoneNumber: userProfile?.phoneNumber || "",
              email: userProfile?.email || "",
              linkedinUrl: userProfile?.linkedinUrl || "",
              githubUrl: userProfile?.githubUrl || "",
            }}
            enableReinitialize
            onSubmit={(values) => {
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
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.card}>
                <View style={styles.editRow}>
                  <Text style={styles.editLabel}>{t("profile.phone")}</Text>
                  <TextInput
                    mode="flat"
                    value={values.phoneNumber}
                    onChangeText={handleChange("phoneNumber")}
                    onBlur={handleBlur("phoneNumber")}
                    keyboardType="phone-pad"
                    style={styles.flatInput}
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    error={touched.phoneNumber && !!errors.phoneNumber}
                  />
                </View>
                {touched.phoneNumber && errors.phoneNumber && (
                  <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                )}

                <View style={styles.divider} />

                <View style={styles.editRow}>
                  <Text style={styles.editLabel}>{t("profile.email")}</Text>
                  <TextInput
                    mode="flat"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.flatInput}
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    error={touched.email && !!errors.email}
                  />
                </View>
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}

                <View style={styles.divider} />

                <View style={styles.editRow}>
                  <Text style={styles.editLabel}>LinkedIn</Text>
                  <TextInput
                    mode="flat"
                    value={values.linkedinUrl}
                    onChangeText={handleChange("linkedinUrl")}
                    onBlur={handleBlur("linkedinUrl")}
                    autoCapitalize="none"
                    placeholder="https://linkedin.com/in/..."
                    placeholderTextColor={theme.subtext}
                    style={styles.flatInput}
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    error={touched.linkedinUrl && !!errors.linkedinUrl}
                  />
                </View>
                {touched.linkedinUrl && errors.linkedinUrl && (
                  <Text style={styles.errorText}>{errors.linkedinUrl}</Text>
                )}

                <View style={styles.divider} />

                <View style={styles.editRow}>
                  <Text style={styles.editLabel}>GitHub</Text>
                  <TextInput
                    mode="flat"
                    value={values.githubUrl}
                    onChangeText={handleChange("githubUrl")}
                    onBlur={handleBlur("githubUrl")}
                    autoCapitalize="none"
                    placeholder="https://github.com/..."
                    placeholderTextColor={theme.subtext}
                    style={styles.flatInput}
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    error={touched.githubUrl && !!errors.githubUrl}
                  />
                </View>
                {touched.githubUrl && errors.githubUrl && (
                  <Text style={styles.errorText}>{errors.githubUrl}</Text>
                )}

                <TouchableOpacity
                  style={[
                    styles.updateButton,
                    (updateMutation.isPending || photoMutation.isPending) &&
                      styles.disabled,
                  ]}
                  onPress={handleSubmit}
                  disabled={updateMutation.isPending || photoMutation.isPending}
                >
                  {updateMutation.isPending || photoMutation.isPending ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>{t("edit.update")}</Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Verification Modal */}
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

const makeStyles = (theme) =>
  StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.background },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderLight,
      backgroundColor: theme.background,
    },
    backButton: { flexDirection: "row", alignItems: "center", width: 70 },
    backText: {
      color: theme.textSecondary,
      fontWeight: "600",
      marginLeft: 2,
      fontSize: 14,
    },
    headerTitle: {
      fontSize: 17,
      fontWeight: "700",
      color: theme.textSecondary,
    },
    container: { padding: 20, paddingBottom: 100 },
    avatarContainer: {
      alignItems: "center",
      paddingTop: 16,
      paddingBottom: 20,
    },
    avatarWrapper: { position: "relative", width: 120, height: 120 },
    avatarImage: { width: 120, height: 120, borderRadius: 60 },
    avatarName: {
      fontSize: 22,
      fontWeight: "700",
      color: theme.textSecondary,
      marginTop: 12,
    },
    avatarEmail: { fontSize: 13, color: theme.subtext, marginTop: 4 },
    editOverlay: {
      position: "absolute",
      bottom: 0,
      right: 0,
      backgroundColor: "#243d4d",
      borderRadius: 12,
      width: 24,
      height: 24,
      alignItems: "center",
      justifyContent: "center",
    },
    sectionTitle: {
      fontSize: 11,
      fontWeight: "700",
      color: theme.subtext,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 8,
      marginTop: 8,
      paddingHorizontal: 2,
    },
    card: {
      backgroundColor: theme.card,
      borderRadius: 16,
      overflow: "hidden",
      marginBottom: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.07,
      shadowRadius: 8,
      elevation: 3,
    },
    cardRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderLight,
    },
    cardLabel: { fontSize: 14, color: theme.subtext, fontWeight: "500" },
    cardValue: {
      fontSize: 14,
      color: theme.text,
      fontWeight: "600",
      maxWidth: "55%",
      textAlign: "right",
    },
    editRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 16,
      paddingRight: 8,
      minHeight: 56,
    },
    editLabel: {
      fontSize: 14,
      color: theme.subtext,
      fontWeight: "500",
      width: 110,
      flexShrink: 0,
    },
    flatInput: {
      flex: 1,
      backgroundColor: "transparent",
      fontSize: 14,
      color: theme.text,
      height: 56,
      paddingHorizontal: 0,
    },
    divider: { height: 1, backgroundColor: theme.borderLight, marginLeft: 16 },
    errorText: {
      fontSize: 12,
      color: theme.error,
      paddingHorizontal: 16,
      paddingBottom: 8,
    },
    updateButton: {
      backgroundColor: theme.primary || "#243d4d",
      margin: 16,
      paddingVertical: 15,
      borderRadius: 12,
      alignItems: "center",
    },
    disabled: { opacity: 0.6 },
    buttonText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  });