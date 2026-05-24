import { StyleSheet } from "react-native";

export const makeStyles = (theme) =>
  StyleSheet.create({
    profileHeader: {
      flexDirection: "row",
      width: "100%",
      backgroundColor: theme.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 20,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    profilePicture: {
      width: 90,
      height: 90,
      borderRadius: 45,
      marginRight: 16,
      backgroundColor: theme.disabled,
    },
    userBasicInfo: { flex: 1 },
    name: { fontSize: 18, fontWeight: "700", color: theme.textSecondary },
    lastname: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.subtext,
      marginBottom: 4,
    },
    email: { fontSize: 12, color: theme.label },
  });
