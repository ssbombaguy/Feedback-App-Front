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
      paddingBottom: 16,
    },
    editRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 6,
    },
    editLabel: {
      fontSize: 14,
      color: theme.label || "#666",
      fontWeight: "500",
      width: 80,
    },
    flatInput: {
      flex: 1,
      backgroundColor: "transparent",
      height: 40,
      fontSize: 14,
      textAlign: "right",
      paddingHorizontal: 0,
    },
    divider: {
      height: 1,
      backgroundColor: theme.border,
      marginVertical: 4,
    },
    errorText: {
      color: theme.error || "#ff1744",
      fontSize: 12,
      marginTop: -4,
      marginBottom: 8,
      textAlign: "right",
    },
    updateButton: {
      backgroundColor: theme.accent || "#243d4d",
      borderRadius: 8,
      paddingVertical: 14,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
    },
    disabled: {
      opacity: 0.7,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
  });
