import React from "react";
import { makeStyles } from "./ProfileAvatar.styles";

import { View, Text, Image, ActivityIndicator } from "react-native";
import { CustomButton } from "../ui/CustomButton";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { userAPI } from "../../api/user";
import { showSuccessToast, showErrorToast } from "../../utils/toastUtils";

export const ProfileAvatar = ({ userProfile, theme }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const styles = makeStyles(theme);

  const photoMutation = useMutation({
    mutationFn: (uri) => userAPI.uploadPhoto(uri),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
      showSuccessToast(
        t("common.success"),
        t("profile.photoUpdated") || "Photo updated successfully"
      );
    },
    onError: () => {
      showErrorToast(
        t("common.error"),
        t("profile.photoError") || "Failed to update photo"
      );
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
    <CustomButton
      variant="custom"
      onPress={handlePickPhoto}
      style={styles.avatarContainer}
    >
      <View style={styles.avatarWrapper}>
        {photoMutation.isPending ? (
          <ActivityIndicator size="large" color={theme.textSecondary} />
        ) : photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.avatarImage} />
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
    </CustomButton>
  );
};
