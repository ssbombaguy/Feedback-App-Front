import React from "react";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import Ionicons from "@expo/vector-icons/Ionicons";
import PropTypes from "prop-types";
import { CustomButton } from "../ui/CustomButton";

export const DisplaySettings = ({
  theme,
  themeMode,
  setShowThemeModal,
  setShowLangModal,
  styles,
}) => {
  const { t, i18n } = useTranslation();

  return (
    <>
      {/* Display Settings Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          {t("profile.displaySettings")}
        </Text>
      </View>

      <View style={styles.settingsCard}>
        {/* Theme row */}
        <CustomButton
          variant="custom"
          style={styles.settingsRow}
          onPress={() => setShowThemeModal(true)}
        >
          <View style={styles.settingsRowLeft}>
            <View style={styles.iconContainer}>
              <Ionicons
                name={
                  themeMode === "dark"
                    ? "moon-outline"
                    : themeMode === "light"
                      ? "sunny-outline"
                      : "options-outline"
                }
                size={22}
                color="#059669"
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.rowTitle}>{t("profile.theme")}</Text>
              <Text style={styles.rowSubtitle}>
                {themeMode === "system"
                  ? t("profile.systemMode")
                  : themeMode === "dark"
                    ? t("profile.darkMode")
                    : t("profile.lightMode")}
              </Text>
            </View>
          </View>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={theme.subtext}
          />
        </CustomButton>

        <View style={styles.rowDivider} />

        {/* Language row */}
        <CustomButton
          variant="custom"
          style={styles.settingsRow}
          onPress={() => setShowLangModal(true)}
        >
          <View style={styles.settingsRowLeft}>
            <View style={styles.iconContainer}>
              <Ionicons
                name="globe-outline"
                size={22}
                color="#059669"
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.rowTitle}>
                {t("profile.language")}
              </Text>
              <Text style={styles.rowSubtitle}>
                {i18n.language === "ka" ? "ქართული" : "English"}
              </Text>
            </View>
          </View>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={theme.subtext}
          />
        </CustomButton>
      </View>
    </>
  );
};

DisplaySettings.propTypes = {
  theme: PropTypes.object.isRequired,
  themeMode: PropTypes.string.isRequired,
  setShowThemeModal: PropTypes.func.isRequired,
  setShowLangModal: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
};
