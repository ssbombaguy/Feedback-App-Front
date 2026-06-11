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
    textareaContainer: {
      borderWidth: 1,
      borderColor: theme.borderInput,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 12,
      backgroundColor: theme.inputBg,
      minHeight: 120,
    },
    textInput: {
      borderWidth: 0,
      backgroundColor: "transparent",
      paddingVertical: 0,
      paddingHorizontal: 0,
      fontSize: 14,
      color: theme.text,
      textAlignVertical: "top",
      height: "100%",
    },
    inputError: { borderColor: theme.error, backgroundColor: theme.errorBg },
    errorText: {
      color: theme.error,
      fontSize: 12,
      marginTop: 6,
      fontWeight: "600",
    },
  });
