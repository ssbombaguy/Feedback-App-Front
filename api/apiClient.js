import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const API_BASE_URL =
  Platform.OS === "android"
    ? "http://192.168.88.85:3000/api"
    : "http://192.168.88.85:3000/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (email, password, rememberMe) => {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });

    if (response.data.token) {
      await AsyncStorage.setItem("authToken", response.data.token);
      await AsyncStorage.setItem("rememberMe", rememberMe ? "remembered" : "");
    }

    return response.data;
  },

  logout: async () => {
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("isLoggedIn");
  },
};

export const feedbackAPI = {
  submit: async (feedbackData) => {
    const response = await axiosInstance.post("/feedback", feedbackData);
    return response.data;
  },

  getUserFeedback: async (userId) => {
    const response = await axiosInstance.get(`/feedback/user/${userId}`);
    return response.data;
  },
};

export default {
  authAPI,
  feedbackAPI,
  axiosInstance,
};
