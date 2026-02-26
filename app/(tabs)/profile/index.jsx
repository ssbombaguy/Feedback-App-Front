import { useRouter } from 'expo-router'
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, RefreshControl } from 'react-native'
import { logout } from '../../../utils/AsyncStorage'
import { phoneWidth } from '../../../constants/Dimensions'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useEffect, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { ConfirmationModal } from '../../../components/ConfirmationModal'
import { SafeAreaView } from 'react-native-safe-area-context'
import { userAPI } from '../../../api/apiClient'
import { PersonalInfo } from '../../../components/profile/PersonalInfo'
import { CoursesSection } from '../../../components/profile/CourseSection'
import { ProfileHeader } from '../../../components/profile/ProfileHeader'
import Logo from "../../../assets/MziuriLogo.svg"

const profile = () => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { t } = useTranslation()

  const loadUser = useCallback(async () => {
    try {
      const response = await userAPI.getCurrentUserProfile()
      setUser(response.user)
    } catch (error) {
      console.error('Failed to load user:', error)
    } finally {
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    loadUser()
  }, [loadUser])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    loadUser()
  }, [loadUser])

  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
      router.replace('/auth')
    } catch (error) {
      console.error('Logout error:', error)
      alert(t('common.error'))
    } finally {
      setIsLoggingOut(false)
      setShowLogoutConfirm(false)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.scrollContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.container}>
          <Logo style={styles.logo}/>
          <View style={{ marginTop: 16, marginBottom: 16 }}>
            <LanguageSwitcher />
          </View>

          {user ? (
            <View style={{ alignItems: 'flex-start', width: '100%', marginTop: 30 }}>
              <ProfileHeader user={user} />
              <PersonalInfo user={user} />
              <CoursesSection courses={user.courses} />

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.logoutButton}
                  onPress={() => setShowLogoutConfirm(true)}
                >
                  <Ionicons name="log-out-outline" size={20} color="#243d4d" />
                  <Text style={styles.logoutText}>{t('profile.logout')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.container}>
              <Text style={styles.emptyText}>{t('profile.loading')}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <ConfirmationModal
        visible={showLogoutConfirm}
        title={t('profile.confirmLogout')}
        message={t('profile.confirmLogoutMessage')}
        confirmText={t('profile.yesLogout')}
        cancelText={t('common.cancel')}
        onConfirm={handleLogoutConfirm}
        onCancel={() => setShowLogoutConfirm(false)}
        isLoading={isLoggingOut}
        isDangerous={true}
      />
    </SafeAreaView>
  )
}

export default profile

const styles = StyleSheet.create({
  scrollContainer: { flex: 1, backgroundColor: '#f5f5f5' },
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
    width: phoneWidth,
    paddingBottom: 40,
  },
  logo: { width: 180, height: 80, alignSelf: 'center' },
  emptyText: { fontSize: 16, color: '#999', marginTop: 40 },
  buttonContainer: { width: '100%', marginTop: 12 },
  logoutButton: {
    backgroundColor: '#F9C94D',
    borderRadius: 10,
    padding: 14,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 50,
  },
  logoutText: { fontSize: 16, color: '#243d4d', fontWeight: '700' },
})
