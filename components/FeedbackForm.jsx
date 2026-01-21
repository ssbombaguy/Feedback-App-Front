import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Switch } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { saveFeedback } from '../utils/FeedbackStorage'

const FeedbackValidationSchema = Yup.object().shape({
  teacherEvaluation: Yup.string()
    .required('This field is required'),
  courseEvaluation: Yup.string()
    .required('This field is required'),
  practicalUse: Yup.string()
    .required('This field is required'),
  studentRequests: Yup.string()
    .required('This field is required'),
  teacherRole: Yup.boolean(),
})

export const FeedbackForm = ({ courseName, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (values) => {
    try {
      setIsSubmitting(true)
      const success = await saveFeedback(courseName, values)
      
      if (success) {
        alert('Thank you for your feedback!')
        onClose()
      } else {
        alert('Error saving feedback. Please try again.')
      }
    } catch (error) {
      alert('Error: ' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Feedback for {courseName}</Text>
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
          teacherRole: false,
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
              <Text style={styles.label}>Teacher Evaluation *</Text>
              <TextInput
                style={[
                  styles.textarea,
                  touched.teacherEvaluation && errors.teacherEvaluation && styles.inputError,
                ]}
                placeholder="Share your thoughts about the teacher..."
                multiline
                numberOfLines={4}
                value={values.teacherEvaluation}
                onChangeText={handleChange('teacherEvaluation')}
                onBlur={handleBlur('teacherEvaluation')}
                textAlignVertical="top"
              />
              {touched.teacherEvaluation && errors.teacherEvaluation && (
                <Text style={styles.errorText}>{errors.teacherEvaluation}</Text>
              )}
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Course Evaluation *</Text>
              <Text style={styles.sublabel}>What the course provided, what would you add?</Text>
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
              />
              {touched.courseEvaluation && errors.courseEvaluation && (
                <Text style={styles.errorText}>{errors.courseEvaluation}</Text>
              )}
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Practical Use *</Text>
              <Text style={styles.sublabel}>How it helped with job/career</Text>
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
              />
              {touched.practicalUse && errors.practicalUse && (
                <Text style={styles.errorText}>{errors.practicalUse}</Text>
              )}
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Student Requests *</Text>
              <Text style={styles.sublabel}>What new subjects would you like added to Mziuri?</Text>
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
              />
              {touched.studentRequests && errors.studentRequests && (
                <Text style={styles.errorText}>{errors.studentRequests}</Text>
              )}
            </View>

            <View style={styles.checkboxContainer}>
              <View style={styles.switchContainer}>
                <Switch
                  value={values.teacherRole}
                  onValueChange={(value) => setFieldValue('teacherRole', value)}
                  trackColor={{ false: '#ccc', true: '#F9C94D' }}
                  thumbColor={values.teacherRole ? '#2C3E50' : '#999'}
                />
              </View>
              <Text style={styles.checkboxLabel}>
                Would you like to return as a teacher?
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleFormSubmit}
              >
                <Text style={styles.submitButtonText}>Submit Feedback</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => {
                  setFieldValue('teacherEvaluation', '')
                  setFieldValue('courseEvaluation', '')
                  setFieldValue('practicalUse', '')
                  setFieldValue('studentRequests', '')
                  setFieldValue('teacherRole', false)
                }}
              >
                <Text style={styles.clearButtonText}>Clear</Text>
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
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 6,
  },
  sublabel: {
    fontSize: 12,
    color: '#546E7A',
    marginBottom: 8,
    fontStyle: 'italic',
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  switchContainer: {
    marginRight: 12,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: '500',
    flex: 1,
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
