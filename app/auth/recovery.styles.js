import { StyleSheet } from "react-native";
import { phoneWidth } from "../../constants/Dimensions";

export const makeStyles = (theme) =>
  StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.background },
    container: {
      flex: 1,
      justifyContent: "flex-start",
      padding: 24,
      paddingHorizontal: 50,
      width: phoneWidth,
    },
    backButton: { position: "absolute", top: 40, left: 24, zIndex: 10 },
    logo: {
      width: 220,
      height: 120,
      resizeMode: "contain",
      alignSelf: "center",
      marginBottom: 24,
    },
    background: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      zIndex: -50,
      alignSelf: "center",
    },
  });
