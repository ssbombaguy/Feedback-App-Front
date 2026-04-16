import React, { createContext, useContext, useEffect, useState } from 'react'
import { getUser, logout as logoutStorage, getToken } from '../utils/AsyncStorage'
import { authAPI } from '../api/apiClient'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const userData = await getUser()
        const storedToken = await getToken()
        
        if (userData && storedToken) {
          setUser(userData)
          setToken(storedToken)
        }
      } catch (e) {
        console.error('Failed to restore session:', e)
      } finally {
        setIsLoading(false)
      }
    }

    bootstrapAsync()
  }, [])

 const login = async (email, password, rememberMe = false) => {
  try {
    const response = await authAPI.login(email, password, rememberMe)
    if (response.token) {
      setUser(response.user)
      setToken(response.token)
      return response
    }
  } catch (error) {
    console.error('Login failed:', error)
    throw error
  }
}

  const authContext = {
    user,
    token,
    isLoading,
    setUser,
    login,
    logout: async () => {
      setUser(null)
      setToken(null)
      await logoutStorage()
    },
  }

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
