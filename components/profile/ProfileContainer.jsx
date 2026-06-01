import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";
import { useUser } from "../../hooks/useUser";
import { useProfileMenuLogic } from "../../hooks/useProfileMenuLogic";
import { makeStyles } from "../../app/(tabs)/profile/index.styles";

export const ProfileContainer = ({ children }) => {
  const { t, i18n } = useTranslation();
  const { theme, themeMode, changeThemeMode } = useTheme();
  const styles = makeStyles(theme);

  const { userProfile, isLoading, refetch } = useUser();
  const refreshing = isLoading;

  const { state, setters, handlers } = useProfileMenuLogic();

  const themeOptions = [
    { value: "light", label: t("profile.lightMode") },
    { value: "dark", label: t("profile.darkMode") },
    { value: "system", label: t("profile.systemMode") },
  ];

  const langOptions = [
    { value: "en", label: "English" },
    { value: "ka", label: "ქართული" },
  ];

  return children({
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
  });
};

ProfileContainer.propTypes = {
  children: PropTypes.func.isRequired,
};
