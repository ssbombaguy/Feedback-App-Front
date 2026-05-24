import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { makeStyles } from "./CustomButton.styles";

export const CustomButton = ({
  title,
  onPress,
  isPending = false,
  variant = "primary",
  disabled = false,
  style,
  textStyle,
  icon,
  children,
  ...props
}) => {
  const { theme } = useTheme();
  const styles = makeStyles(theme);

  const buttonStyles = variant === "custom" ? [] : [styles.button];
  const textStyles = [styles.text];
  let indicatorColor = "#fff";

  if (variant === "primary") {
    buttonStyles.push(styles.primaryButton);
    textStyles.push(styles.primaryText);
  } else if (variant === "secondary") {
    buttonStyles.push(styles.secondaryButton);
    textStyles.push(styles.secondaryText);
    indicatorColor = theme.text;
  } else if (variant === "danger") {
    buttonStyles.push(styles.dangerButton);
    textStyles.push(styles.dangerText);
  }

  if (disabled || isPending) {
    buttonStyles.push(styles.disabledButton);
  }

  if (style) buttonStyles.push(style);
  if (textStyle) textStyles.push(textStyle);

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || isPending}
      activeOpacity={0.8}
      {...props}
    >
      {isPending ? (
        <ActivityIndicator color={indicatorColor} />
      ) : children ? (
        children
      ) : (
        <>
          {icon}
          <Text style={textStyles}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};
