import { makeStyles } from "./LanguageSwitcher.styles";
import { View, Text, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { saveLanguage } from "../i18n";
import { useCallback } from "react";
import { useTheme } from "../context/ThemeContext";

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const { theme } = useTheme();
  const styles = makeStyles(theme);

  const changeLanguage = useCallback(
    async (lang) => {
      try {
        await i18n.changeLanguage(lang);
        await saveLanguage(lang);
      } catch (error) {
        console.error("Error changing language:", error);
      }
    },
    [i18n],
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, i18n.language === "en" && styles.activeButton]}
        onPress={() => changeLanguage("en")}
      >
        <Text
          style={[
            styles.buttonText,
            i18n.language === "en" && styles.activeText,
          ]}
        >
          {t("common.en")}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, i18n.language === "ka" && styles.activeButton]}
        onPress={() => changeLanguage("ka")}
      >
        <Text
          style={[
            styles.buttonText,
            i18n.language === "ka" && styles.activeText,
          ]}
        >
          {t("common.ka")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
