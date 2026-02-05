import { View, Text, FlatList, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { CourseCard } from './courseCard'
import { useTranslation } from 'react-i18next'

const CourseLister = ({ data, onFeedbackPress }) => {
  const { t } = useTranslation()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('feedback.title')}</Text>
        <Text style={styles.subtitle}>{t('feedback.subtitle')}</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.courseName}-${index}`}
        renderItem={({ item }) => (
          <CourseCard
            courseName={item.courseName}
            focusArea={item.focusArea}
            teacher={item.teacher}
            isActive={item.isActive}
            onFeedbackPress={onFeedbackPress}
          />
        )}
        scrollEnabled={true}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: { 
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
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
    alignSelf: 'center'
  },
  listContent: {
    paddingVertical: 8,
  },
})

export default CourseLister