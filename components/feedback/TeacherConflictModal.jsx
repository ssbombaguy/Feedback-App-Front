import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { ConfirmationModal } from "../ui/ConfirmationModal";

export const TeacherConflictModal = ({ visible, onConfirm, onCancel }) => {
  const { t } = useTranslation();

  return (
    <ConfirmationModal
      visible={visible}
      title={t("feedback.conflict") || "Conflict"}
      message={
        t("feedback.teacherConflictMessage") ||
        "You cannot request to 'Return as Teacher' while submitting anonymously. Would you like to turn off anonymity?"
      }
      confirmText={t("common.yes") || "Yes"}
      cancelText={t("common.cancel") || "Cancel"}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

TeacherConflictModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
