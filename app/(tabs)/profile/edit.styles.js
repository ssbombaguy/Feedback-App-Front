import { StyleSheet } from "react-native";

export const makeStyles = (theme) =>
  StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.background },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderLight,
      backgroundColor: theme.background,
    },
    backButton: { flexDirection: "row", alignItems: "center", width: 70 },
    backText: {
      color: theme.textSecondary,
      fontWeight: "600",
      marginLeft: 2,
      fontSize: 14,
    },
    headerTitle: {
      fontSize: 17,
      fontWeight: "700",
      color: theme.textSecondary,
    },
    container: { padding: 20, paddingBottom: 100 },
  });
