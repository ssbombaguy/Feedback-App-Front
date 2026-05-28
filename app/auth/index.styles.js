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
    topPart: { alignSelf: "center" },
    logo: {
      width: 220,
      height: 120,
      resizeMode: "contain",
      alignSelf: "center",
    },
    smallTitle: {
      fontSize: 20,
      fontWeight: "600",
      marginBottom: 24,
      textAlign: "center",
      color: theme.textSecondary,
    },
    bigTitle: {
      fontSize: 35,
      fontWeight: "700",
      marginBottom: 20,
      marginTop: 40,
      color: theme.textSecondary,
      textAlign: "center",
    },
    background: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      zIndex: -50,
      alignSelf: "center",
    },
  });
