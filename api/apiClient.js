import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

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
    if (error.response?.status !== 404) {
      console.error("API Error:", error.response?.status, error.config?.url);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;