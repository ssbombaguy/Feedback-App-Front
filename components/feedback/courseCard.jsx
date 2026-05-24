import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useFeedback } from "../../hooks/useFeedback";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";
import { showErrorToast } from "../../utils/toastUtils";

export const CourseCard = ({
  courseName,
  focusArea,
  teacher,
  isActive,
  groupId,
  onFeedbackPress,
}) => {
  const { feedback } = useFeedback();
  const { t } = useTranslation();
  const { theme } = useTheme();
  import {} from "./courseCard.styles";

  const styles = makeStyles(theme);
  const existingFeedback = feedback.find((f) => f.group_id === groupId);
  const feedbackSubmitted = !!existingFeedback;

  const handleFeedbackButtonPress = () => {
    onFeedbackPress(courseName, groupId, existingFeedback);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.courseName}>{courseName}</Text>
        {isActive && (
          <View style={styles.activeBadge}>
            <Text style={styles.activeBadgeText}>{t("course.active")}</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>{t("course.duration")}:</Text>
          <Text style={styles.value}>{focusArea}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>{t("course.teacher")}:</Text>
          <Text style={styles.value}>{teacher}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleFeedbackButtonPress}
      >
        <Text style={styles.buttonText}>
          {feedbackSubmitted
            ? t("feedback.changeFeedback")
            : t("feedback.writeFeedback")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
