import AsyncStorage from "@react-native-async-storage/async-storage";

export const setLoggedIn = async (email) => {
  await AsyncStorage.setItem("isLoggedIn", "true");
  await AsyncStorage.setItem("userEmail", email);
};

export const logout = async () => {
  await AsyncStorage.removeItem("isLoggedIn");
  await AsyncStorage.removeItem("userEmail");
};

export const isLoggedIn = async () => {
  return await AsyncStorage.getItem("isLoggedIn");
};
