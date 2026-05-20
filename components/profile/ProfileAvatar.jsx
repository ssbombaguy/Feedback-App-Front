import React from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { userAPI } from "../../api/apiClient";
import { showSuccessToast, showErrorToast } from "../../utils/toastUtils";

export const ProfileAvatar = ({ userProfile, theme }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const styles = makeStyles(theme);

  const photoMutation = useMutation({
    mutationFn: (uri) => userAPI.uploadPhoto(uri),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
      showSuccessToast(t("common.success"), t("profile.photoUpdated") || "Photo updated successfully");
    },
    onError: () => {
      showErrorToast(t("common.error"), t("profile.photoError") || "Failed to update photo");
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

  const photoUri = userProfile?.photo
    ? `${process.env.EXPO_PUBLIC_API_URL.replace(/\/api\/v1\/?$/, "")}${userProfile.photo}`
    : null;

  return (
    <TouchableOpacity
      onPress={handlePickPhoto}
      style={styles.avatarContainer}
      activeOpacity={0.8}
    >
      <View style={styles.avatarWrapper}>
        {photoMutation.isPending ? (
          <ActivityIndicator size="large" color={theme.textSecondary} />
        ) : photoUri ? (
          <Image
            source={{ uri: photoUri }}
            style={styles.avatarImage}
            onError={(e) => console.log("Image load error:", e.nativeEvent.error)}
          />
        ) : (
          <FontAwesome name="user-circle-o" size={80} color={theme.textSecondary} />
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
  );
};

const makeStyles = (theme) =>
  StyleSheet.create({
    avatarContainer: {
      alignItems: "center",
      marginVertical: 24,
    },
    avatarWrapper: {
      position: "relative",
      borderRadius: 45,
      width: 90,
      height: 90,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.avatarBg || "#f0f0f0",
      borderWidth: 1,
      borderColor: theme.border,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    avatarImage: {
      width: 90,
      height: 90,
      borderRadius: 45,
    },
    editOverlay: {
      position: "absolute",
      bottom: 0,
      right: 0,
      backgroundColor: theme.accent || "#243d4d",
      borderRadius: 12,
      width: 24,
      height: 24,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: "#fff",
    },
    avatarName: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.text,
      marginTop: 12,
    },
    avatarEmail: {
      fontSize: 13,
      color: theme.subtext,
      marginTop: 2,
    },
  });
