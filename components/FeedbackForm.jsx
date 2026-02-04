import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Switch } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useFeedback } from '../api/useFeedback'
import { getUser } from '../utils/AsyncStorage'
import { useTranslation } from 'react-i18next'
import { FeedbackField } from './FeedbackField'
import { ConfirmationModal } from './ConfirmationModal'

const FEEDBACK_FIELDS_CONFIG = [
  {
    name: 'teacherEvaluation',
    labelKey: 'feedback.teacherEvaluation',
    hintKey: 'feedback.teacherEvaluationHint',
    placeholderKey: 'feedback.teacherEvaluationPlaceholder',
  },
  {
    name: 'courseEvaluation',
    labelKey: 'feedback.courseEvaluation',
    hintKey: 'feedback.courseEvaluationHint',
    placeholderKey: 'feedback.courseEvaluationPlaceholder',
  },
  {
    name: 'practicalUse',
    labelKey: 'feedback.practicalUse',
    hintKey: 'feedback.practicalUseHint',
    placeholderKey: 'feedback.practicalUsePlaceholder',
  },
  {
    name: 'studentRequests',
    labelKey: 'feedback.studentRequests',
    hintKey: 'feedback.studentRequestsHint',
    placeholderKey: 'feedback.studentRequestsPlaceholder',
  },
  {
    name: 'idealSchool',
    labelKey: 'feedback.idealSchool',
    hintKey: 'feedback.idealSchoolHint',
    placeholderKey: 'feedback.idealSchoolPlaceholder',
  },
]

const createFeedbackValidationSchema = (t) => {
  const shape = {}
  FEEDBACK_FIELDS_CONFIG.forEach((field) => {
    shape[field.name] = Yup.string()
      .required(t(`feedback.${field.name}Required`))
      .min(10, t('feedback.minCharacters'))
  })
  return Yup.object().shape(shape)
}

const getInitialValues = () => {
  const values = { returnAsTeacher: false }
  FEEDBACK_FIELDS_CONFIG.forEach((field) => {
    values[field.name] = ''
  })
  return values
}

export const FeedbackForm = ({ courseName, onClose }) => {
  const [user, setUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [pendingValues, setPendingValues] = useState(null)
  const { submitFeedback, isSubmitting } = useFeedback()
  const { t } = useTranslation()

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await getUser()
        setUser(userData)
      } catch (err) {
        console.error('Failed to load user:', err)
      } finally {
        setLoadingUser(false)
      }
    }
    loadUser()
  }, [])

  const buildFeedbackData = useCallback((values) => {
    const data = {
      userId: user.id,
      courseName,
      returnAsTeacher: values.returnAsTeacher,
    }
    FEEDBACK_FIELDS_CONFIG.forEach((field) => {
      data[field.name] = values[field.name]
    })
    return data
  }, [user, courseName])

  const handleSubmit = useCallback(async (values) => {
    if (!user) {
      alert(t('feedback.userNotFound') || 'User data not found. Please log in again.')
      return
    }

    setPendingValues(values)
    setShowConfirmation(true)
  }, [user, t])

  const handleConfirmSubmit = useCallback(async () => {
    if (!pendingValues || !user) return

    setShowConfirmation(false)
    const feedbackData = buildFeedbackData(pendingValues)

    submitFeedback(feedbackData, {
      onSuccess: () => {
        alert(t('feedback.thankYou'))
        onClose()
      },
      onError: (error) => {
        alert('Error: ' + (error?.response?.data?.error || error.message))
      },
    })
    setPendingValues(null)
  }, [pendingValues, user, buildFeedbackData, submitFeedback, onClose, t])

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('feedback.feedbackFor', { courseName })}</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>

      <Formik
        initialValues={getInitialValues()}
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

            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>{t('feedback.returnAsTeacher')}</Text>
              <Switch
                value={values.returnAsTeacher}
                onValueChange={(value) => setFieldValue('returnAsTeacher', value)}
                trackColor={{ false: '#E0E0E0', true: '#F9C94D' }}
                thumbColor={values.returnAsTeacher ? '#243d4d' : '#f4f3f4'}
                disabled={isSubmitting}
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
                onPress={handleFormSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#2C3E50" size="small" />
                ) : (
                  <Text style={styles.submitButtonText}>{t('feedback.submitFeedback')}</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.clearButton}
                onPress={onClose}
                disabled={isSubmitting}
              >
                <Text style={styles.clearButtonText}>{t('common.cancel')}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.spacer} />
          </View>
        )}
      </Formik>

      <ConfirmationModal
        visible={showConfirmation}
        title={t('feedback.confirmSubmit')}
        message={t('feedback.confirmSubmitMessage')}
        confirmText={t('feedback.yesSubmit')}
        cancelText={t('common.cancel')}
        onConfirm={handleConfirmSubmit}
        onCancel={() => {
          setShowConfirmation(false)
          setPendingValues(null)
        }}
        isLoading={isSubmitting}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FA',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    flex: 1,
  },
  closeButton: {
    padding: 8,
  },
  closeText: {
    fontSize: 24,
    color: '#546E7A',
    fontWeight: '600',
  },
  formContainer: {
    padding: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  switchLabel: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: '600',
    flex: 1,
    marginRight: 12,
  },
  buttonContainer: {
    gap: 12,
  },
  submitButton: {
    backgroundColor: '#F9C94D',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#2C3E50',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  clearButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#2C3E50',
    fontSize: 15,
    fontWeight: '600',
  },
  spacer: {
    height: 40,
  },
})

FeedbackForm.propTypes = {
  courseName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}