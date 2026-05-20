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
import { useEffect, useState, useCallback } from "react";
import CourseLister from "../../../components/feedback/courseLister";
import { FeedbackForm } from "../../../components/feedback/FeedbackForm";
import { userAPI, coursesAPI,feedbackAPI} from "../../../api/apiClient";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../../assets/MziuriLogo.svg";
import { useTheme } from "../../../context/ThemeContext";
import { useAuth } from "../../../context/AuthContext";
import { showSuccessToast, showErrorToast } from "../../../utils/toastUtils";
import {
  getErrorMessage,
  isUnauthorizedError,
} from "../../../utils/errorHandler";
import { ConfirmationModal } from "../../../components/ConfirmationModal";

const feedback = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [error, setError] = useState(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [selectedCourseName, setSelectedCourseName] = useState(null);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [feedbackMap, setFeedbackMap] = useState({});
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { user, logout } = useAuth();
  const [showChangeConfirm, setShowChangeConfirm] = useState(false);
  const [pendingFeedbackPress, setPendingFeedbackPress] = useState(null);
  const styles = makeStyles(theme);

  const loadUserCourses = useCallback(async () => {
    try {
      setError(null);
      const [profileResponse, feedbackResponse] = await Promise.all([
        userAPI.getCurrentUserProfile(),
        feedbackAPI.getUserFeedback(),
      ]);

      // Map feedback by groupId
      const fbMap = {};
      if (Array.isArray(feedbackResponse)) {
        feedbackResponse.forEach((fb) => {
          fbMap[fb.group_id] = fb;
        });
      }
      setFeedbackMap(fbMap);

      const userData = profileResponse;

      if (!userData?.all_enrolled_groups?.length) {
        setCourses([]);
        return;
      }

      const allCourses = userData.all_enrolled_groups
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

      setCourses(allCourses);
    } catch (error) {
      console.error("Error loading courses:", error);
      const errorInfo = getErrorMessage(error);
      setError(errorInfo);
      showErrorToast(errorInfo.title, errorInfo.message);
      if (isUnauthorizedError(error)) {
        if (logout) {
          await logout();
        }
      }
      setCourses([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [logout]);
  useEffect(() => {
    if (user) {
      loadUserCourses();
    }
  }, [user, loadUserCourses]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadUserCourses();
  }, [loadUserCourses]);

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
  if (loading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#243d4d" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ScrollView
          contentContainerStyle={styles.centerContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Logo style={styles.logo} />
          <Text style={styles.errorTitle}>{error.title}</Text>
          <Text style={styles.errorMessage}>{error.message}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              setLoading(true);
              loadUserCourses();
            }}
          >
            <Text style={styles.retryButtonText}>
              {t("common.retry") || "Retry"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

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
      marginTop: 16,
      resizeMode: "contain",
      alignSelf: "center",
    },
  });

export default feedback;
