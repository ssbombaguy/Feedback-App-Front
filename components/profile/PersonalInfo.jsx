import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../context/ThemeContext'

const InfoRow = ({ icon, label, value, isLast = false, onPress }) => {
  const { theme } = useTheme();
  const styles = makeStyles(theme);

  const content = (
    <View style={[styles.infoRow, isLast && { borderBottomWidth: 0 }]}>
      <MaterialCommunityIcons name={icon} size={20} color="#243d4d" style={styles.icon} />
      <View style={styles.infoTextContainer}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={[styles.infoValue, onPress && styles.linkValue]}>
          {value || 'N/A'}
        </Text>
      </View>
      {onPress && value ? (
        <MaterialCommunityIcons name="open-in-new" size={16} color="#243d4d" style={styles.linkIcon} />
      ) : null}
    </View>
  );

  if (onPress && value) {
    return <TouchableOpacity onPress={onPress} activeOpacity={0.7}>{content}</TouchableOpacity>;
  }
  return content;
};

export const PersonalInfo = ({ user }) => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const styles = makeStyles(theme)

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{t('profile.personalInfo')}</Text>

      <InfoRow icon="email-outline"      label={t('profile.email')}         value={user?.email} />
      <InfoRow icon="phone"              label={t('profile.phone')}         value={user?.phoneNumber} />
      <InfoRow icon="card-account-details" label={t('profile.privateNumber')} value={user?.personalNumber} />
      <InfoRow icon="map-marker"         label={t('profile.town')}          value={user?.city} />
      <InfoRow icon="school"             label={t('profile.school')}        value={user?.school} />
      <InfoRow icon="google-classroom"   label={t('profile.grade')}         value={user?.grade} />
      <InfoRow
        icon="linkedin"
        label={t('profile.linkedin')}
        value={user?.linkedinUrl}
        onPress={() => user?.linkedinUrl && Linking.openURL(user.linkedinUrl)}
      />
      <InfoRow
        icon="github"
        label={t('profile.github')}
        value={user?.githubUrl}
        onPress={() => user?.githubUrl && Linking.openURL(user.githubUrl)}
        isLast
      />
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
  icon: { marginRight: 12, marginTop: 2 },
  linkIcon: { marginTop: 2, opacity: 0.6 },
  infoTextContainer: { flex: 1 },
  infoLabel: { fontSize: 12, color: theme.label, marginBottom: 2, fontWeight: '600' },
  infoValue: { fontSize: 14, fontWeight: '600', color: theme.textSecondary },
  linkValue: { color: '#243d4d', textDecorationLine: 'underline' },
})