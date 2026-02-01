import React, { createContext, useContext, useEffect, useState } from 'react'
import { getUser, logout as logoutStorage } from '../utils/AsyncStorage'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const userData = await getUser()
        setUser(userData)
      } catch (e) {
        console.error('Failed to restore token', e)
      } finally {
        setIsLoading(false)
      }
    }

    bootstrapAsync()
  }, [])

  const authContext = {
    user,
    isLoading,
    setUser,
    logout: async () => {
      setUser(null)
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
