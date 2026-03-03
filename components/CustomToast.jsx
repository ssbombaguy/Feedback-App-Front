import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '../context/ThemeContext'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

export const CustomToast = ({ type, text1, text2 }) => {
  const { theme } = useTheme()
  const styles = makeStyles(theme)

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
      case 'error':
        return <MaterialIcons name="error" size={24} color={theme.error} />
      case 'info':
        return <MaterialIcons name="info" size={24} color={theme.primary} />
      default:
        return null
    }
  }

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return '#E8F5E9'
      case 'error':
        return theme.errorBg
      case 'info':
        return theme.card
      default:
        return theme.card
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
      <View style={styles.iconContainer}>{getIcon()}</View>
      <View style={styles.textContainer}>
        {text1 && <Text style={styles.title}>{text1}</Text>}
        {text2 && <Text style={styles.message}>{text2}</Text>}
      </View>
    </View>
  )
}

const makeStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 14,
      marginHorizontal: 16,
      marginVertical: 8,
      borderRadius: 12,
      borderLeftWidth: 4,
      borderLeftColor: '#4CAF50',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    iconContainer: {
      marginRight: 12,
    },
    textContainer: {
      flex: 1,
    },
    title: {
      fontSize: 15,
      fontWeight: '700',
      color: theme.textSecondary,
      marginBottom: 2,
    },
    message: {
      fontSize: 13,
      color: theme.subtext,
      fontWeight: '500',
    },
  })