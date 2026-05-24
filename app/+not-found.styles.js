import { StyleSheet } from "react-native";

export const makeStyles = (theme) =>
  StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.background },
    container: { flex: 1, backgroundColor: theme.background },
    header: {
      height: 80,
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 20,
      marginTop: 50,
    },
    logoSmall: { width: 100, height: 30, opacity: 0.7 },
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 40,
      marginTop: -80,
    },
    title: {
      fontSize: 100,
      fontWeight: "900",
      color: theme.text,
      letterSpacing: -5,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: "800",
      color: theme.text,
      textTransform: "uppercase",
      letterSpacing: 2,
      marginBottom: 8,
    },
    message: {
      fontSize: 15,
      color: theme.subtext,
      textAlign: "center",
      lineHeight: 22,
      marginBottom: 40,
    },
    button: {
      backgroundColor: theme.accent,
      paddingVertical: 18,
      width: "100%",
      borderRadius: 15,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 3,
    },
    buttonText: {
      color: theme.text,
      fontSize: 15,
      fontWeight: "bold",
      letterSpacing: 0.5,
    },
    secondaryButton: { marginTop: 25 },
    secondaryButtonText: {
      color: theme.subtext,
      fontSize: 14,
      fontWeight: "500",
      textDecorationLine: "underline",
    },
  });
