import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { coursesAPI } from './apiClient'

export const useCourses = () => {
  const queryClient = useQueryClient()

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

export const useCreateCourse = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (courseData) => coursesAPI.createCourse(courseData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] })
    },
  })

  return {
    createCourse: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  }
}

export const useUpdateCourse = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: ({ courseId, courseData }) =>
      coursesAPI.updateCourse(courseId, courseData),
    onSuccess: (_, { courseId }) => {
      queryClient.invalidateQueries({ queryKey: ['courses'] })
      queryClient.invalidateQueries({ queryKey: ['course', courseId] })
    },
  })

  return {
    updateCourse: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  }
}

export const useDeleteCourse = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (courseId) => coursesAPI.deleteCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] })
    },
  })

  return {
    deleteCourse: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  }
}
