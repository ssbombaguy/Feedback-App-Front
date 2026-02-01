import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const feedbackLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitle: '',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: '#F8F9FA',
        },
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  )
}

export default feedbackLayout