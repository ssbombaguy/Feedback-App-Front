import { useQuery } from '@tanstack/react-query'
import { userAPI } from './apiClient'
import { useAuth } from '../context/AuthContext'

export const useCurrentUserProfile = () => {
  const { user } = useAuth()

  const query = useQuery({
    queryKey: ['currentUserProfile'],
    queryFn: userAPI.getCurrentUserProfile,
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
  return {
    userProfile: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  }
}