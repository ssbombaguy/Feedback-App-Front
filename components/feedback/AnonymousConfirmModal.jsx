import React from "react";
import { Text } from "react-native";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { ConfirmationModal } from "../ui/ConfirmationModal";

export const AnonymousConfirmModal = ({ visible, onConfirm, onCancel }) => {
  const { t } = useTranslation();

  return (
    <ConfirmationModal
      visible={visible}
      title={t("feedback.submitAnonymously?")}
      message={t("feedback.submitAnonymouslyMessage")}
      confirmText={t("feedback.yesSubmitAnonymously")}
      cancelText={t("feedback.noSubmitAnonymously")}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

AnonymousConfirmModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
