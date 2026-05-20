import { useRouter } from 'expo-router'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import { logout } from '../../../utils/AsyncStorage'
import { phoneWidth } from '../../../constants/Dimensions'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18n, { saveLanguage } from '../../../i18n/index'
import { ConfirmationModal } from '../../../components/ConfirmationModal'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PersonalInfo } from '../../../components/profile/PersonalInfo'
import { CoursesSection } from '../../../components/profile/CourseSection'
import { ProfileHeader } from '../../../components/profile/ProfileHeader'
import Logo from "../../../assets/MziuriLogo.svg"
import { useTheme } from '../../../context/ThemeContext'
import { showErrorToast } from '../../../utils/toastUtils'
import { useCurrentUserProfile } from '../../../hooks/useUser'
import { SelectionModal } from '../../../components/profile/SelectionModal'

const profile = () => {
  const router = useRouter()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [showThemeModal, setShowThemeModal] = useState(false)
  const [showLangModal, setShowLangModal] = useState(false)
  
  const { t } = useTranslation()
  const { theme, themeMode, changeThemeMode } = useTheme()
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

  const themeOptions = [
    { value: 'light', label: t('profile.lightMode') },
    { value: 'dark', label: t('profile.darkMode') },
    { value: 'system', label: t('profile.systemMode') },
  ]

  const langOptions = [
    { value: 'en', label: 'English' },
    { value: 'ka', label: 'ქართული' },
  ]

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refetch} />}
      >
        <View style={styles.container}>
          <Logo style={styles.logo} />

          {userProfile ? (
            <View style={{ alignItems: 'flex-start', width: '100%', marginTop: 30 }}>
              <ProfileHeader user={userProfile} />
              <PersonalInfo user={userProfile} />
              <CoursesSection courses={userProfile.all_enrolled_groups} />

              {/* Display Settings Section */}
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{t('profile.displaySettings')}</Text>
              </View>

              <View style={styles.settingsCard}>
                {/* Theme row */}
                <TouchableOpacity 
                  style={styles.settingsRow} 
                  onPress={() => setShowThemeModal(true)}
                >
                  <View style={styles.settingsRowLeft}>
                    <View style={styles.iconContainer}>
                      <Ionicons 
                        name={themeMode === 'dark' ? "moon-outline" : themeMode === 'light' ? "sunny-outline" : "options-outline"} 
                        size={22} 
                        color="#059669" 
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.rowTitle}>{t('profile.theme')}</Text>
                      <Text style={styles.rowSubtitle}>
                        {themeMode === 'system' 
                          ? t('profile.systemMode') 
                          : themeMode === 'dark' 
                          ? t('profile.darkMode') 
                          : t('profile.lightMode')}
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={theme.subtext} />
                </TouchableOpacity>

                <View style={styles.rowDivider} />

                {/* Language row */}
                <TouchableOpacity 
                  style={styles.settingsRow} 
                  onPress={() => setShowLangModal(true)}
                >
                  <View style={styles.settingsRowLeft}>
                    <View style={styles.iconContainer}>
                      <Ionicons name="globe-outline" size={22} color="#059669" />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.rowTitle}>{t('profile.language')}</Text>
                      <Text style={styles.rowSubtitle}>
                        {i18n.language === 'ka' ? 'ქართული' : 'English'}
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={theme.subtext} />
                </TouchableOpacity>
              </View>

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

      <SelectionModal
        visible={showThemeModal}
        title={t('profile.selectTheme')}
        options={themeOptions}
        selectedValue={themeMode}
        onSelect={changeThemeMode}
        onClose={() => setShowThemeModal(false)}
        theme={theme}
      />

      <SelectionModal
        visible={showLangModal}
        title={t('profile.selectLanguage')}
        options={langOptions}
        selectedValue={i18n.language}
        onSelect={saveLanguage}
        onClose={() => setShowLangModal(false)}
        theme={theme}
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
    sectionHeader: {
      width: '100%',
      marginTop: 24,
      marginBottom: 8,
      alignItems: 'flex-start',
    },
    sectionTitle: {
      fontSize: 13,
      fontWeight: '700',
      color: theme.subtext || '#546E7A',
      textTransform: 'uppercase',
      letterSpacing: 1.2,
    },
    settingsCard: {
      width: '100%',
      backgroundColor: theme.card || '#ffffff',
      borderRadius: 12,
      paddingVertical: 4,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: theme.border || '#E0E0E0',
    },
    settingsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 14,
      paddingHorizontal: 16,
    },
    settingsRowLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 10,
      backgroundColor: 'rgba(5, 150, 105, 0.12)', 
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 14,
    },
    textContainer: {
      justifyContent: 'center',
    },
    rowTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text || '#2C3E50',
    },
    rowSubtitle: {
      fontSize: 13,
      color: theme.subtext || '#546E7A',
      marginTop: 2,
    },
    rowDivider: {
      height: 1,
      backgroundColor: theme.borderLight || '#f0f0f0',
      marginHorizontal: 16,
    },
  })