import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { authAPI } from "../api/apiClient";
import { showSuccessToast, showErrorToast } from "../utils/toastUtils";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";

export const usePasswordRecoveryLogic = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [step, setStep] = useState("email");
  const [userEmail, setUserEmail] = useState("");
  const [resetToken, setResetToken] = useState("");

  const forgotPasswordMutation = useMutation({
    mutationFn: (email) => authAPI.forgotPassword(email),
    onSuccess: () => {
      showSuccessToast(t("common.success"), t("recovery.codeSent"));
      setStep("code");
    },
    onError: (error) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        t("recovery.emailNotFound");
      showErrorToast(t("common.error"), message);
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: ({ email, token, password, confirmPassword }) =>
      authAPI.resetPassword(email, token, password, confirmPassword),
    onSuccess: () => {
      showSuccessToast(t("common.success"), t("recovery.passwordResetSuccess"));
      setTimeout(() => router.replace("/auth"), 1500);
    },
    onError: (error) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      showErrorToast(t("common.error"), message);
    },
  });

  const handleEmailSubmit = (values) => {
    setUserEmail(values.email);
    forgotPasswordMutation.mutate(values.email);
  };

  const handleCodeSubmit = (values) => {
    setResetToken(values.code);
    showSuccessToast(t("common.success"), t("recovery.verifySuccess"));
    setStep("password");
  };

  const handlePasswordSubmit = (values) => {
    resetPasswordMutation.mutate({
      email: userEmail,
      token: resetToken,
      password: values.password,
      confirmPassword: values.confirmPassword,
    });
  };

  const handleBack = () => {
    if (step === "email") {
      router.back();
    } else if (step === "code") {
      setStep("email");
      setUserEmail("");
    } else {
      setStep("code");
    }
  };

  return {
    state: {
      step,
      userEmail,
      isForgotPending: forgotPasswordMutation.isPending,
      isResetPending: resetPasswordMutation.isPending,
    },
    handlers: {
      handleEmailSubmit,
      handleCodeSubmit,
      handlePasswordSubmit,
      handleBack,
    },
  };
};
