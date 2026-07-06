import React from "react";
import PropTypes from "prop-types";
import { VerificationModal } from "../ui/VerificationModal";
import { useTranslation } from "react-i18next";

export const ProfileVerificationModal = ({
  verificationModal,
  handleSendVerificationCode,
  handleVerifyCode,
  closeVerificationModal,
  isPending,
}) => {
  const { t } = useTranslation();

  return (
    <VerificationModal
      visible={verificationModal.visible}
      title={
        verificationModal.type === "phone"
          ? t("verification.verifyPhoneTitle")
          : t("verification.verifyEmailTitle")
      }
      message={
        verificationModal.type === "phone"
          ? t("verification.verifyPhoneMessage")
          : t("verification.verifyEmailMessage")
      }
      verificationType={verificationModal.type}
      contact={verificationModal.contact}
      onSendCode={handleSendVerificationCode}
      onVerifyCode={handleVerifyCode}
      onSuccess={closeVerificationModal}
      onCancel={closeVerificationModal}
      isLoading={isPending}
    />
  );
};

ProfileVerificationModal.propTypes = {
  verificationModal: PropTypes.shape({
    visible: PropTypes.bool.isRequired,
    type: PropTypes.oneOf(["phone", "email"]),
    contact: PropTypes.string,
  }).isRequired,
  handleSendVerificationCode: PropTypes.func.isRequired,
  handleVerifyCode: PropTypes.func.isRequired,
  closeVerificationModal: PropTypes.func.isRequired,
  isPending: PropTypes.bool,
};
