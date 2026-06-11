import { View, Text, ScrollView } from "react-native";
import React, { useMemo } from "react";
import { makeStyles } from "./FeedbackForm.styles";

import PropTypes from "prop-types";
import { Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { FeedbackField } from "./FeedbackField";
import { useTheme } from "../../context/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { FeedbackSwitches } from "./FeedbackSwitches";
import { CustomButton } from "../ui/CustomButton";
import { useFeedbackFormLogic } from "../../hooks/useFeedbackFormLogic";

import { SubmitConfirmationModal } from "./SubmitConfirmationModal";
import { AnonymousConfirmModal } from "./AnonymousConfirmModal";
import { AnonymousConflictModal } from "./AnonymousConflictModal";
import { TeacherConflictModal } from "./TeacherConflictModal";

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

  const feedbackSchema = useMemo(() => createFeedbackValidationSchema(t), [t]);

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
          validationSchema={feedbackSchema}
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

              <AnonymousConfirmModal
                visible={showAnonymousConfirm}
                onConfirm={() => {
                  setFieldValue("is_anonymous", true);
                  setShowAnonymousConfirm(false);
                }}
                onCancel={() => {
                  setFieldValue("is_anonymous", false);
                  setShowAnonymousConfirm(false);
                }}
              />

              <AnonymousConflictModal
                visible={showAnonymousConflictModal}
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

              <TeacherConflictModal
                visible={showTeacherConflictModal}
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

        <SubmitConfirmationModal
          visible={showConfirmation}
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

FeedbackForm.propTypes = {
  courseName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
