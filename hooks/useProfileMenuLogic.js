import { useState } from "react";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import { showErrorToast } from "../utils/toastUtils";

export const useProfileMenuLogic = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { logout } = useAuth();

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [showLangModal, setShowLangModal] = useState(false);

  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      router.replace("/auth");
    } catch (error) {
      showErrorToast(t("common.error"), error.message);
    } finally {
      setIsLoggingOut(false);
      setShowLogoutConfirm(false);
    }
  };

  return {
    state: {
      showLogoutConfirm,
      isLoggingOut,
      showThemeModal,
      showLangModal,
    },
    setters: {
      setShowLogoutConfirm,
      setShowThemeModal,
      setShowLangModal,
    },
    handlers: {
      handleLogoutConfirm,
    },
  };
};
