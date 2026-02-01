import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import { saveLanguage } from '../i18n'
import { useCallback } from 'react'

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation()

  const changeLanguage = useCallback(async (lang) => {
    try {
      await i18n.changeLanguage(lang)
      await saveLanguage(lang)
    } catch (error) {
      console.error('Error changing language:', error)
    }
  }, [i18n])

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, i18n.language === 'en' && styles.activeButton]}
        onPress={() => changeLanguage('en')}
      >
        <Text style={[styles.buttonText, i18n.language === 'en' && styles.activeText]}>
          {t('common.en')}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.button, i18n.language === 'ka' && styles.activeButton]}
        onPress={() => changeLanguage('ka')}
      >
        <Text style={[styles.buttonText, i18n.language === 'ka' && styles.activeText]}>
          {t('common.ka')}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    padding: 4,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  activeButton: {
    backgroundColor: '#243d4d',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeText: {
    color: '#fff',
  },
})