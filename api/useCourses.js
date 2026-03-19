import { useQuery } from '@tanstack/react-query'
import { coursesAPI } from './apiClient'

export const useCourses = () => {
  const query = useQuery({
    queryKey: ['courses'],
    queryFn: coursesAPI.getAllCourses,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  })
  return {
    courses: query.data?.courses || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  }
}

export const useEnrolledCourses = () => {
  const query = useQuery({
    queryKey: ['enrolledCourses'],
    queryFn: coursesAPI.getEnrolledCourses,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  })
  return {
    enrolledCourses: query.data?.enrolled_courses || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  }
}

export const useSingleCourse = (courseId) => {
  const query = useQuery({
    queryKey: ['course', courseId],
    queryFn: () => coursesAPI.getSingleCourse(courseId),
    enabled: !!courseId,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  })
  return {
    course: query.data?.course,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  }
}