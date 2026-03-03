import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useFeedback } from '../../api/useFeedback'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../context/ThemeContext'
import { showErrorToast } from '../../utils/toastUtils'

export const CourseCard = ({ courseName, focusArea, teacher, isActive, onFeedbackPress }) => {
  const { feedback } = useFeedback()
  const { t } = useTranslation()
  const { theme } = useTheme();
  const styles = makeStyles(theme);
  

  const feedbackSubmitted = feedback.some(f => f.courseName === courseName)

  const handleFeedbackButtonPress = () => {
    if (feedbackSubmitted) {
      showErrorToast(
        t('feedback.alreadySubmitted'),
        t('feedback.alreadySubmittedMessage', { courseName })
      )
    } else {
      onFeedbackPress(courseName)
    }
  }

  return (
    <View style={styles.card}>
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
          <Text style={styles.label}>{t('course.duration')}:</Text>
          <Text style={styles.value}>{focusArea}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>{t('course.teacher')}:</Text>
          <Text style={styles.value}>{teacher}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, feedbackSubmitted && styles.buttonSubmitted]}
        onPress={handleFeedbackButtonPress}
        disabled={feedbackSubmitted}
      >
        <Text style={styles.buttonText}>
          {feedbackSubmitted ? t('feedback.feedbackSubmitted') : t('feedback.writeFeedback')}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const makeStyles = (theme) => StyleSheet.create({
  card: {
    backgroundColor: theme.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  courseName: { fontSize: 16, fontWeight: '700', color: theme.text, flex: 1, marginRight: 8 },
  activeBadge: {
    backgroundColor: theme.success,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  activeBadgeText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  content: { marginBottom: 12, gap: 6 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 2 },
  label: { fontSize: 13, color: theme.subtext, fontWeight: '600' },
  value: { fontSize: 13, color: theme.text, fontWeight: '500', textAlign: 'right', flex: 1, marginLeft: 8 },
  button: {
    backgroundColor: theme.accent,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonSubmitted: { backgroundColor: theme.success, opacity: 0.9 },
  buttonText: { color: theme.text, fontSize: 14, fontWeight: '700' },
})