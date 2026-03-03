import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useRouter } from 'expo-router'
import { useTheme } from '../../context/ThemeContext'

export const ProfileHeader = ({ user }) => {
  const router = useRouter()
  const { theme } = useTheme();
  const styles = makeStyles(theme);

  return (
    <View style={styles.profileHeader}>
      <Image
        style={styles.profilePicture}
        source={{ uri: user?.profilePicture || 'https://via.placeholder.com/150' }}
      />

      <View style={styles.userBasicInfo}>
        <Text style={styles.name}>{user?.name || ''}</Text>
        <Text style={styles.lastname}>{user?.lastname || ''}</Text>
        <Text style={styles.email}>{user?.email || ''}</Text>
      </View>

      <Pressable onPress={() => router.push('/profile/edit')}>
        <AntDesign name="edit" size={25} color="#243E4D" />
      </Pressable>
    </View>
  )
}
const makeStyles = (theme) =>
  StyleSheet.create({
    profileHeader: {
      flexDirection: 'row',
      width: '100%',
      backgroundColor: theme.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    profilePicture: {
      width: 90,
      height: 90,
      borderRadius: 45,
      marginRight: 16,
      backgroundColor: theme.disabled,
    },
    userBasicInfo: { flex: 1 },
    name: { fontSize: 18, fontWeight: '700', color: theme.textSecondary },
    lastname: { fontSize: 16, fontWeight: '600', color: theme.subtext, marginBottom: 4 },
    email: { fontSize: 12, color: theme.label },
  })
