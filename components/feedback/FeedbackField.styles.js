import { StyleSheet } from "react-native";

export const makeStyles = (theme) =>
  StyleSheet.create({
    fieldContainer: { marginBottom: 20 },
    labelContainer: { flexDirection: "row", alignItems: "center" },
    label: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.text,
      marginBottom: 4,
    },
    required: { color: theme.error },
    hint: {
      fontSize: 12,
      fontStyle: "italic",
      color: theme.hint,
      marginBottom: 8,
    },
    textarea: {
      borderWidth: 1,
      borderColor: theme.borderInput,
      borderRadius: 8,
      padding: 12,
      fontSize: 14,
      color: theme.text,
      backgroundColor: theme.inputBg,
      minHeight: 100,
    },
    inputError: { borderColor: theme.error, backgroundColor: theme.errorBg },
    errorText: {
      color: theme.error,
      fontSize: 12,
      marginTop: 6,
      fontWeight: "600",
    },
  });
