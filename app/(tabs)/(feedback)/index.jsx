import { View, Text, StyleSheet, Modal, Image, ActivityIndicator, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import CourseLister from '../../../components/feedback/courseLister'
import { FeedbackForm } from '../../../components/feedback/FeedbackForm'
import { userAPI } from '../../../api/apiClient'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../../context/ThemeContext'
import Logo from "../../../assets/MziuriLogo.svg"

const feedback = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [selectedCourseName, setSelectedCourseName] = useState(null)
  const { t } = useTranslation()
  const { theme } = useTheme()
  const styles = makeStyles(theme)

  const loadUserCourses = useCallback(async () => {
    try {
      const response = await userAPI.getCurrentUserProfile()
      const user = response.user

      if (!user || !user.courses) { setCourses([]); return }

      const allCourses = []

      if (user.courses.active && user.courses.active.name) {
        const active = user.courses.active
        allCourses.push({
          courseName: active.name,
          focusArea: active.duration,
          teacher: Array.isArray(active.teachersName) ? active.teachersName.join(', ') : active.teachersName || '',
          isActive: true,
        })
      }

      if (user.courses.passed && user.courses.passed.length > 0) {
        user.courses.passed.forEach(course => {
          if (course && course.name) {
            allCourses.push({
              courseName: course.name,
              focusArea: course.duration,
              teacher: Array.isArray(course.teachersName) ? course.teachersName.join(', ') : course.teachersName || '',
              isActive: false,
            })
          }
        })
      }

      setCourses(allCourses)
    } catch (error) {
      console.error('Error loading courses:', error)
      setCourses([])
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => { loadUserCourses() }, [loadUserCourses])

  const onRefresh = useCallback(() => { setRefreshing(true); loadUserCourses() }, [loadUserCourses])

  const handleFeedbackPress = (courseName) => { setSelectedCourseName(courseName); setShowFeedbackForm(true) }
  const handleCloseFeedbackForm = () => { setShowFeedbackForm(false); setSelectedCourseName(null) }

  if (loading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.primary} />
      </SafeAreaView>
    )
  }

  if (courses.length === 0) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ScrollView
          contentContainerStyle={styles.centerContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <Logo style={styles.logo} />
          <Text style={styles.emptyText}>{t('common.error')}</Text>
          <Text style={styles.emptySubtext}>{t('feedback.subtitle')}</Text>
        </ScrollView>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Image style={styles.logo} source={require('../../../assets/mziuri-logo.png')} />
        <CourseLister data={courses} onFeedbackPress={handleFeedbackPress} />
        <Logo style={styles.logo} />
        <CourseLister
          data={courses}
          onFeedbackPress={handleFeedbackPress}
        />
      </ScrollView>

      <Modal visible={showFeedbackForm} animationType="slide" onRequestClose={handleCloseFeedbackForm}>
        <FeedbackForm courseName={selectedCourseName} onClose={handleCloseFeedbackForm} />
      </Modal>
    </SafeAreaView>
  )
}

const makeStyles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 100 },
  centerContainer: { flex: 1, backgroundColor: theme.background },
  centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 50 },
  emptyText: { fontSize: 18, fontWeight: '600', color: theme.text, marginBottom: 8 },
  emptySubtext: { fontSize: 14, color: theme.subtext, textAlign: 'center' },
  logo: { width: 180, height: 80, marginTop: 16, resizeMode: 'contain', alignSelf: 'center' },
})

export default feedback