import {
  View,
  Text,
  Modal,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import { CustomButton } from "../../../components/ui/CustomButton";
import React from "react";
import CourseLister from "../../../components/feedback/CourseLister";
import { FeedbackForm } from "../../../components/feedback/FeedbackForm";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../../assets/MziuriLogo.svg";
import { useTheme } from "../../../context/ThemeContext";
import { getErrorMessage } from "../../../utils/errorHandler";
import { ConfirmationModal } from "../../../components/ui/ConfirmationModal";
import { makeStyles } from "./index.styles";

import { useFeedbackListLogic } from "../../../hooks/useFeedbackListLogic";

const feedback = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = makeStyles(theme);

  const { state, setters, handlers } = useFeedbackListLogic();
  
  const {
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
    courses,
  } = state;

  const {
    setShowChangeConfirm,
    setSelectedCourseName,
    setSelectedGroupId,
    setSelectedFeedback,
    setShowFeedbackForm,
    setPendingFeedbackPress,
  } = setters;

  const {
    onRefresh,
    handleFeedbackPress,
    handleCloseFeedbackForm,
  } = handlers;

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
          <CustomButton variant="custom" style={styles.retryButton} onPress={onRefresh}>
            <Text style={styles.retryButtonText}>
              {t("common.retry") || "Retry"}
            </Text>
          </CustomButton>
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

export default feedback;
