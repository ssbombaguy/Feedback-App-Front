import { StyleSheet } from "react-native";

export const makeStyles = (theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.card,
      borderRadius: 12,
      padding: 16,
      marginHorizontal: 16,
      marginVertical: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 3,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    courseName: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.text,
      flex: 1,
      marginRight: 8,
    },
    activeBadge: {
      backgroundColor: theme.success,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 20,
    },
    activeBadgeText: { color: "#fff", fontSize: 11, fontWeight: "600" },
    content: { marginBottom: 12, gap: 6 },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 2,
    },
    label: { fontSize: 13, color: theme.subtext, fontWeight: "600" },
    value: {
      fontSize: 13,
      color: theme.text,
      fontWeight: "500",
      textAlign: "right",
      flex: 1,
      marginLeft: 8,
    },
    button: {
      backgroundColor: theme.accent,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 4,
    },
    buttonSubmitted: { backgroundColor: theme.success, opacity: 0.9 },
    buttonText: { color: theme.text, fontSize: 14, fontWeight: "700" },
  });
