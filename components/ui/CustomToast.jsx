import React from "react";
import { View, Text } from "react-native";
import {} from "./CustomToast.styles";

import { useTheme } from "../../context/ThemeContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export const CustomToast = ({ type, text1, text2 }) => {
  const { theme } = useTheme();
  const styles = makeStyles(theme);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <MaterialIcons name="check-circle" size={24} color="#4CAF50" />;
      case "error":
        return <MaterialIcons name="error" size={24} color={theme.error} />;
      case "info":
        return <MaterialIcons name="info" size={24} color={theme.primary} />;
      default:
        return null;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "#E8F5E9";
      case "error":
        return theme.errorBg;
      case "info":
        return theme.card;
      default:
        return theme.card;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
      <View style={styles.iconContainer}>{getIcon()}</View>
      <View style={styles.textContainer}>
        {text1 && <Text style={styles.title}>{text1}</Text>}
        {text2 && <Text style={styles.message}>{text2}</Text>}
      </View>
    </View>
  );
};
