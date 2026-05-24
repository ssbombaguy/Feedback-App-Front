import { StyleSheet } from "react-native";

export const makeStyles = (theme) =>
  StyleSheet.create({
    container: {
      width: "100%",
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.subtext,
      marginBottom: 8,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    card: {
      backgroundColor: theme.card,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.border,
      paddingHorizontal: 16,
    },
    cardRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    cardLabel: {
      fontSize: 14,
      color: theme.label || "#666",
      fontWeight: "500",
    },
    cardValue: {
      fontSize: 14,
      color: theme.textSecondary || "#333",
      fontWeight: "600",
      flex: 1,
      textAlign: "right",
      marginLeft: 16,
    },
  });
