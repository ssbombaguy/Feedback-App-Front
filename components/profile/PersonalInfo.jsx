import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../context/ThemeContext'

const InfoRow = ({ icon, label, value, isLast = false }) => {
  const { theme } = useTheme();
  const styles = makeStyles(theme);
  return (
    <View style={[styles.infoRow, isLast && { borderBottomWidth: 0 }]}>
      <MaterialCommunityIcons name={icon} size={20} color="#243d4d" style={styles.icon} />
      <View style={styles.infoTextContainer}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value || 'N/A'}</Text>
      </View>
    </View>
  )
}

export const PersonalInfo = ({ user }) => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const styles = makeStyles(theme)
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{t('profile.personalInfo')}</Text>
      <InfoRow icon="phone" label={t('profile.phone')} value={user?.phoneNumber} />
      <InfoRow icon="card-account-details" label={t('profile.privateNumber')} value={user?.personalNumber} />
      <InfoRow icon="map-marker" label={t('profile.town')} value={user?.city} />
      <InfoRow icon="school" label={t('profile.grade')} value={user?.grade} isLast />
    </View>
  )
}

const makeStyles = (theme) => StyleSheet.create({
  section: {
    width: '100%',
    backgroundColor: theme.sectionBg,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: theme.textSecondary, marginBottom: 12 },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.borderLight,
  },
  infoRowLast: { borderBottomWidth: 0 },
  icon: { marginRight: 12, marginTop: 2 },
  infoTextContainer: { flex: 1 },
  infoLabel: { fontSize: 12, color: theme.label, marginBottom: 2, fontWeight: '600' },
  infoValue: { fontSize: 14, fontWeight: '600', color: theme.textSecondary },
})