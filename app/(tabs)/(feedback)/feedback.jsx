import { View, Text } from 'react-native'
import React from 'react'
import CourseLister from '../../../components/courseLister'
import { useCourse } from '../../../api/courses/useCourse'

const feedback = () => {
  const { courses, loading, error } = useCourse();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <CourseLister data={courses}/>
  )
}

export default feedback