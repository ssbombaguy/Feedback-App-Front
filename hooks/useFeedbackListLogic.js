import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { showSuccessToast } from "../utils/toastUtils";
import { useCurrentUserProfile } from "./useUser";
import { useFeedback } from "./useFeedback";

export const useFeedbackListLogic = () => {
  const { t } = useTranslation();

  const [refreshing, setRefreshing] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [selectedCourseName, setSelectedCourseName] = useState(null);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [showChangeConfirm, setShowChangeConfirm] = useState(false);
  const [pendingFeedbackPress, setPendingFeedbackPress] = useState(null);

  const {
    userProfile,
    isLoading: isProfileLoading,
    isError: isProfileError,
    error: profileError,
    refetch: refetchProfile,
  } = useCurrentUserProfile();

  const {
    feedback: userFeedback,
    isLoading: isFeedbackLoading,
    isError: isFeedbackError,
    error: feedbackError,
    refetch: refetchFeedback,
  } = useFeedback();

  const isLoading = isProfileLoading || isFeedbackLoading;
  const isError = isProfileError || isFeedbackError;
  const rawError = profileError || feedbackError;

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([refetchProfile(), refetchFeedback()]);
    setRefreshing(false);
  }, [refetchProfile, refetchFeedback]);

  const handleFeedbackPress = (courseName, groupId, existingFeedback) => {
    if (existingFeedback) {
      setPendingFeedbackPress({ courseName, groupId, existingFeedback });
      setShowChangeConfirm(true);
    } else {
      setSelectedCourseName(courseName);
      setSelectedGroupId(groupId);
      setSelectedFeedback(null);
      setShowFeedbackForm(true);
    }
  };

  const handleCloseFeedbackForm = (success = false) => {
    setShowFeedbackForm(false);
    setSelectedCourseName(null);
    setSelectedGroupId(null);
    setSelectedFeedback(null);
    if (success === true) {
      showSuccessToast(t("common.success"), t("feedback.thankYou"));
    }
  };

  const getCoursesWithFeedback = () => {
    const fbMap = {};
    if (Array.isArray(userFeedback)) {
      userFeedback.forEach((fb) => {
        fbMap[fb.group_id] = fb;
      });
    }

    return (userProfile?.all_enrolled_groups || [])
      .filter((enrollment) => enrollment.course_id != null)
      .map((enrollment) => {
        const course = enrollment.course;
        const groupId = course?.groups?.[0]?.id;
        return {
          courseName: course?.course_name || "Unknown",
          focusArea: course?.focus_area || "",
          teacher: course?.groups?.[0]?.teachers?.[0]?.fullName || "",
          isActive: enrollment.is_active,
          groupId,
          feedback: fbMap[groupId] || null,
        };
      });
  };

  return {
    state: {
      refreshing,
      selectedFeedback,
      showFeedbackForm,
      selectedCourseName,
      selectedGroupId,
      showChangeConfirm,
      pendingFeedbackPress,
      isLoading,
      isError,
      rawError,
      courses: getCoursesWithFeedback(),
    },
    setters: {
      setShowChangeConfirm,
      setSelectedCourseName,
      setSelectedGroupId,
      setSelectedFeedback,
      setShowFeedbackForm,
      setPendingFeedbackPress,
    },
    handlers: {
      onRefresh,
      handleFeedbackPress,
      handleCloseFeedbackForm,
    },
  };
};
