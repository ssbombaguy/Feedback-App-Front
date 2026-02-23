import { useQuery } from '@tanstack/react-query'
import { userAPI } from './apiClient'

export const useUserByEmail = (email) => {
  const query = useQuery({
    queryKey: ['user', email],
    queryFn: () => userAPI.getUserByEmail(email),
    enabled: !!email,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })

  return {
    user: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  }
}

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

export const useUserById = (userId) => {
  const query = useQuery({
    queryKey: ['user', userId],
    queryFn: () => userAPI.getUserById(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })

  return {
    user: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  }
}
