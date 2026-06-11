import { Platform } from "react-native";
import axiosInstance from "./apiClient";

export const notificationsAPI = {
  saveToken: async (token) => {
    const response = await axiosInstance.post("/notifications/token", {
      token,
      platform: Platform.OS,
    });
    return response.data;
  },
};
