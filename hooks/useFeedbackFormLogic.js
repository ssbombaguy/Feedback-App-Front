import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import { useFeedback } from "./useFeedback";
import { showErrorToast } from "../utils/toastUtils";

export const useFeedbackFormLogic = (groupId, existingFeedback, onClose) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { submitFeedback, updateFeedback, isSubmitting, refetch } = useFeedback();

  const [showAnonymousConflictModal, setShowAnonymousConflictModal] = useState(false);
  const [showTeacherConflictModal, setShowTeacherConflictModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingValues, setPendingValues] = useState(null);
  const [showAnonymousConfirm, setShowAnonymousConfirm] = useState(false);

  const getInitialValues = () => ({
    wants_to_return_as_teacher: existingFeedback?.wants_to_return_as_teacher || false,
    teacher_evaluation_form: existingFeedback?.teacher_evaluation_form || "",
    course_evaluation_form: existingFeedback?.course_evaluation_form || "",
    career_impact: existingFeedback?.career_impact || "",
    subject_wishes: existingFeedback?.subject_wishes || "",
    ideal_learning_environment: existingFeedback?.ideal_learning_environment || "",
    is_anonymous: existingFeedback?.is_anonymous || false,
  });

  const handleReturnAsTeacherToggle = (value, setFieldValue, currentValues) => {
    if (value && currentValues.is_anonymous) {
      setShowTeacherConflictModal(true);
      return;
    }
    setFieldValue("wants_to_return_as_teacher", value);
  };

  const handleAnonymousToggle = (value, setFieldValue, currentValues) => {
    if (value && currentValues.wants_to_return_as_teacher) {
      setShowAnonymousConflictModal(true);
      return;
    }
    setFieldValue("is_anonymous", value);
    if (value) {
      setShowAnonymousConfirm(true);
    }
  };

  const buildFeedbackData = useCallback(
    (values) => ({
      group_id: groupId,
      teacher_evaluation_form: values.teacher_evaluation_form,
      course_evaluation_form: values.course_evaluation_form,
      career_impact: values.career_impact,
      subject_wishes: values.subject_wishes,
      ideal_learning_environment: values.ideal_learning_environment,
      wants_to_return_as_teacher: values.wants_to_return_as_teacher,
      is_anonymous: existingFeedback?.id ? false : values.is_anonymous,
    }),
    [groupId, existingFeedback],
  );

  const handleSubmit = useCallback(
    async (values) => {
      if (!user) {
        showErrorToast(t("common.error"), t("feedback.userNotFound"));
        return;
      }
      setPendingValues(values);
      setShowConfirmation(true);
    },
    [user, t],
  );

  const handleConfirmSubmit = useCallback(async () => {
    if (!pendingValues || !user) return;

    setShowConfirmation(false);
    const feedbackData = buildFeedbackData(pendingValues);

    if (existingFeedback?.id) {
      updateFeedback(
        { feedbackId: existingFeedback.id, feedbackData },
        {
          onSuccess: async () => {
            await refetch();
            onClose(true);
          },
          onError: (error) => {
            console.log(
              "feedback error:",
              JSON.stringify(error?.response?.data, null, 2),
            );
            showErrorToast(t("common.error"), t("feedback.error"));
          },
        },
      );
    } else {
      submitFeedback(feedbackData, {
        onSuccess: async () => {
          await refetch();
          onClose(true);
        },
        onError: () => {
          showErrorToast(t("common.error"), t("feedback.error"));
        },
      });
    }

    setPendingValues(null);
  }, [
    pendingValues,
    user,
    existingFeedback,
    buildFeedbackData,
    submitFeedback,
    updateFeedback,
    onClose,
    t,
    refetch,
  ]);

  return {
    state: {
      showAnonymousConflictModal,
      showTeacherConflictModal,
      showConfirmation,
      showAnonymousConfirm,
      isSubmitting,
    },
    setters: {
      setShowAnonymousConflictModal,
      setShowTeacherConflictModal,
      setShowConfirmation,
      setShowAnonymousConfirm,
      setPendingValues,
    },
    handlers: {
      getInitialValues,
      handleReturnAsTeacherToggle,
      handleAnonymousToggle,
      handleSubmit,
      handleConfirmSubmit,
    },
  };
};
