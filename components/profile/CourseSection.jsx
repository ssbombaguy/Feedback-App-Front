import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ProfileCourseCard } from './CourseCard'
import { useTheme } from '../../context/ThemeContext'

export const CoursesSection = ({ courses }) => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const styles = makeStyles(theme)
  const active = courses?.active
  const passed = courses?.passed || []

  return (
    <>
      {active && active.name && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile.activeCourse')}</Text>
          <ProfileCourseCard course={active} isActive={true} />
        </View>
      )}

      {passed.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t('profile.completedCourses')} ({passed.length})
          </Text>
          <ScrollView
            style={styles.coursesScroll}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
          >
            {passed.map((course, index) => (
              <ProfileCourseCard key={index} course={course} isActive={false} />
            ))}
          </ScrollView>
        </View>
      )}
    </>
  )
}

const makeStyles = (theme) => StyleSheet.create({
  section: {
    width: '100%',
    backgroundColor: theme.sectionBg,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: theme.textSecondary, marginBottom: 12 },
  coursesScroll: { maxHeight: 350 },
})