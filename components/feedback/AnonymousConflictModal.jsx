import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { ConfirmationModal } from "../ui/ConfirmationModal";

export const AnonymousConflictModal = ({
  visible,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation();

  return (
    <ConfirmationModal
      visible={visible}
      title={t("feedback.conflict") || "Conflict"}
      message={
        t("feedback.anonymousConflictMessage") ||
        "An anonymous submission cannot request returning as a teacher. Toggling this will automatically turn off the 'Return as Teacher' option. Do you want to proceed?"
      }
      confirmText={t("common.yes") || "Yes"}
      cancelText={t("common.cancel") || "Cancel"}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

AnonymousConflictModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
