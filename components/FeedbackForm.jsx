import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Switch } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useFeedback } from '../api/useFeedback'
import { getUser } from '../utils/AsyncStorage'
import { useTranslation } from 'react-i18next'

const FeedbackValidationSchema = Yup.object().shape({
  teacherEvaluation: Yup.string()
    .required('Teacher evaluation is required')
    .min(10, 'Please provide at least 10 characters'),
  courseEvaluation: Yup.string()
    .required('Course evaluation is required')
    .min(10, 'Please provide at least 10 characters'),
  practicalUse: Yup.string()
    .required('Practical use feedback is required')
    .min(10, 'Please provide at least 10 characters'),
  studentRequests: Yup.string()
    .required('Student requests is required')
    .min(10, 'Please provide at least 10 characters'),
})

export const FeedbackForm = ({ courseName, onClose }) => {
  const [user, setUser] = useState(null)
  const { submitFeedback, isSubmitting, submitError } = useFeedback()
  const { t } = useTranslation()

  useEffect(() => {
    const loadUser = async () => {
      const userData = await getUser()
      setUser(userData)
    }
    loadUser()
  }, [])

  const handleSubmit = async (values) => {
    if (!user) {
      alert('User data not found. Please log in again.')
      return
    }

    const feedbackData = {
      userId: user.id,
      courseName: courseName,
      teacherEvaluation: values.teacherEvaluation,
      courseEvaluation: values.courseEvaluation,
      practicalUse: values.practicalUse,
      studentRequests: values.studentRequests,
      returnAsTeacher: values.returnAsTeacher,
    }

    submitFeedback(feedbackData, {
      onSuccess: () => {
        alert(t('feedback.thankYou'))
        onClose()
      },
      onError: (error) => {
        alert('Error: ' + (error?.response?.data?.error || error.message))
      },
    })
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('feedback.feedbackFor', { courseName })}</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>

      <Formik
        initialValues={{
          teacherEvaluation: '',
          courseEvaluation: '',
          practicalUse: '',
          studentRequests: '',
          returnAsTeacher: false,
        }}
        validationSchema={FeedbackValidationSchema}
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
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>{t('feedback.teacherEvaluation')} *</Text>
              <Text style={styles.hint}>{t('feedback.teacherEvaluationHint')}</Text>
              <TextInput
                style={[
                  styles.textarea,
                  touched.teacherEvaluation && errors.teacherEvaluation && styles.inputError,
                ]}
                placeholder="What did you think about the teacher?"
                multiline
                numberOfLines={4}
                value={values.teacherEvaluation}
                onChangeText={handleChange('teacherEvaluation')}
                onBlur={handleBlur('teacherEvaluation')}
                textAlignVertical="top"
                editable={!isSubmitting}
              />
              {touched.teacherEvaluation && errors.teacherEvaluation && (
                <Text style={styles.errorText}>{errors.teacherEvaluation}</Text>
              )}
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>{t('feedback.courseEvaluation')} *</Text>
              <Text style={styles.hint}>{t('feedback.courseEvaluationHint')}</Text>
              <TextInput
                style={[
                  styles.textarea,
                  touched.courseEvaluation && errors.courseEvaluation && styles.inputError,
                ]}
                placeholder="Share your course feedback..."
                multiline
                numberOfLines={4}
                value={values.courseEvaluation}
                onChangeText={handleChange('courseEvaluation')}
                onBlur={handleBlur('courseEvaluation')}
                textAlignVertical="top"
                editable={!isSubmitting}
              />
              {touched.courseEvaluation && errors.courseEvaluation && (
                <Text style={styles.errorText}>{errors.courseEvaluation}</Text>
              )}
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>{t('feedback.practicalUse')} *</Text>
              <Text style={styles.hint}>{t('feedback.practicalUseHint')}</Text>
              <TextInput
                style={[
                  styles.textarea,
                  touched.practicalUse && errors.practicalUse && styles.inputError,
                ]}
                placeholder="How has this course helped you in your career?"
                multiline
                numberOfLines={4}
                value={values.practicalUse}
                onChangeText={handleChange('practicalUse')}
                onBlur={handleBlur('practicalUse')}
                textAlignVertical="top"
                editable={!isSubmitting}
              />
              {touched.practicalUse && errors.practicalUse && (
                <Text style={styles.errorText}>{errors.practicalUse}</Text>
              )}
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>{t('feedback.studentRequests')} *</Text>
              <Text style={styles.hint}>{t('feedback.studentRequestsHint')}</Text>
              <TextInput
                style={[
                  styles.textarea,
                  touched.studentRequests && errors.studentRequests && styles.inputError,
                ]}
                placeholder="What topics would you like to learn?"
                multiline
                numberOfLines={4}
                value={values.studentRequests}
                onChangeText={handleChange('studentRequests')}
                onBlur={handleBlur('studentRequests')}
                textAlignVertical="top"
                editable={!isSubmitting}
              />
              {touched.studentRequests && errors.studentRequests && (
                <Text style={styles.errorText}>{errors.studentRequests}</Text>
              )}
            </View>

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
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 4,
  },
  hint: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 8,
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#2C3E50',
    backgroundColor: '#fff',
    minHeight: 100,
  },
  inputError: {
    borderColor: '#F44336',
    backgroundColor: '#FFEBEE',
  },
  errorText: {
    color: '#F44336',
    fontSize: 12,
    marginTop: 6,
    fontWeight: '600',
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