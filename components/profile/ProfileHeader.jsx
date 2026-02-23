import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

export const ProfileHeader = ({ user }) => (
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
  </View>
)

const styles = StyleSheet.create({
  profileHeader: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#fff',
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
    backgroundColor: '#e0e0e0',
  },
  userBasicInfo: { flex: 1 },
  name: { fontSize: 18, fontWeight: '700', color: '#243d4d' },
  lastname: { fontSize: 16, fontWeight: '600', color: '#555', marginBottom: 4 },
  email: { fontSize: 12, color: '#999' },
})