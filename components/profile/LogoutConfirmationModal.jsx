import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { ConfirmationModal } from "../ui/ConfirmationModal";

export const LogoutConfirmationModal = ({
  visible,
  onConfirm,
  onCancel,
  isLoading,
}) => {
  const { t } = useTranslation();

  return (
    <ConfirmationModal
      visible={visible}
      title={t("profile.confirmLogout")}
      message={t("profile.confirmLogoutMessage")}
      confirmText={t("profile.yesLogout")}
      cancelText={t("common.cancel")}
      onConfirm={onConfirm}
      onCancel={onCancel}
      isLoading={isLoading}
      isDangerous={true}
    />
  );
};

LogoutConfirmationModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};
