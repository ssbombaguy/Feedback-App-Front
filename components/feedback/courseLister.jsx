import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { CourseCard } from './courseCard'
import { useTranslation } from 'react-i18next'

const CourseLister = ({ data, onFeedbackPress }) => {
  const { t } = useTranslation()
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('feedback.title')}</Text>
        <Text style={styles.subtitle}>{t('feedback.subtitle')}</Text>
      </View>
      {data.map((item, index) => (
        <CourseCard
          key={`${item.courseName}-${index}`}
          courseName={item.courseName}
          focusArea={item.focusArea}
          teacher={item.teacher}
          isActive={item.isActive}
          onFeedbackPress={onFeedbackPress}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2C3E50',
    letterSpacing: 0.5,
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#546E7A',
    marginTop: 4,
    alignSelf: 'center',
  },
})

export default CourseLister