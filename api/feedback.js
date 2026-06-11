import axiosInstance from "./apiClient";

export const feedbackAPI = {
  submit: async (feedbackData) => {
    const response = await axiosInstance.post(`/feedbacks`, feedbackData);
    return response.data;
  },
  update: async (feedbackId, feedbackData) => {
    const response = await axiosInstance.put(
      `/feedbacks/${feedbackId}`,
      feedbackData
    );
    return response.data;
  },
  getUserFeedback: async () => {
    const response = await axiosInstance.get(`user/feedbacks`);
    return response.data;
  },
};
