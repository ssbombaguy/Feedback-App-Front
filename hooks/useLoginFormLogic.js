import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";
import { saveLanguage } from "../i18n";
import { showErrorToast } from "../utils/toastUtils";

export const useLoginFormLogic = (onSubmit) => {
  const { t, i18n } = useTranslation();
  const { isDark, changeThemeMode } = useTheme();

  const [rememberMe, setRememberMe] = useState(false);

  const handleLanguageToggle = () => {
    saveLanguage(i18n.language === "en" ? "ka" : "en");
  };

  const handleThemeToggle = () => {
    changeThemeMode(isDark ? "light" : "dark");
  };

  const handleValidationErrors = async (validateForm, handleFormSubmit) => {
    const formErrors = await validateForm();
    if (Object.keys(formErrors).length > 0) {
      showErrorToast(
        t("auth.validationError") || "Validation Error",
        t("auth.fillAllFields") || "Please fill in all fields correctly"
      );
      return;
    }
    handleFormSubmit();
  };

  return {
    state: {
      rememberMe,
      isDark,
      currentLanguage: i18n.language,
    },
    setters: {
      setRememberMe,
    },
    handlers: {
      handleLanguageToggle,
      handleThemeToggle,
      handleValidationErrors,
      submitWithRememberMe: (values) => onSubmit({ ...values, rememberMe }),
    },
  };
};
