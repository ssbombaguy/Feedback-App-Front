import { StyleSheet } from "react-native";

export const makeStyles = (theme) =>
  StyleSheet.create({
    button: {
      flex: 1,
      paddingVertical: 12,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 25,
    },
    activeButton: { backgroundColor: theme.tabBarActive },
  });
