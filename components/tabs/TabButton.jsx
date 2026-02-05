import { Pressable, StyleSheet, Image } from "react-native";

export default function TabButton({
  iconSource,
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
      <Image
        source={iconSource}
        style={[
          styles.icon,
        ]}
        resizeMode="contain"
      />
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
  icon: {
    width: 24,
    height: 24,
  },
});

