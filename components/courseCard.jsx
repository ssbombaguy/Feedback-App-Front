import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { useFeedback } from '../api/useFeedback'
import { useTranslation } from 'react-i18next'

export const CourseCard = ({ courseName, focusArea, teacher, isActive, onFeedbackPress }) => {
  const { feedback } = useFeedback()
  const { t } = useTranslation()
  
  const feedbackSubmitted = feedback.some(f => f.courseName === courseName)

  const handleFeedbackButtonPress = () => {
    if (feedbackSubmitted) {
      Alert.alert(
        t('feedback.alreadySubmitted'),
        t('feedback.alreadySubmittedMessage', { courseName })
      )
    } else {
      onFeedbackPress(courseName)
    }
  }

  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.courseName}>{courseName}</Text>
        {isActive && (
          <View style={styles.activeBadge}>
            <Text style={styles.activeBadgeText}>{t('course.active')}</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>{t('course.focusArea')}:</Text>
          <Text style={styles.value}>{focusArea}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>{t('course.teacher')}:</Text>
          <Text style={styles.value}>{teacher}</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={[
          styles.exploreButton,
          feedbackSubmitted && styles.exploreButtonDisabled,
        ]}
        onPress={handleFeedbackButtonPress}
        disabled={feedbackSubmitted}
      >
        <Text style={styles.exploreButtonText}>
          {feedbackSubmitted ? t('feedback.feedbackSubmitted') : t('feedback.writeFeedback')}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#243d4d',
    borderBottomWidth: 3,
    borderBottomColor: '#243d4d',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  courseName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C3E50',
    flex: 1,
    marginRight: 8,
  },
  activeBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  activeBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  content: {
    marginBottom: 12,
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  label: {
    fontSize: 13,
    color: '#546E7A',
    fontWeight: '600',
  },
  value: {
    fontSize: 13,
    color: '#2C3E50',
    fontWeight: '500',
    textAlign: 'right',
    flex: 1,
  },
  exploreButton: {
    backgroundColor: '#F9C94D',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 12,
  },
  exploreButtonDisabled: {
    backgroundColor: '#4CAF50',
    opacity: 0.8,
  },
  exploreButtonText: {
    color: '#2C3E50',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
})