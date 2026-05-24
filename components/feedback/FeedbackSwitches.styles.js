import { StyleSheet } from "react-native";

export const makeStyles = (theme) =>
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
