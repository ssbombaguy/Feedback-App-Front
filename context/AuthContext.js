import React, { createContext, useContext, useEffect, useState } from 'react'
import { getUser, logout as logoutStorage } from '../utils/AsyncStorage'
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
        
        if (userData) {
          try {
            const response = await authAPI.verifyToken()
            if (response.success) {
              setUser(response.user)
              setToken(true) 
            }
          } catch (error) {
            console.log('Token expired or invalid:', error.message)
            await logoutStorage()
            setUser(null)
            setToken(null)
          }
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
      if (response.success) {
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
      await authAPI.logout()
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
