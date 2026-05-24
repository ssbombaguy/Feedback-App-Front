import { StyleSheet } from "react-native";

export const makeStyles = (theme) =>
  StyleSheet.create({
    roundedImage: { marginBottom: 15, alignSelf: "center", marginTop: 80 },
    title: {
      fontSize: 30,
      fontWeight: "700",
      color: theme.textSecondary,
      marginBottom: 8,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 14,
      color: theme.hint,
      marginBottom: 24,
      textAlign: "center",
    },
    input: {
      borderWidth: 1,
      borderColor: theme.borderInput,
      borderRadius: 15,
      padding: 14,
      marginBottom: 6,
      fontSize: 16,
      color: theme.text,
      backgroundColor: theme.inputBg,
    },
    inputError: { borderColor: theme.error },
    error: { color: theme.error, marginBottom: 12, fontSize: 12 },
    button: {
      backgroundColor: theme.accent,
      padding: 16,
      borderRadius: 15,
      alignItems: "center",
      marginTop: 16,
    },
    buttonDisabled: { opacity: 0.7 },
    buttonText: { color: theme.textSecondary, fontSize: 17, fontWeight: "600" },
  });
