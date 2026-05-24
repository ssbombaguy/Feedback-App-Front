import { makeStyles } from "./TabButton.styles";
import { Pressable } from "react-native";
import { useTheme } from "../../context/ThemeContext";
export default function TabButton({ Icon, isFocused, ...props }) {
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
