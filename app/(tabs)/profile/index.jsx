import { View, Text, ScrollView, RefreshControl } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../../assets/MziuriLogo.svg";

import { PersonalInfo } from "../../../components/profile/PersonalInfo";
import { CoursesSection } from "../../../components/profile/CourseSection";
import { ProfileHeader } from "../../../components/profile/ProfileHeader";
import { SelectionModal } from "../../../components/profile/SelectionModal";
import { DisplaySettings } from "../../../components/profile/DisplaySettings";
import { LogoutButton } from "../../../components/profile/LogoutButton";
import { LogoutConfirmationModal } from "../../../components/profile/LogoutConfirmationModal";
import { saveLanguage } from "../../../i18n";
import { ProfileContainer } from "../../../components/profile/ProfileContainer";

const profile = () => {
  return (
    <ProfileContainer>
      {({
        t,
        i18n,
        theme,
        themeMode,
        changeThemeMode,
        styles,
        userProfile,
        refreshing,
        refetch,
        state,
        setters,
        handlers,
        themeOptions,
        langOptions,
      }) => {
        const {
          showLogoutConfirm,
          isLoggingOut,
          showThemeModal,
          showLangModal,
        } = state;
        const { setShowLogoutConfirm, setShowThemeModal, setShowLangModal } =
          setters;
        const { handleLogoutConfirm } = handlers;

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
                  <View style={styles.profileContent}>
                    <ProfileHeader user={userProfile} />
                    <PersonalInfo user={userProfile} />
                    <CoursesSection
                      courses={userProfile.all_enrolled_groups}
                    />

                    <DisplaySettings
                      theme={theme}
                      themeMode={themeMode}
                      setShowThemeModal={setShowThemeModal}
                      setShowLangModal={setShowLangModal}
                      styles={styles}
                    />

                    <LogoutButton
                      onPress={() => setShowLogoutConfirm(true)}
                      styles={styles}
                    />
                  </View>
                ) : (
                  <View style={styles.container}>
                    <Text style={styles.emptyText}>
                      {t("profile.loading")}
                    </Text>
                  </View>
                )}
              </View>
            </ScrollView>

            <LogoutConfirmationModal
              visible={showLogoutConfirm}
              onConfirm={handleLogoutConfirm}
              onCancel={() => setShowLogoutConfirm(false)}
              isLoading={isLoggingOut}
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
      }}
    </ProfileContainer>
  );
};

export default profile;
