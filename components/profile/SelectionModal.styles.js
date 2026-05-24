import { StyleSheet } from "react-native";

export const makeStyles = (theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    modalCard: {
      width: "100%",
      backgroundColor: theme.background || "#fff",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      padding: 24,
      paddingBottom: 40,
      maxHeight: "50%",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 10,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: "700",
      color: theme.textSecondary || "#333",
    },
    closeButton: {
      padding: 4,
    },
    optionsList: {
      width: "100%",
    },
    optionRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderRadius: 15,
      marginBottom: 8,
      backgroundColor: theme.inputBg || "#f7f7f7",
    },
    optionRowSelected: {
      backgroundColor: theme.accent || "#eef3f6",
      borderWidth: 1,
      borderColor: theme.primary || "#243d4d",
    },
    optionLabel: {
      fontSize: 16,
      color: theme.text || "#333",
      fontWeight: "500",
    },
    optionLabelSelected: {
      color: "#243d4d",
      fontWeight: "600",
    },
  });
