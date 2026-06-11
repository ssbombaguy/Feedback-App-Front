import React from "react";
import PropTypes from "prop-types";
import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { setUser } from "../../utils/AsyncStorage";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { showErrorToast } from "../../utils/toastUtils";
import { makeStyles } from "../../app/auth/index.styles";

export const LoginContainer = ({ children }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { login } = useAuth();
  const styles = makeStyles(theme);

  const loginMutation = useMutation({
    mutationFn: (values) =>
      login(values.email, values.password, values.rememberMe),
    onSuccess: async (response) => {
      if (response?.user) {
        await setUser(response.user);
        router.replace("/(tabs)/(feedback)");
      }
    },
    onError: (error) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      showErrorToast(t("common.error"), message);
    },
  });

  const handleLogin = (values) => {
    loginMutation.mutate(values);
  };

  return children({
    theme,
    styles,
    loginMutation,
    handleLogin,
  });
};

LoginContainer.propTypes = {
  children: PropTypes.func.isRequired,
};
