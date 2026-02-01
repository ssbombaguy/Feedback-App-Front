import AsyncStorage from "@react-native-async-storage/async-storage"
import { authAPI } from "../api/apiClient"

export const setLoggedIn = async (user) => {
  await AsyncStorage.setItem("isLoggedIn", "true")
  await AsyncStorage.setItem("user", JSON.stringify(user))
}

export const logout = async () => {
  await AsyncStorage.removeItem("isLoggedIn")
  await AsyncStorage.removeItem("user")
  await AsyncStorage.removeItem("authToken")
  await authAPI.logout()
}

export const getUser = async () => {
  const user = await AsyncStorage.getItem("user")
  return user ? JSON.parse(user) : null
}

export const isLoggedIn = async () => {
  return await AsyncStorage.getItem("isLoggedIn")
}

export const setUser = async (user) => {
  await AsyncStorage.setItem("user", JSON.stringify(user))
}

export const getToken = async () => {
  return await AsyncStorage.getItem("authToken")
}

