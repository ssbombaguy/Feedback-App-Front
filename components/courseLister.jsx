import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { CourseCard } from './courseCard'

const CourseLister = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Available Courses</Text>
        <Text style={styles.subtitle}>Choose a course to get started</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.courseName}
        renderItem={({ item }) => (
          <CourseCard
            name={item.courseName}
            duration={item.duration}
            difficulty={item.difficulty}
            focusArea={item.focusArea}
          />
        )}
        scrollEnabled={true}
        contentContainerStyle={styles.listContent}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#fff',
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