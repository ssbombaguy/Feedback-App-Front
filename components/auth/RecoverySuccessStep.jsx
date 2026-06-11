import React from "react";
import { Text, View } from "react-native";
import { CustomButton } from "../ui/CustomButton";
import { useTranslation } from "react-i18next";
import Ionicons from "@expo/vector-icons/Ionicons";
import { makeStyles } from "./RecoveryEmailStep.styles";
import PropTypes from "prop-types";

export const RecoverySuccessStep = ({ onBackToLogin, theme }) => {
  const { t } = useTranslation();
  const styles = makeStyles(theme);

  return (
    <>
      <View style={{ alignSelf: "center", marginTop: 80, marginBottom: 20 }}>
        <Ionicons name="checkmark-circle-outline" size={80} color="#059669" />
      </View>
      <Text style={styles.title}>{t("common.success")}</Text>
      <Text style={styles.subtitle}>{t("recovery.linkSent")}</Text>

      <CustomButton
        title={t("recovery.backToLogin")}
        onPress={onBackToLogin}
        style={styles.button}
      />
    </>
  );
};

RecoverySuccessStep.propTypes = {
  onBackToLogin: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};
