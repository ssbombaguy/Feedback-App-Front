import { makeStyles } from "./CourseSection.styles";
import { View, Text, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { ProfileCourseCard } from "./CourseCard";
import { useTheme } from "../../context/ThemeContext";
import { CollapsibleSection } from "../ui/CollapsibleSection";
export const CoursesSection = ({ courses }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = makeStyles(theme);

  const passed = (courses || []).filter((e) => !e.is_active);

  return (
    <>
      {passed.length > 0 && (
        <CollapsibleSection
          title={`${t("profile.completedCourses")} (${passed.length})`}
          containerStyle={styles.section}
        >
          <ScrollView
            style={{ maxHeight: 350 }}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
          >
            {passed.map((enrollment, index) => (
              <ProfileCourseCard
                key={index}
                course={enrollment.course}
                isActive={false}
              />
            ))}
          </ScrollView>
        </CollapsibleSection>
      )}
    </>
  );
};
