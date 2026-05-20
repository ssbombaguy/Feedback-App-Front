import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

export const FeedbackSwitches = ({
  values,
  setFieldValue,
  isSubmitting,
  onReturnAsTeacherToggle,
  onAnonymousToggle,
  theme,
}) => {
  const { t } = useTranslation();
  const styles = makeStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>
          {t("feedback.returnAsTeacher")}
        </Text>
        <Switch
          value={values.wants_to_return_as_teacher}
          trackColor={{ false: "#E0E0E0", true: "#F9C94D" }}
          thumbColor={
            values.wants_to_return_as_teacher ? "#243d4d" : "#f4f3f4"
          }
          onValueChange={(value) =>
            onReturnAsTeacherToggle(value, setFieldValue, values)
          }
          disabled={isSubmitting}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>
          {t("feedback.submitAnonymously") || "Submit Anonymously"}
        </Text>
        <Switch
          value={values.is_anonymous}
          onValueChange={(value) =>
            onAnonymousToggle(value, setFieldValue, values)
          }
          trackColor={{ false: "#E0E0E0", true: "#F9C94D" }}
          thumbColor={values.is_anonymous ? "#243d4d" : "#f4f3f4"}
          disabled={isSubmitting}
        />
      </View>
    </View>
  );
};

const makeStyles = (theme) =>
  StyleSheet.create({
    container: {
      marginVertical: 12,
      gap: 12,
    },
    switchContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: theme.cardAlt || "#fcfcfc",
      padding: 14,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.border,
      gap: 12,
    },
    switchLabel: {
      flex: 1,
      fontSize: 14,
      fontWeight: "600",
      color: theme.textSecondary || "#333",
    },
  });
