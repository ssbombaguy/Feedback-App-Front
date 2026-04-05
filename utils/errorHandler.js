

export const getErrorMessage = (error) => {
  if (!error.response) {
    if (error.code === "ECONNABORTED") {
      return {
        title: "Timeout Error",
        message: "The request took too long. Please check your connection and try again.",
        code: "TIMEOUT",
      };
    }
    if (error.message === "Network Error") {
      return {
        title: "Network Error",
        message: "Unable to connect to the server. Please check your internet connection.",
        code: "NETWORK_ERROR",
      };
    }
  }

  const status = error.response?.status;
  const data = error.response?.data;

  switch (status) {
    case 401:
      return {
        title: "Unauthorized",
        message: "Your session has expired. Please log in again.",
        code: "UNAUTHORIZED",
      };
    case 403:
      return {
        title: "Access Denied",
        message: "You don't have permission to access this resource.",
        code: "FORBIDDEN",
      };
    case 404:
      return {
        title: "Not Found",
        message: "The requested resource was not found.",
        code: "NOT_FOUND",
      };
    case 500:
      return {
        title: "Server Error",
        message: "Something went wrong on the server. Please try again later.",
        code: "SERVER_ERROR",
      };
    case 503:
      return {
        title: "Service Unavailable",
        message: "The server is temporarily unavailable. Please try again later.",
        code: "SERVICE_UNAVAILABLE",
      };
    default:
      return {
        title: data?.message || "Error",
        message:
          data?.details ||
          error.message ||
          "An unexpected error occurred. Please try again.",
        code: "UNKNOWN_ERROR",
        status: status,
      };
  }
};


export const isUnauthorizedError = (error) => {
  return error.response?.status === 401;
};


export const isNetworkError = (error) => {
  return !error.response || error.code === "ECONNABORTED";
};


export const isServerError = (error) => {
  const status = error.response?.status;
  return status >= 500 && status < 600;
};
