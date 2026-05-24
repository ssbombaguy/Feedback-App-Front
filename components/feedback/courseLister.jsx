import { View, Text } from "react-native";
import React from "react";
import { CourseCard } from "./CourseCard";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";
import { makeStyles } from "./courseLister.styles";

const CourseLister = ({ data, onFeedbackPress }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = makeStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t("feedback.title")}</Text>
        <Text style={styles.subtitle}>{t("feedback.subtitle")}</Text>
      </View>
      {data.map((item, index) => (
        <CourseCard
          key={`${item.courseName}-${index}`}
          courseName={item.courseName}
          focusArea={item.focusArea}
          teacher={item.teacher}
          isActive={item.isActive}
          groupId={item.groupId}
          onFeedbackPress={onFeedbackPress}
        />
      ))}
    </View>
  );
};

export default CourseLister;
