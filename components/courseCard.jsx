import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FeedbackForm } from './FeedbackForm'
import { hasFeedback } from '../utils/FeedbackStorage'

export const CourseCard = ({ name, duration, difficulty, focusArea }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)

  useEffect(() => {
    checkFeedbackStatus()
  }, [])

  const checkFeedbackStatus = async () => {
    const hasSubmitted = await hasFeedback(name)
    setFeedbackSubmitted(hasSubmitted)
  }

  const handleFeedbackButtonPress = () => {
    if (feedbackSubmitted) {
      Alert.alert(
        'Feedback Already Submitted',
        `You have already submitted feedback for ${name}. You can only submit feedback once per course.`
      )
    } else {
      setShowFeedbackForm(true)
    }
  }

  const handleFormClose = () => {
    setShowFeedbackForm(false)
    checkFeedbackStatus()
  }

  const getDifficultyColor = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'low':
      case 'beginner':
        return '#4CAF50'
      case 'moderate':
      case 'intermediate':
        return '#FF9800'
      case 'high':
      case 'very high':
        return '#F44336'
      default:
        return '#546E7A'
    }
  }

  return (
    <>
      <TouchableOpacity activeOpacity={0.7} style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.courseName}>{name}</Text>
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(difficulty) }]}>
            <Text style={styles.difficultyText}>{difficulty}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Duration:</Text>
            <Text style={styles.value}>{duration}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Focus Area:</Text>
            <Text style={styles.value}>{focusArea}</Text>
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
            {feedbackSubmitted ? '✓ Feedback Submitted' : 'Write a Feedback'}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <Modal
        visible={showFeedbackForm}
        animationType="slide"
        onRequestClose={handleFormClose}
      >
        <FeedbackForm 
          courseName={name} 
          onClose={handleFormClose} 
        />
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
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
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  difficultyText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
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
  },
  exploreButton: {
    backgroundColor: '#F9C94D',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
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
