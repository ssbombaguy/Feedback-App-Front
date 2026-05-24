import { StyleSheet } from "react-native";

export const makeStyles = (theme) =>
  StyleSheet.create({
    section: {
      width: "100%",
      backgroundColor: theme.sectionBg,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.textSecondary,
      marginBottom: 12,
    },
    coursesScroll: { maxHeight: 350 },
  });
