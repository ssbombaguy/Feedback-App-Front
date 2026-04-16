import { useRouter } from 'expo-router'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import { logout } from '../../../utils/AsyncStorage'
import { phoneWidth } from '../../../constants/Dimensions'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { ConfirmationModal } from '../../../components/ConfirmationModal'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PersonalInfo } from '../../../components/profile/PersonalInfo'
import { CoursesSection } from '../../../components/profile/CourseSection'
import { ProfileHeader } from '../../../components/profile/ProfileHeader'
import Logo from "../../../assets/MziuriLogo.svg"
import { useTheme } from '../../../context/ThemeContext'
import { showErrorToast } from '../../../utils/toastUtils'
import { useCurrentUserProfile } from '../../../api/useUser'

const profile = () => {
  const router = useRouter()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { t } = useTranslation()
  const { theme } = useTheme()
  const styles = makeStyles(theme)

  const { userProfile, isLoading, refetch } = useCurrentUserProfile()
  const refreshing = isLoading

  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
      router.replace('/auth')
    } catch (error) {
      console.error('Logout error:', error)
      showErrorToast(t('common.error'), error.message)
    } finally {
      setIsLoggingOut(false)
      setShowLogoutConfirm(false)
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refetch} />}
      >
        <View style={styles.container}>
          <Logo style={styles.logo} />
          <View style={{ marginTop: 16, marginBottom: 16 }}>
            <LanguageSwitcher />
          </View>

          {userProfile ? (
            <View style={{ alignItems: 'flex-start', width: '100%', marginTop: 30 }}>
              <ProfileHeader user={userProfile} />
              <PersonalInfo user={userProfile} />
              <CoursesSection courses={userProfile.all_enrolled_groups} />

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

const makeStyles = (theme) =>
  StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.background },
    scrollContainer: { flex: 1, backgroundColor: theme.background },
    container: { alignItems: 'center', paddingHorizontal: 20, width: phoneWidth, paddingBottom: 100, marginTop: 40 },
    logo: { width: 180, height: 80, resizeMode: 'contain', alignSelf: 'center' },
    emptyText: { fontSize: 16, color: theme.label, marginTop: 40 },
    buttonContainer: { width: '100%', marginTop: 12 },
    logoutButton: {
      backgroundColor: theme.accent,
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
    logoutText: { fontSize: 16, color: theme.textSecondary, fontWeight: '700' },
  })