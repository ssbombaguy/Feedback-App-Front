import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import { Platform } from "react-native";

const TabsLayout = () => {
  return (
    <Tabs
      safeAreaInsets={{ bottom: 0 }}
      screenOptions={{
        tabBarShowLabel: false,
        headerStatusBarHeight: 0,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopColor: "#E0E0E0",
          borderTopWidth: 1,
          paddingBottom: Platform.OS === "android" ? 80 : 0,
          paddingTop: 8,
          height: 70,
          alignItems: "center",
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 2,
        },
        tabBarActiveTintColor: "#243d4d",
        tabBarInactiveTintColor: "#999",
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
  );
}

export default TabsLayout