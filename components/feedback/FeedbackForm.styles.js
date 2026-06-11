import { StyleSheet } from "react-native";

export const makeStyles = (theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 12,
      backgroundColor: theme.card,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    title: { fontSize: 18, fontWeight: "700", color: theme.text, flex: 1 },
    closeButton: { padding: 8 },
    closeText: { fontSize: 24, color: theme.subtext, fontWeight: "600" },
    formContainer: { padding: 16 },
    buttonContainer: { gap: 12 },
    submitButton: {
      backgroundColor: theme.accent,
      paddingVertical: 14,
      paddingHorizontal: 16,
      borderRadius: 8,
      alignItems: "center",
      marginBottom: 8,
    },
    submitButtonDisabled: { opacity: 0.6 },
    submitButtonText: {
      color: theme.text,
      fontSize: 15,
      fontWeight: "700",
      letterSpacing: 0.5,
    },
    clearButton: {
      backgroundColor: theme.disabled,
      paddingVertical: 14,
      paddingHorizontal: 16,
      borderRadius: 8,
      alignItems: "center",
    },
    clearButtonText: { color: theme.text, fontSize: 15, fontWeight: "600" },
    spacer: { height: 40 },
  });
