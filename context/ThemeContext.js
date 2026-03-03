import React, { createContext, useContext } from 'react'
import { useColorScheme } from 'react-native'
import { lightTheme, darkTheme } from '../constants/Theme'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme()
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme
  const isDark = colorScheme === 'dark'

  return (
    <ThemeContext.Provider value={{ theme, isDark }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}