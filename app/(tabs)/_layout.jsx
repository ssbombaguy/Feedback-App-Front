import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#E0E0E0',
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
          alignItems: 'center',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 2,
        },
        tabBarActiveTintColor: '#243d4d',
        tabBarInactiveTintColor: '#999',
        tabBarIconStyle: {
          marginBottom: 0,
        },
      }}
    >
        <Tabs.Screen
            name="(feedback)" 
            options={{
              title: "Feedback",
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="feedback" size={size} color={color} />
              ),
              headerShown: false,
            }}
        />
        <Tabs.Screen
            name="profile"      
            options={{
              title: "Profile",
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="person" size={size} color={color} />
              ),
              headerShown: false,
            }}
        />
    </Tabs>
  )
}

export default TabsLayout