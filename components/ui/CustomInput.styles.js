import { StyleSheet } from "react-native";

export const makeStyles = (theme) =>
  StyleSheet.create({
    wrapper: {
      width: "100%",
      marginBottom: 6,
    },
    label: {
      fontSize: 14,
      color: theme.text,
      marginBottom: 6,
      fontWeight: "500",
    },
    labelFlat: {
      color: theme.subtext,
      fontSize: 12,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      fontWeight: "600",
    },
    inputContainer: {
      position: "relative",
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
    },
    inputContainerBordered: {
      borderWidth: 1,
      borderColor: theme.borderInput || "#ddd",
      borderRadius: 15,
      backgroundColor: theme.inputBg || "#fff",
      paddingHorizontal: 14,
    },
    inputContainerFlat: {
      borderBottomWidth: 1,
      borderBottomColor: theme.borderLight || "#f0f0f0",
      backgroundColor: "transparent",
      paddingHorizontal: 0,
      paddingBottom: 4,
    },
    inputError: {
      borderColor: theme.error,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: theme.text,
      paddingVertical: 14,
    },
    inputFlat: {
      paddingVertical: 8,
      fontSize: 15,
    },
    passwordInput: {
      paddingRight: 40,
    },
    eyeIcon: {
      position: "absolute",
      right: 14,
      zIndex: 10,
      padding: 4,
    },
    errorText: {
      color: theme.error,
      marginTop: 4,
      marginBottom: 6,
      fontSize: 12,
      alignSelf: "flex-start",
    },
  });
