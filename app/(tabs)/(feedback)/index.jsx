import {
  View,
  Text,
  StyleSheet,
  Modal,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React, { useState, useCallback } from "react";
import CourseLister from "../../../components/feedback/CourseLister";
import { FeedbackForm } from "../../../components/feedback/FeedbackForm";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../../assets/MziuriLogo.svg";
import { useTheme } from "../../../context/ThemeContext";
import { showSuccessToast } from "../../../utils/toastUtils";
import { getErrorMessage } from "../../../utils/errorHandler";
import { ConfirmationModal } from "../../../components/ConfirmationModal";
import { useCurrentUserProfile } from "../../../hooks/useUser";
import { useFeedback } from "../../../hooks/useFeedback";

const feedback = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = makeStyles(theme);

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

  if (isLoading && !refreshing) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#243d4d" />
      </SafeAreaView>
    );
  }

  if (isError) {
    const errorInfo = getErrorMessage(rawError);
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ScrollView
          contentContainerStyle={styles.centerContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Logo style={styles.logo} />
          <Text style={styles.errorTitle}>{errorInfo.title}</Text>
          <Text style={styles.errorMessage}>{errorInfo.message}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={onRefresh}
          >
            <Text style={styles.retryButtonText}>
              {t("common.retry") || "Retry"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const fbMap = {};
  if (Array.isArray(userFeedback)) {
    userFeedback.forEach((fb) => {
      fbMap[fb.group_id] = fb;
    });
  }

  const courses = (userProfile?.all_enrolled_groups || [])
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

  if (courses.length === 0) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ScrollView
          contentContainerStyle={styles.centerContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Logo style={styles.logo} />
          <Text style={styles.emptyText}>{t("common.error")}</Text>
          <Text style={styles.emptySubtext}>{t("feedback.subtitle")}</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Logo style={styles.logo} />
        <CourseLister data={courses} onFeedbackPress={handleFeedbackPress} />
      </ScrollView>

      <Modal
        visible={showFeedbackForm}
        animationType="slide"
        onRequestClose={handleCloseFeedbackForm}
      >
        <FeedbackForm
          courseName={selectedCourseName}
          groupId={selectedGroupId}
          existingFeedback={selectedFeedback}
          onClose={handleCloseFeedbackForm}
        />
      </Modal>
      <ConfirmationModal
        visible={showChangeConfirm}
        title={t("feedback.changeFeedback")}
        message={t("feedback.changeFeedbackMessage")}
        confirmText={t("common.yes")}
        cancelText={t("common.cancel")}
        onConfirm={() => {
          setShowChangeConfirm(false);
          setSelectedCourseName(pendingFeedbackPress.courseName);
          setSelectedGroupId(pendingFeedbackPress.groupId);
          setSelectedFeedback(pendingFeedbackPress.existingFeedback);
          setShowFeedbackForm(true);
          setPendingFeedbackPress(null);
        }}
        onCancel={() => {
          setShowChangeConfirm(false);
          setPendingFeedbackPress(null);
        }}
      />
    </SafeAreaView>
  );
};

const makeStyles = (theme) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.background },
    scrollView: { flex: 1 },
    scrollContent: { paddingBottom: 100 },
    centerContainer: { flex: 1, backgroundColor: theme.background },
    centerContent: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 50,
    },
    emptyText: {
      fontSize: 18,
      fontWeight: "600",
      color: theme.text,
      marginBottom: 8,
    },
    emptySubtext: { fontSize: 14, color: theme.subtext, textAlign: "center" },
    errorTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: theme.error || "#d32f2f",
      marginBottom: 12,
      textAlign: "center",
    },
    errorMessage: {
      fontSize: 14,
      color: theme.subtext,
      textAlign: "center",
      marginBottom: 24,
      lineHeight: 20,
    },
    retryButton: {
      backgroundColor: theme.primary || "#243d4d",
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 8,
      marginTop: 16,
    },
    retryButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
      textAlign: "center",
    },
    logo: {
      width: 180,
      height: 80,
      marginTop: 40,
      resizeMode: "contain",
      alignSelf: "center",
    },
  });

export default feedback;
