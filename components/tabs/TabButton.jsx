import { Pressable, StyleSheet, Image } from "react-native";
import { useTheme } from "../../context/ThemeContext";

export default function TabButton({ iconSource, isFocused, ...props }) {
  const { theme } = useTheme();
  const styles = makeStyles(theme);

  return (
    <Pressable
      {...props}
      style={[styles.button, isFocused && styles.activeButton]}
    >
      <Icon width={24} height={24} />
    </Pressable>
  );
}

const makeStyles = (theme) =>
  StyleSheet.create({
    button: {
      flex: 1,
      paddingVertical: 12,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 25,
    },
    activeButton: { backgroundColor: theme.tabBarActive },
    icon: { width: 24, height: 24 },
  });
