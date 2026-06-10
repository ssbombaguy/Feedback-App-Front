import React from "react";
import PropTypes from "prop-types";
import { VerificationModal } from "../ui/VerificationModal";

export const ProfileVerificationModal = ({
  verificationModal,
  handleSendVerificationCode,
  handleVerifyCode,
  closeVerificationModal,
  isPending,
}) => {
  return (
    <VerificationModal
      visible={verificationModal.visible}
      title={
        verificationModal.type === "phone"
          ? "Verify Your Phone Number"
          : "Verify Your Email"
      }
      message={
        verificationModal.type === "phone"
          ? "We'll send a verification code to your phone number to confirm the change."
          : "We'll send a verification code to your email to confirm the change."
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
