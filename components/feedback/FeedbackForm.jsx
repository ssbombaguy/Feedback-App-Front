import {
  View,
  Text,
  ScrollView,
} from "react-native";
import React from "react";
import {} from "./FeedbackForm.styles";

import PropTypes from "prop-types";
import { Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { FeedbackField } from "./FeedbackField";
import { ConfirmationModal } from "../ui/ConfirmationModal";
import { useTheme } from "../../context/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { FeedbackSwitches } from "./FeedbackSwitches";
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

import { useFeedbackFormLogic } from "../../hooks/useFeedbackFormLogic";

export const FeedbackForm = ({
  courseName,
  groupId,
  existingFeedback,
  onClose,
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = makeStyles(theme);

  const { state, setters, handlers } = useFeedbackFormLogic(
    groupId,
    existingFeedback,
    onClose
  );

  const {
    showAnonymousConflictModal,
    showTeacherConflictModal,
    showConfirmation,
    showAnonymousConfirm,
    isSubmitting,
  } = state;

  const {
    setShowAnonymousConflictModal,
    setShowTeacherConflictModal,
    setShowConfirmation,
    setShowAnonymousConfirm,
    setPendingValues,
  } = setters;

  const {
    getInitialValues,
    handleReturnAsTeacherToggle,
    handleAnonymousToggle,
    handleSubmit,
    handleConfirmSubmit,
  } = handlers;

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
