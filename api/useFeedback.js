import { feedbackAPI } from './apiClient'
import { getUser } from '../utils/AsyncStorage'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const useFeedback = () => {
  const queryClient = useQueryClient()

  const fetchUserFeedback = async () => {
    const user = await getUser()
    if (!user || !user.id) {
      throw new Error('User not found')
    }
    const response = await feedbackAPI.getUserFeedback(user.id)
    return response.feedback || []
  }

  const query = useQuery({
    queryKey: ['userFeedback'],
    queryFn: fetchUserFeedback,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })

  const submitMutation = useMutation({
    mutationFn: async (feedbackData) => {
      console.log('useFeedback - Submitting:', feedbackData) 
      return await feedbackAPI.submit(feedbackData)
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
    isSubmitting: submitMutation.isPending,
    submitError: submitMutation.error,
    refetch: query.refetch,
  }
}