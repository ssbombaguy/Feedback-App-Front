import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
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
};

export const userAPI = {
  getCurrentUserProfile: async () => {
    const response = await axiosInstance.get("/user");
    return response.data;
  },
  updateProfile: async (profileData) => {
    const response = await axiosInstance.put("/user/profile", profileData);
    return response.data;
  },
  uploadPhoto: async (imageUri) => {
    const formData = new FormData();
    formData.append('photo', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });
    const response = await axiosInstance.post('/user/profile/photo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};

export const coursesAPI = {
  getAllCourses: async () => {
    const response = await axiosInstance.get("/user/courses");
    return response.data;
  },
  getSingleCourse: async (courseId) => {
    const response = await axiosInstance.get(`/courses/${courseId}`);
    return response.data;
  },
};

export const feedbackAPI = {
  submit: async (feedbackData) => {
    const response = await axiosInstance.post(`/feedbacks`, feedbackData);
    return response.data;
  },
  update: async (feedbackId, feedbackData) => {
    const response = await axiosInstance.put(`/feedbacks/${feedbackId}`, feedbackData);
    return response.data;
  },
  getUserFeedback: async () => {
    const response = await axiosInstance.get(`/feedbacks`);
    return response.data;
  },
};
export const notificationsAPI = {
  saveToken: async (token) => {
     console.log('platform being sent:', Platform.OS)
    const response = await axiosInstance.post('/notifications/token', {
      token,
      platform: Platform.OS,
    })
    return response.data
  },
}
export const verificationAPI = {
  sendPhoneCode: async (phone) => {
    const response = await axiosInstance.post("/verification/sms/send", {
      phone,
    });
    return response.data;
  },

  verifyPhoneCode: async (phone, smsCode) => {
    const response = await axiosInstance.post("/verification/sms/check-code", {
      phone,
      sms_code: smsCode,
    });
    return response.data;
  },

  sendEmailCode: async (email) => {
    const response = await axiosInstance.post("/verification/email/send", {
      email,
    });
    return response.data;
  },

  verifyEmailCode: async (email, emailCode) => {
    const response = await axiosInstance.post("/verification/email/check-code", {
      email,
      email_code: emailCode,
    });
    return response.data;
  },
};

export default {
  authAPI,
  userAPI,
  coursesAPI,
  feedbackAPI,
  axiosInstance,
  notificationsAPI,
  verificationAPI,
};