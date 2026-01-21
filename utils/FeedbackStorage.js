import AsyncStorage from "@react-native-async-storage/async-storage";

const FEEDBACK_PREFIX = "feedback_";

export const saveFeedback = async (courseName, feedbackData) => {
  try {
    const key = `${FEEDBACK_PREFIX}${courseName}`;
    const feedbackWithTimestamp = {
      ...feedbackData,
      submittedAt: new Date().toISOString(),
    };
    await AsyncStorage.setItem(key, JSON.stringify(feedbackWithTimestamp));
    return true;
  } catch (error) {
    console.error("Error saving feedback:", error);
    return false;
  }
};

export const getFeedback = async (courseName) => {
  try {
    const key = `${FEEDBACK_PREFIX}${courseName}`;
    const feedback = await AsyncStorage.getItem(key);
    return feedback ? JSON.parse(feedback) : null;
  } catch (error) {
    console.error("Error getting feedback:", error);
    return null;
  }
};

export const getAllFeedback = async () => {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const feedbackKeys = allKeys.filter((key) => key.startsWith(FEEDBACK_PREFIX));
    const feedback = await AsyncStorage.multiGet(feedbackKeys);
    return feedback.map(([key, value]) => ({
      course: key.replace(FEEDBACK_PREFIX, ""),
      data: JSON.parse(value),
    }));
  } catch (error) {
    console.error("Error getting all feedback:", error);
    return [];
  }
};

export const hasFeedback = async (courseName) => {
  try {
    const feedback = await getFeedback(courseName);
    return feedback !== null;
  } catch (error) {
    console.error("Error checking feedback:", error);
    return false;
  }
};

export const deleteFeedback = async (courseName) => {
  try {
    const key = `${FEEDBACK_PREFIX}${courseName}`;
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error("Error deleting feedback:", error);
    return false;
  }
};
