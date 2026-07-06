import { StyleSheet } from "react-native";

export const makeStyles = (theme) =>
  StyleSheet.create({
    container: {
      marginBottom: 20,
      width: "100%",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 12,
      width: "100%",
    },
    title: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.textSecondary,
    },
    icon: {
      marginLeft: 10,
    },
    content: {
      marginTop: 10,
    },
  });
