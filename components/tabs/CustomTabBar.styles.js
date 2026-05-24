import { StyleSheet } from "react-native";

export const makeStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      backgroundColor: theme.tabBar,
      marginHorizontal: 20,
      marginBottom: 20,
      borderRadius: 35,
      padding: 5,
      position: "absolute",
      bottom: 25,
      left: 0,
      right: 0,
    },
  });
