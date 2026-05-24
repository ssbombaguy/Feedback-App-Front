import { StyleSheet } from "react-native";

export const makeStyles = (theme) =>
  StyleSheet.create({
    courseCard: {
      backgroundColor: theme.cardAlt,
      borderLeftWidth: 4,
      borderLeftColor: theme.border,
      padding: 12,
      borderRadius: 8,
      marginBottom: 12,
    },
    activeCourseCard: { borderLeftColor: theme.success },
    courseHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    courseName: {
      fontSize: 15,
      fontWeight: "700",
      color: theme.textSecondary,
      flex: 1,
    },
    activeBadge: {
      backgroundColor: "#4CAF50",
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 6,
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    activeBadgeText: { fontSize: 11, fontWeight: "600", color: "#fff" },
    courseContent: { gap: 8 },
    courseInfo: { flexDirection: "row", alignItems: "flex-start" },
    courseIcon: { marginRight: 10, marginTop: 2 },
    courseLabel: {
      fontSize: 11,
      color: theme.label,
      fontWeight: "600",
      marginBottom: 2,
    },
    courseValue: { fontSize: 13, fontWeight: "500", color: theme.subtext },
  });
