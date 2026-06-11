import { StyleSheet } from "react-native";

export const makeStyles = (theme) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.background },
    scrollView: { flex: 1 },
    scrollContent: { paddingBottom: 100 },
    centerContainer: { flex: 1, backgroundColor: theme.background },
    centerContent: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 50,
    },
    emptyText: {
      fontSize: 18,
      fontWeight: "600",
      color: theme.text,
      marginBottom: 8,
    },
    emptySubtext: { fontSize: 14, color: theme.subtext, textAlign: "center" },
    errorTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: theme.error || "#d32f2f",
      marginBottom: 12,
      textAlign: "center",
    },
    errorMessage: {
      fontSize: 14,
      color: theme.subtext,
      textAlign: "center",
      marginBottom: 24,
      lineHeight: 20,
    },
    retryButton: {
      backgroundColor: theme.primary || "#243d4d",
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 8,
      marginTop: 16,
    },
    retryButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
      textAlign: "center",
    },
    logo: {
      width: 180,
      height: 80,
      marginTop: 40,
      resizeMode: "contain",
      alignSelf: "center",
    },
  });
