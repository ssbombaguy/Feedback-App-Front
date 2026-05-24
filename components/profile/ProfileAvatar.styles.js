import { StyleSheet } from "react-native";

export const makeStyles = (theme) =>
  StyleSheet.create({
    avatarContainer: {
      alignItems: "center",
      marginVertical: 24,
    },
    avatarWrapper: {
      position: "relative",
      borderRadius: 45,
      width: 90,
      height: 90,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.avatarBg || "#f0f0f0",
      borderWidth: 1,
      borderColor: theme.border,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    avatarImage: {
      width: 90,
      height: 90,
      borderRadius: 45,
    },
    editOverlay: {
      position: "absolute",
      bottom: 0,
      right: 0,
      backgroundColor: theme.accent || "#243d4d",
      borderRadius: 12,
      width: 24,
      height: 24,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: "#fff",
    },
    avatarName: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.text,
      marginTop: 12,
    },
    avatarEmail: {
      fontSize: 13,
      color: theme.subtext,
      marginTop: 2,
    },
  });
