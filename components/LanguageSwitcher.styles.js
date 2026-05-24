import { StyleSheet } from "react-native";

export const makeStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      gap: 8,
      backgroundColor: theme.disabled,
      borderRadius: 8,
      padding: 4,
    },
    button: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 },
    activeButton: { backgroundColor: theme.primary },
    buttonText: { fontSize: 14, fontWeight: "600", color: theme.subtext },
    activeText: { color: "#fff" },
  });
