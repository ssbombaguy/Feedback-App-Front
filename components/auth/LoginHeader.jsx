import React from "react";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Logo from "../../assets/MziuriLogo.svg";

export const LoginHeader = ({ styles }) => {
  const { t } = useTranslation();

  return (
    <>
      <View style={styles.topPart}>
        <Logo style={styles.logo} />
        <Text style={styles.smallTitle}>{t("auth.welcomeBack")}</Text>
      </View>
    </>
  );
};

LoginHeader.propTypes = {
  styles: PropTypes.object.isRequired,
};
