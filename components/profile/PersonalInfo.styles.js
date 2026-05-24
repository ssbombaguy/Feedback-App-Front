import { StyleSheet } from "react-native";

export const makeStyles = (theme) =>
  StyleSheet.create({
    section: {
      width: "100%",
      backgroundColor: theme.sectionBg,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.textSecondary,
      marginBottom: 12,
    },
    infoRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 12,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderLight,
    },
    icon: { marginRight: 12, marginTop: 2 },
    linkIcon: { marginTop: 2, opacity: 0.6 },
    infoTextContainer: { flex: 1 },
    infoLabel: {
      fontSize: 12,
      color: theme.label,
      marginBottom: 2,
      fontWeight: "600",
    },
    infoValue: { fontSize: 14, fontWeight: "600", color: theme.textSecondary },
    linkValue: { color: "#243d4d", textDecorationLine: "underline" },
  });
