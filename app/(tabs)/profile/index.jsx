import { makeStyles } from "./index.styles";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
} from "react-native";
import { CustomButton } from "../../../components/ui/CustomButton";
import { phoneWidth } from "../../../constants/Dimensions";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import i18n, { saveLanguage } from "../../../i18n/index";
import { ConfirmationModal } from "../../../components/ui/ConfirmationModal";
import { SafeAreaView } from "react-native-safe-area-context";
import { PersonalInfo } from "../../../components/profile/PersonalInfo";
import { CoursesSection } from "../../../components/profile/CourseSection";
import { ProfileHeader } from "../../../components/profile/ProfileHeader";
import Logo from "../../../assets/MziuriLogo.svg";
import { useTheme } from "../../../context/ThemeContext";
import { useCurrentUserProfile } from "../../../hooks/useUser";
import { SelectionModal } from "../../../components/profile/SelectionModal";

import { useProfileMenuLogic } from "../../../hooks/useProfileMenuLogic";

const profile = () => {
  const { t } = useTranslation();
  const { theme, themeMode, changeThemeMode } = useTheme();
  const styles = makeStyles(theme);

  const { userProfile, isLoading, refetch } = useCurrentUserProfile();
  const refreshing = isLoading;

  const { state, setters, handlers } = useProfileMenuLogic();
  const { showLogoutConfirm, isLoggingOut, showThemeModal, showLangModal } = state;
  const { setShowLogoutConfirm, setShowThemeModal, setShowLangModal } = setters;
  const { handleLogoutConfirm } = handlers;

  const themeOptions = [
    { value: "light", label: t("profile.lightMode") },
    { value: "dark", label: t("profile.darkMode") },
    { value: "system", label: t("profile.systemMode") },
  ];

  const langOptions = [
    { value: "en", label: "English" },
    { value: "ka", label: "ქართული" },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refetch} />
        }
      >
        <View style={styles.container}>
          <Logo style={styles.logo} />

          {userProfile ? (
            <View
              style={{ alignItems: "flex-start", width: "100%", marginTop: 30 }}
            >
              <ProfileHeader user={userProfile} />
              <PersonalInfo user={userProfile} />
              <CoursesSection courses={userProfile.all_enrolled_groups} />

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

              <View style={styles.buttonContainer}>
                <CustomButton
                  variant="custom"
                  style={styles.logoutButton}
                  onPress={() => setShowLogoutConfirm(true)}
                >
                  <Ionicons name="log-out-outline" size={20} color="#243d4d" />
                  <Text style={styles.logoutText}>{t("profile.logout")}</Text>
                </CustomButton>
              </View>
            </View>
          ) : (
            <View style={styles.container}>
              <Text style={styles.emptyText}>{t("profile.loading")}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <ConfirmationModal
        visible={showLogoutConfirm}
        title={t("profile.confirmLogout")}
        message={t("profile.confirmLogoutMessage")}
        confirmText={t("profile.yesLogout")}
        cancelText={t("common.cancel")}
        onConfirm={handleLogoutConfirm}
        onCancel={() => setShowLogoutConfirm(false)}
        isLoading={isLoggingOut}
        isDangerous={true}
      />

      <SelectionModal
        visible={showThemeModal}
        title={t("profile.selectTheme")}
        options={themeOptions}
        selectedValue={themeMode}
        onSelect={changeThemeMode}
        onClose={() => setShowThemeModal(false)}
        theme={theme}
      />

      <SelectionModal
        visible={showLangModal}
        title={t("profile.selectLanguage")}
        options={langOptions}
        selectedValue={i18n.language}
        onSelect={saveLanguage}
        onClose={() => setShowLangModal(false)}
        theme={theme}
      />
    </SafeAreaView>
  );
};

export default profile;
