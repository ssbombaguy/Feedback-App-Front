import { feedbackAPI } from './apiClient'
import { getUser } from '../utils/AsyncStorage'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../context/AuthContext'

export const useFeedback = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const fetchUserFeedback = async () => {
    const response = await feedbackAPI.getUserFeedback() 
    return Array.isArray(response) ? response : response ? [response] : []
  }

  const query = useQuery({
    queryKey: ['userFeedback'],
    queryFn: fetchUserFeedback,
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })

  const submitMutation = useMutation({
    mutationFn: async (feedbackData) => {
      return await feedbackAPI.submit(feedbackData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userFeedback'] })
    },
  })
  const updateMutation = useMutation({
  mutationFn: async ({ feedbackId, feedbackData }) => {
    return await feedbackAPI.update(feedbackId, feedbackData)
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['userFeedback'] })
  },
})

  return {
    feedback: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    submitFeedback: submitMutation.mutate,
    updateFeedback: updateMutation.mutate,
    isSubmitting: submitMutation.isPending,
    submitError: submitMutation.error,
    refetch: query.refetch,
  }
}