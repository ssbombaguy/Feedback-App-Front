import React from "react";
import { Modal } from "react-native";
import PropTypes from "prop-types";
import { FeedbackForm } from "./FeedbackForm";

export const FeedbackFormModal = ({
  visible,
  courseName,
  groupId,
  existingFeedback,
  onClose,
}) => {
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <FeedbackForm
        courseName={courseName}
        groupId={groupId}
        existingFeedback={existingFeedback}
        onClose={onClose}
      />
    </Modal>
  );
};

FeedbackFormModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  courseName: PropTypes.string,
  groupId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  existingFeedback: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};
