import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { ConfirmationModal } from "../ui/ConfirmationModal";

export const SubmitConfirmationModal = ({
  visible,
  onConfirm,
  onCancel,
  isLoading,
}) => {
  const { t } = useTranslation();

  return (
    <ConfirmationModal
      visible={visible}
      title={t("feedback.confirmSubmit")}
      message={t("feedback.confirmSubmitMessage")}
      confirmText={t("feedback.yesSubmit")}
      cancelText={t("common.cancel")}
      onConfirm={onConfirm}
      onCancel={onCancel}
      isLoading={isLoading}
    />
  );
};

SubmitConfirmationModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};
