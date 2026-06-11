import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import { makeStyles } from "./CustomInput.styles";

export const CustomInput = ({
  label,
  value,
  onChangeText,
  onBlur,
  error,
  placeholder,
  secureTextEntry,
  keyboardType = "default",
  autoCapitalize = "none",
  variant = "bordered", // 'bordered' | 'flat'
  style,
  inputStyle,
  ...props
}) => {
  const { theme } = useTheme();
  const styles = makeStyles(theme);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = secureTextEntry;
  const isFlat = variant === "flat";

  const containerStyles = [
    styles.inputContainer,
    isFlat ? styles.inputContainerFlat : styles.inputContainerBordered,
    error ? styles.inputError : null,
    style,
  ];

  const textInputStyles = [
    styles.input,
    isPassword && styles.passwordInput,
    isFlat && styles.inputFlat,
    inputStyle,
  ];

  return (
    <View style={styles.wrapper}>
      {label && (
        <Text style={[styles.label, isFlat && styles.labelFlat]}>{label}</Text>
      )}

      <View style={containerStyles}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          placeholder={placeholder}
          placeholderTextColor={theme.subtext || "#888"}
          secureTextEntry={isPassword && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          style={textInputStyles}
          {...props}
        />

        {isPassword && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword((prev) => !prev)}
            activeOpacity={0.7}
          >
            <AntDesign
              name={showPassword ? "eye" : "eye-invisible"}
              size={22}
              color={theme.textSecondary || "#666"}
            />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};
