import { View, Text, StyleSheet, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import CourseLister from '../../../components/courseLister'
import { FeedbackForm } from '../../../components/FeedbackForm'
import { getUser } from '../../../utils/AsyncStorage'
import { useTranslation } from 'react-i18next'

const feedback = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [selectedCourseName, setSelectedCourseName] = useState(null)
  const { t } = useTranslation()

  useEffect(() => {
    loadUserCourses()
  }, [])

  const loadUserCourses = async () => {
    try {
      const user = await getUser()
      
      if (!user || !user.courses) {
        setCourses([])
        return
      }

      const allCourses = []
      
      if (user.courses.active) {
        allCourses.push({
          ...user.courses.active,
          isActive: true,
        })
      }
      
      if (user.courses.passed && user.courses.passed.length > 0) {
        user.courses.passed.forEach(course => {
          allCourses.push({
            ...course,
            isActive: false,
          })
        })
      }

      setCourses(allCourses)
    } catch (error) {
      console.error('Error loading courses:', error)
      setCourses([])
    } finally {
      setLoading(false)
    }
  }

  const handleFeedbackPress = (courseName) => {
    setSelectedCourseName(courseName)
    setShowFeedbackForm(true)
  }

  const handleCloseFeedbackForm = () => {
    setShowFeedbackForm(false)
    setSelectedCourseName(null)
  }

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text>{t('common.loading')}</Text>
      </View>
    )
  }

  if (courses.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>{t('common.error')}</Text>
        <Text style={styles.emptySubtext}>
          {t('feedback.subtitle')}
        </Text>
      </View>
    )
  }

  return (
    <>
      <CourseLister data={courses} onFeedbackPress={handleFeedbackPress} />
      <Modal
        visible={showFeedbackForm}
        animationType="slide"
        onRequestClose={handleCloseFeedbackForm}
      >
        <FeedbackForm 
          courseName={selectedCourseName} 
          onClose={handleCloseFeedbackForm} 
        />
      </Modal>
    </>
  )
}   


const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#546E7A',
    textAlign: 'center',
  },
})

export default feedback