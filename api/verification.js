import axiosInstance from "./apiClient";

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
