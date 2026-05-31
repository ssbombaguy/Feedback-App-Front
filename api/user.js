import axiosInstance from "./apiClient";

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
