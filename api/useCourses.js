import { useQuery } from '@tanstack/react-query'
import { coursesAPI } from './apiClient'
import { useAuth } from '../context/AuthContext'

export const useCourses = () => {
  const { user } = useAuth()

  const query = useQuery({
    queryKey: ['courses'],
    queryFn: coursesAPI.getAllCourses,
    enabled: !!user,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  })
  return {
    courses: query.data?.all_enrolled_groups || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  }
}

export const useEnrolledCourses = () => {
  const { user } = useAuth()

  const query = useQuery({
    queryKey: ['enrolledCourses'],
    queryFn: coursesAPI.getAllCourses,
    enabled: !!user,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  })
  return {
    enrolledCourses: query.data?.all_enrolled_groups || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  }
}

export const useSingleCourse = (courseId) => {
  const { user } = useAuth()

  const query = useQuery({
    queryKey: ['course', courseId],
    queryFn: () => coursesAPI.getSingleCourse(courseId),
    enabled: !!user && !!courseId,
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