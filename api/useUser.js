import { useQuery } from '@tanstack/react-query'
import { userAPI } from './apiClient'

export const useCurrentUserProfile = () => {
  const query = useQuery({
    queryKey: ['currentUserProfile'],
    queryFn: userAPI.getCurrentUserProfile,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
  return {
    userProfile: query.data?.user,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  }
}