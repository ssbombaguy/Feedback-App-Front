import React from "react";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import Ionicons from "@expo/vector-icons/Ionicons";
import PropTypes from "prop-types";
import { CustomButton } from "../ui/CustomButton";

export const LogoutButton = ({ onPress, styles }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.buttonContainer}>
      <CustomButton
        variant="custom"
        style={styles.logoutButton}
        onPress={onPress}
      >
        <Ionicons name="log-out-outline" size={20} color="#243d4d" />
        <Text style={styles.logoutText}>{t("profile.logout")}</Text>
      </CustomButton>
    </View>
  );
};

LogoutButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
};
