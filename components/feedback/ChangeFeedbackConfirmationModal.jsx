import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { ConfirmationModal } from "../ui/ConfirmationModal";

export const ChangeFeedbackConfirmationModal = ({
  visible,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation();

  return (
    <ConfirmationModal
      visible={visible}
      title={t("feedback.changeFeedback")}
      message={t("feedback.changeFeedbackMessage")}
      confirmText={t("common.yes")}
      cancelText={t("common.cancel")}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

ChangeFeedbackConfirmationModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
