import { View, Text, StyleSheet, Modal, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import CourseLister from '../../../components/courseLister'
import { FeedbackForm } from '../../../components/FeedbackForm'
import { getUser } from '../../../utils/AsyncStorage'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'

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
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.centerContainer}>
          <Text>{t("common.loading")}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (courses.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.centerContainer}>
          <Image
            style={styles.logo}
            source={require("../../../assets/mziuri-logo.png")}
          />
          <Text style={styles.emptyText}>{t("common.error")}</Text>
          <Text style={styles.emptySubtext}>{t("feedback.subtitle")}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
      <SafeAreaView style={{ flex: 1 }}>
        <Image
          style={styles.logo}
          source={require("../../../assets/mziuri-logo.png")}
        />
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
      </SafeAreaView>
  );
}   


const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
    backgroundColor: "#F8F9FA",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#546E7A",
    textAlign: "center",
  },
  logo: {
    width: 180,
    height: 80,
    resizeMode: "contain",
    alignSelf: "center",
  },
});

export default feedback