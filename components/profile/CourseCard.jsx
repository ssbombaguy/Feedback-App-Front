import { View, Text } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";
import { makeStyles } from "./CourseCard.styles";

export const ProfileCourseCard = ({ course, isActive = false }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();


  const styles = makeStyles(theme);
  return (
    <View style={[styles.courseCard, isActive && styles.activeCourseCard]}>
      <View style={styles.courseHeader}>
        <Text style={styles.courseName}>{course.course_name}</Text>
        {isActive && (
          <View style={styles.activeBadge}>
            <Ionicons name="checkmark-circle" size={16} color="#fff" />
            <Text style={styles.activeBadgeText}>{t("profile.active")}</Text>
          </View>
        )}
      </View>
      <View style={styles.courseContent}>
        <View style={styles.courseInfo}>
          <MaterialCommunityIcons
            name="clock-outline"
            size={16}
            color="#243d4d"
            style={styles.courseIcon}
          />
          <View>
            <Text style={styles.courseLabel}>{t("course.duration")}</Text>
            <Text style={styles.courseValue}>{course.focus_area}</Text>
          </View>
        </View>
        <View style={styles.courseInfo}>
          <MaterialCommunityIcons
            name="human-greeting"
            size={16}
            color="#243d4d"
            style={styles.courseIcon}
          />
          <View>
            <Text style={styles.courseLabel}>{t("course.teacher")}</Text>
            <Text style={styles.courseValue}>{course.teacher || "N/A"}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
