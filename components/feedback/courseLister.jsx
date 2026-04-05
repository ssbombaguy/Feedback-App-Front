import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { CourseCard } from './courseCard'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../context/ThemeContext'

const CourseLister = ({ data, onFeedbackPress }) => {
  const { t } = useTranslation()
  const {theme} = useTheme();
  const styles = makeStyles(theme);

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
          groupId={item.groupId}
          onFeedbackPress={onFeedbackPress}
        />
      ))}
    </View>
  )
}

const makeStyles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  header: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
    marginBottom: 8,
  },
  title: { fontSize: 24, fontWeight: '800', color: theme.text, letterSpacing: 0.5, alignSelf: 'center' },
  subtitle: { fontSize: 14, color: theme.subtext, marginTop: 4, alignSelf: 'center' },
})

export default CourseLister