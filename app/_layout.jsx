import { Stack, router } from "expo-router"
import { useEffect, useState } from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { AuthProvider, useAuth } from "../context/AuthContext"
import { QueryProvider } from "../context/QueryProvider"
import { I18nextProvider } from 'react-i18next'
import i18n, { getStoredLanguage } from '../i18n/index'
import '../i18n/index'

function RootLayoutContent() {
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.replace("/(tabs)/(feedback)")
      } else {
        router.replace("/auth")
      }
    }
  }, [user, isLoading])

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  )
}

export default function RootLayout() {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        const language = await getStoredLanguage()
        await i18n.changeLanguage(language)
      } catch (error) {
        console.error('Failed to initialize language', error)
      } finally {
        setIsInitialized(true)
      }
    }

    initializeLanguage()
  }, [])

  if (!isInitialized) {
    return null
  }

  return (
    <I18nextProvider i18n={i18n}>
      <QueryProvider>
        <AuthProvider>
          <RootLayoutContent />
        </AuthProvider>
      </QueryProvider>
    </I18nextProvider>
  )
}
