import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { ConfirmationModal } from "../ui/ConfirmationModal";

export const ChangeFeedbackConfirmationModal = ({
  visible,
  pendingFeedbackPress,
  setShowChangeConfirm,
  setSelectedCourseName,
  setSelectedGroupId,
  setSelectedFeedback,
  setShowFeedbackForm,
  setPendingFeedbackPress,
}) => {
  const { t } = useTranslation();

  const handleConfirm = () => {
    setShowChangeConfirm(false);
    if (pendingFeedbackPress) {
      setSelectedCourseName(pendingFeedbackPress.courseName);
      setSelectedGroupId(pendingFeedbackPress.groupId);
      setSelectedFeedback(pendingFeedbackPress.existingFeedback);
    }
    setShowFeedbackForm(true);
    setPendingFeedbackPress(null);
  };

  const handleCancel = () => {
    setShowChangeConfirm(false);
    setPendingFeedbackPress(null);
  };

  return (
    <ConfirmationModal
      visible={visible}
      title={t("feedback.changeFeedback")}
      message={t("feedback.changeFeedbackMessage")}
      confirmText={t("common.yes")}
      cancelText={t("common.cancel")}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );
};

ChangeFeedbackConfirmationModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  pendingFeedbackPress: PropTypes.object,
  setShowChangeConfirm: PropTypes.func.isRequired,
  setSelectedCourseName: PropTypes.func.isRequired,
  setSelectedGroupId: PropTypes.func.isRequired,
  setSelectedFeedback: PropTypes.func.isRequired,
  setShowFeedbackForm: PropTypes.func.isRequired,
  setPendingFeedbackPress: PropTypes.func.isRequired,
};
