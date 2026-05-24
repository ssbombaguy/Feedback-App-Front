import { StyleSheet } from "react-native";

export const makeStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 14,
      marginHorizontal: 16,
      marginVertical: 8,
      borderRadius: 12,
      borderLeftWidth: 4,
      borderLeftColor: "#4CAF50",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    iconContainer: {
      marginRight: 12,
    },
    textContainer: {
      flex: 1,
    },
    title: {
      fontSize: 15,
      fontWeight: "700",
      color: theme.textSecondary,
      marginBottom: 2,
    },
    message: {
      fontSize: 13,
      color: theme.subtext,
      fontWeight: "500",
    },
  });
