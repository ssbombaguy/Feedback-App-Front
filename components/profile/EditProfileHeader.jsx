import React from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { CustomButton } from "../ui/CustomButton";

export const EditProfileHeader = ({ theme, styles }) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
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
  );
};

EditProfileHeader.propTypes = {
  theme: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
};
