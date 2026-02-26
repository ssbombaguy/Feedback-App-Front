import { Pressable, StyleSheet, Image } from "react-native";

export default function TabButton({
  Icon,
  isFocused,
  ...props
}) {
  return (
    <Pressable
      {...props}
      style={[
        styles.button,
        isFocused && styles.activeButton
      ]}
    >
      <Icon width={24} height={24}/>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  activeButton: {
    backgroundColor: "#4C6576",
  },
});

