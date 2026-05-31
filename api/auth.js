import axiosInstance from "./apiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const authAPI = {
  login: async (email, password, rememberMe) => {
    const response = await axiosInstance.post("/login", {
      email,
      password,
    });

    if (response.data.token) {
      await AsyncStorage.setItem("authToken", response.data.token);
      await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
      await AsyncStorage.setItem("rememberMe", rememberMe ? "remembered" : "");
      await AsyncStorage.setItem("isLoggedIn", "true");
    }

    return response.data;
  },

  logout: async () => {
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("isLoggedIn");
  },

  forgotPassword: async (email) => {
    const response = await axiosInstance.post("/password/forgot", {
      email,
    });
    return response.data;
  },

  resetPassword: async (email, token, password, passwordConfirmation) => {
    const response = await axiosInstance.post("/password/reset", {
      email,
      token,
      password,
      password_confirmation: passwordConfirmation,
    });
    return response.data;
  },
};
