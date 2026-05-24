import {
  View,
  Text,
  ScrollView,
} from "react-native";
import React, { useState, useCallback } from "react";
import {} from "./FeedbackForm.styles";

import PropTypes from "prop-types";
import { Formik } from "formik";
import * as Yup from "yup";
import { useFeedback } from "../../hooks/useFeedback";
import { useTranslation } from "react-i18next";
import { FeedbackField } from "./FeedbackField";
import { ConfirmationModal } from "../ConfirmationModal";
import { useTheme } from "../../context/ThemeContext";
import { showErrorToast } from "../../utils/toastUtils";
import { SafeAreaView } from "react-native-safe-area-context";
import { FeedbackSwitches } from "./FeedbackSwitches";
import { useAuth } from "../../context/AuthContext";
import { CustomButton } from "../ui/CustomButton";

const FEEDBACK_FIELDS_CONFIG = [
  {
    name: "teacher_evaluation_form",
    labelKey: "feedback.teacherEvaluation",
    hintKey: "feedback.teacherEvaluationHint",
    placeholderKey: "feedback.teacherEvaluationPlaceholder",
  },
  {
    name: "course_evaluation_form",
    labelKey: "feedback.courseEvaluation",
    hintKey: "feedback.courseEvaluationHint",
    placeholderKey: "feedback.courseEvaluationPlaceholder",
  },
  {
    name: "career_impact",
    labelKey: "feedback.practicalUse",
    hintKey: "feedback.practicalUseHint",
    placeholderKey: "feedback.practicalUsePlaceholder",
  },
  {
    name: "subject_wishes",
    labelKey: "feedback.studentRequests",
    hintKey: "feedback.studentRequestsHint",
    placeholderKey: "feedback.studentRequestsPlaceholder",
  },
  {
    name: "ideal_learning_environment",
    labelKey: "feedback.idealSchool",
    hintKey: "feedback.idealSchoolHint",
    placeholderKey: "feedback.idealSchoolPlaceholder",
  },
];

const createFeedbackValidationSchema = (t) => {
  const shape = {};
  FEEDBACK_FIELDS_CONFIG.forEach((field) => {
    shape[field.name] = Yup.string()
      .required(t(`feedback.${field.name}Required`))
      .min(10, t("feedback.minCharacters"));
  });
  return Yup.object().shape(shape);
};

export const FeedbackForm = ({
  courseName,
  groupId,
  existingFeedback,
  onClose,
}) => {
  const [showAnonymousConflictModal, setShowAnonymousConflictModal] =
    useState(false);
  const [showTeacherConflictModal, setShowTeacherConflictModal] =
    useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingValues, setPendingValues] = useState(null);
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = makeStyles(theme);
  const [showAnonymousConfirm, setShowAnonymousConfirm] = useState(false);
  const { user } = useAuth();
  const { submitFeedback, updateFeedback, isSubmitting, refetch } =
    useFeedback();

  const getInitialValues = () => ({
    wants_to_return_as_teacher:
      existingFeedback?.wants_to_return_as_teacher || false,
    teacher_evaluation_form: existingFeedback?.teacher_evaluation_form || "",
    course_evaluation_form: existingFeedback?.course_evaluation_form || "",
    career_impact: existingFeedback?.career_impact || "",
    subject_wishes: existingFeedback?.subject_wishes || "",
    ideal_learning_environment:
      existingFeedback?.ideal_learning_environment || "",
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>
            {t("feedback.feedbackFor", { courseName })}
          </Text>
          <CustomButton
            variant="custom"
            onPress={() => onClose()}
            style={styles.closeButton}
          >
            <Text style={styles.closeText}>✕</Text>
          </CustomButton>
        </View>

        <Formik
          initialValues={getInitialValues()}
          enableReinitialize
          validationSchema={createFeedbackValidationSchema(t)}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit: handleFormSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <>
              <View style={styles.formContainer}>
                {FEEDBACK_FIELDS_CONFIG.map((field) => (
                  <FeedbackField
                    key={field.name}
                    name={field.name}
                    labelKey={field.labelKey}
                    hintKey={field.hintKey}
                    placeholderKey={field.placeholderKey}
                    value={values[field.name]}
                    onChangeText={handleChange(field.name)}
                    onBlur={handleBlur(field.name)}
                    error={errors[field.name]}
                    touched={touched[field.name]}
                    isSubmitting={isSubmitting}
                  />
                ))}

                <FeedbackSwitches
                  values={values}
                  setFieldValue={setFieldValue}
                  isSubmitting={isSubmitting}
                  onReturnAsTeacherToggle={handleReturnAsTeacherToggle}
                  onAnonymousToggle={handleAnonymousToggle}
                  theme={theme}
                />

                <View style={styles.buttonContainer}>
                  <CustomButton
                    title={t("feedback.submitFeedback")}
                    onPress={handleFormSubmit}
                    isPending={isSubmitting}
                    style={styles.submitButton}
                  />

                  <CustomButton
                    variant="secondary"
                    title={t("common.cancel")}
                    onPress={() => onClose()}
                    disabled={isSubmitting}
                    style={styles.clearButton}
                  />
                </View>

                <View style={styles.spacer} />
              </View>

              <ConfirmationModal
                visible={showAnonymousConfirm}
                title={t("feedback.submitAnonymously?")}
                message={
                  <Text style={{ textAlign: "center", fontSize: 16 }}>
                    {t("feedback.submitAnonymouslyMessage")}
                  </Text>
                }
                confirmText={t("feedback.yesSubmitAnonymously")}
                cancelText={t("feedback.noSubmitAnonymously")}
                onConfirm={() => {
                  setFieldValue("is_anonymous", true);
                  setShowAnonymousConfirm(false);
                }}
                onCancel={() => {
                  setFieldValue("is_anonymous", false);
                  setShowAnonymousConfirm(false);
                }}
              />

              <ConfirmationModal
                visible={showAnonymousConflictModal}
                title={t("feedback.conflict") || "Conflict"}
                message={
                  t("feedback.anonymousConflictMessage") ||
                  "An anonymous submission cannot request returning as a teacher. Toggling this will automatically turn off the 'Return as Teacher' option. Do you want to proceed?"
                }
                confirmText={t("common.yes") || "Yes"}
                cancelText={t("common.cancel") || "Cancel"}
                onConfirm={() => {
                  setFieldValue("is_anonymous", true);
                  setFieldValue("wants_to_return_as_teacher", false);
                  setShowAnonymousConflictModal(false);
                }}
                onCancel={() => {
                  setFieldValue("is_anonymous", false);
                  setShowAnonymousConflictModal(false);
                }}
              />

              <ConfirmationModal
                visible={showTeacherConflictModal}
                title={t("feedback.conflict") || "Conflict"}
                message={
                  t("feedback.teacherConflictMessage") ||
                  "You cannot request to 'Return as Teacher' while submitting anonymously. Would you like to turn off anonymity?"
                }
                confirmText={t("common.yes") || "Yes"}
                cancelText={t("common.cancel") || "Cancel"}
                onConfirm={() => {
                  setFieldValue("wants_to_return_as_teacher", true);
                  setFieldValue("is_anonymous", false);
                  setShowTeacherConflictModal(false);
                }}
                onCancel={() => {
                  setFieldValue("wants_to_return_as_teacher", false);
                  setShowTeacherConflictModal(false);
                }}
              />
            </>
          )}
        </Formik>

        <ConfirmationModal
          visible={showConfirmation}
          title={t("feedback.confirmSubmit")}
          message={t("feedback.confirmSubmitMessage")}
          confirmText={t("feedback.yesSubmit")}
          cancelText={t("common.cancel")}
          onConfirm={handleConfirmSubmit}
          onCancel={() => {
            setShowConfirmation(false);
            setPendingValues(null);
          }}
          isLoading={isSubmitting}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
