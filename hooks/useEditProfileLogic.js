import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { userAPI } from "../api/user";
import { verificationAPI } from "../api/verification";
import { showSuccessToast, showErrorToast } from "../utils/toastUtils";
import { useRouter } from "expo-router";

export const useEditProfileLogic = (userProfile) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [verificationModal, setVerificationModal] = useState({
    visible: false,
    type: null,
    contact: null,
    pendingValue: null,
  });

  const updateMutation = useMutation({
    mutationFn: (data) => userAPI.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
      showSuccessToast(
        t("common.success"),
        t("profile.updateSuccess") || "Profile updated successfully",
      );
      closeVerificationModal();
      router.back();
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        t("profile.updateError");
      showErrorToast(t("common.error"), errorMessage);
    },
  });

  const handleSendVerificationCode = async (contact) => {
    try {
      if (verificationModal.type === "phone") {
        await verificationAPI.sendPhoneCode(contact);
      } else if (verificationModal.type === "email") {
        await verificationAPI.sendEmailCode(contact);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        `Failed to send ${verificationModal.type} code`;
      throw new Error(errorMessage);
    }
  };

  const handleVerifyCode = async (contact, code) => {
    try {
      if (verificationModal.type === "phone") {
        await verificationAPI.verifyPhoneCode(contact, code);
      } else if (verificationModal.type === "email") {
        await verificationAPI.verifyEmailCode(contact, code);
      }

      await updateMutation.mutateAsync({
        firstName: userProfile?.firstName,
        lastName: userProfile?.lastName,
        personalNumber: userProfile?.personalNumber,
        email:
          verificationModal.type === "email"
            ? verificationModal.pendingValue
            : userProfile?.email,
        city: userProfile?.city_id,
        school: userProfile?.school_id,
        phoneNumber:
          verificationModal.type === "phone"
            ? verificationModal.pendingValue
            : userProfile?.phoneNumber,
        linkedinUrl: userProfile?.linkedinUrl || null,
        githubUrl: userProfile?.githubUrl || null,
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Verification failed";
      throw new Error(errorMessage);
    }
  };

  const openVerificationModal = (type, newValue) => {
    setVerificationModal({
      visible: true,
      type,
      contact: newValue,
      pendingValue: newValue,
    });
  };

  const closeVerificationModal = () => {
    setVerificationModal({
      visible: false,
      type: null,
      contact: null,
      pendingValue: null,
    });
  };

  const handleFormSubmit = (values) => {
    const phoneChanged = values.phoneNumber !== userProfile?.phoneNumber;
    const emailChanged = values.email !== userProfile?.email;

    if (phoneChanged) {
      openVerificationModal("phone", values.phoneNumber);
    } else if (emailChanged) {
      openVerificationModal("email", values.email);
    } else {
      updateMutation.mutate({
        firstName: userProfile?.firstName,
        lastName: userProfile?.lastName,
        personalNumber: userProfile?.personalNumber,
        email: userProfile?.email,
        city: userProfile?.city_id,
        school: userProfile?.school_id,
        phoneNumber: values.phoneNumber,
        linkedinUrl: values.linkedinUrl || null,
        githubUrl: values.githubUrl || null,
      });
    }
  };

  return {
    state: {
      verificationModal,
      isPending: updateMutation.isPending,
    },
    handlers: {
      handleSendVerificationCode,
      handleVerifyCode,
      closeVerificationModal,
      handleFormSubmit,
    },
  };
};
