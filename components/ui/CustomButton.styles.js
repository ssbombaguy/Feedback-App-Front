import { StyleSheet } from "react-native";

export const makeStyles = (theme) =>
  StyleSheet.create({
    button: {
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap: 8,
      width: "100%",
    },
    primaryButton: {
      backgroundColor: theme.primary || "#243d4d",
    },
    primaryText: {
      color: "#ffffff",
    },
    secondaryButton: {
      backgroundColor: "transparent",
      borderWidth: 1.5,
      borderColor: theme.borderLight || "#e0e0e0",
    },
    secondaryText: {
      color: theme.text,
    },
    dangerButton: {
      backgroundColor: theme.error || "#F44336",
    },
    dangerText: {
      color: "#ffffff",
    },
    disabledButton: {
      opacity: 0.6,
    },
    text: {
      fontSize: 16,
      fontWeight: "600",
      letterSpacing: 0.3,
    },
  });
