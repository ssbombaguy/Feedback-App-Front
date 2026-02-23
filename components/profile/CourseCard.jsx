import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useTranslation } from 'react-i18next'

export const ProfileCourseCard = ({ course, isActive = false }) => {
  const { t } = useTranslation()
  return (
    <View style={[styles.courseCard, isActive && styles.activeCourseCard]}>
      <View style={styles.courseHeader}>
        <Text style={styles.courseName}>{course.name}</Text>
        {isActive && (
          <View style={styles.activeBadge}>
            <Ionicons name="checkmark-circle" size={16} color="#fff" />
            <Text style={styles.activeBadgeText}>{t('profile.active')}</Text>
          </View>
        )}
      </View>
      <View style={styles.courseContent}>
        <View style={styles.courseInfo}>
          <MaterialCommunityIcons name="clock-outline" size={16} color="#243d4d" style={styles.courseIcon} />
          <View>
            <Text style={styles.courseLabel}>{t('course.duration')}</Text>
            <Text style={styles.courseValue}>{course.duration}</Text>
          </View>
        </View>
        <View style={styles.courseInfo}>
          <MaterialCommunityIcons name="human-greeting" size={16} color="#243d4d" style={styles.courseIcon} />
          <View>
            <Text style={styles.courseLabel}>{t('course.teacher')}</Text>
            <Text style={styles.courseValue}>
              {Array.isArray(course.teachersName)
                ? course.teachersName.join(', ')
                : course.teachersName || 'N/A'}
            </Text>
          </View>
        </View>
        <View style={styles.courseInfo}>
          <MaterialCommunityIcons name="laptop" size={16} color="#243d4d" style={styles.courseIcon} />
          <View>
            <Text style={styles.courseLabel}>{t('course.learningType')}</Text>
            <Text style={styles.courseValue}>{course.learningType}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  courseCard: {
    backgroundColor: '#f9f9f9',
    borderLeftWidth: 4,
    borderLeftColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  activeCourseCard: { borderLeftColor: '#4CAF50' },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  courseName: { fontSize: 15, fontWeight: '700', color: '#243d4d', flex: 1 },
  activeBadge: {
    backgroundColor: '#4CAF50',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  activeBadgeText: { fontSize: 11, fontWeight: '600', color: '#fff' },
  courseContent: { gap: 8 },
  courseInfo: { flexDirection: 'row', alignItems: 'flex-start' },
  courseIcon: { marginRight: 10, marginTop: 2 },
  courseLabel: { fontSize: 11, color: '#999', fontWeight: '600', marginBottom: 2 },
  courseValue: { fontSize: 13, fontWeight: '500', color: '#555' },
})