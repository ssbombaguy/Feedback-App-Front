import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { showErrorToast } from "../../utils/toastUtils";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "../../context/ThemeContext";
import { saveLanguage } from "../../i18n";

const AuthSchema = Yup.object().shape({
  email: Yup.string().required("auth.emailRequired").email("auth.invalidEmail"),
  password: Yup.string()
    .required("auth.passwordRequired")
    .min(8, "auth.passwordMin8")
    .matches(/[A-Z]/, "auth.passwordMustContainCapital")
    .matches(/[0-9]/, "auth.passwordMustContainNumber")
    .matches(/[^A-Za-z0-9]/, "auth.passwordMustContainSymbol"),
});

export const LoginForm = ({ onSubmit, isPending, theme }) => {
  const { t, i18n } = useTranslation();
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { isDark, changeThemeMode } = useTheme();
  const styles = makeStyles(theme);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={AuthSchema}
      onSubmit={(values) => onSubmit({ ...values, rememberMe })}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit: handleFormSubmit,
        validateForm,
        values,
        errors,
        touched,
      }) => (
        <>
          <TextInput
            placeholder={t("auth.email")}
            placeholderTextColor={theme.subtext || "#888"}
            autoCapitalize="none"
            keyboardType="email-address"
            value={values.email}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            style={[
              styles.input,
              touched.email && errors.email && styles.inputError,
            ]}
          />
          {touched.email && errors.email && (
            <Text style={styles.error}>{t(errors.email)}</Text>
          )}

          <View style={styles.passwordContainer}>
            <TextInput
              placeholder={t("auth.password")}
              placeholderTextColor={theme.subtext || "#888"}
              secureTextEntry={!showPassword}
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              style={[
                styles.input,
                styles.passwordInput,
                touched.password && errors.password && styles.inputError,
              ]}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword((prev) => !prev)}
            >
              <AntDesign
                name={showPassword ? "eye" : "eye-invisible"}
                size={22}
                style={styles.eye}
              />
            </TouchableOpacity>
          </View>
          {touched.password && errors.password && (
            <Text style={styles.error}>{t(errors.password)}</Text>
          )}

          <View style={styles.optionsRow}>
            <View>
              <View style={styles.rememberRow}>
                <TouchableOpacity
                  onPress={() => setRememberMe(!rememberMe)}
                  style={[
                    styles.checkbox,
                    rememberMe && styles.checkboxChecked,
                  ]}
                >
                  {rememberMe && <Text style={styles.checkmark}>✓</Text>}
                </TouchableOpacity>
                <Text style={styles.rememberText}>
                  {t("auth.rememberMe")}
                </Text>
              </View>
            </View>

            <TouchableOpacity onPress={() => router.push("/auth/recovery")}>
              <Text style={styles.recoveryText}>
                {t("auth.forgotPassword")}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.settingsRow}>
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => saveLanguage(i18n.language === "en" ? "ka" : "en")}
            >
              <Ionicons
                name="globe-outline"
                size={18}
                color={theme.textSecondary || "#243d4d"}
              />
              <Text style={styles.settingsButtonText}>
                {i18n.language === "en" ? "KA" : "EN"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => changeThemeMode(isDark ? "light" : "dark")}
            >
              <Ionicons
                name={isDark ? "sunny-outline" : "moon-outline"}
                size={18}
                color={theme.textSecondary || "#243d4d"}
              />
              <Text style={styles.settingsButtonText}>
                {isDark ? t("profile.lightMode") : t("profile.darkMode")}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={async () => {
              const formErrors = await validateForm();
              if (Object.keys(formErrors).length > 0) {
                showErrorToast(
                  t("auth.validationError") || "Validation Error",
                  t("auth.fillAllFields") || "Please fill in all fields correctly"
                );
                return;
              }
              handleFormSubmit();
            }}
            style={styles.submitButton}
            disabled={isPending}
          >
            {isPending ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.buttonText}>{t("auth.signIn")}</Text>
            )}
          </TouchableOpacity>
        </>
      )}
    </Formik>
  );
};

const makeStyles = (theme) =>
  StyleSheet.create({
    input: {
      borderWidth: 1,
      borderColor: theme.borderInput || "#ddd",
      borderRadius: 15,
      padding: 14,
      marginBottom: 6,
      fontSize: 16,
      color: theme.text,
      backgroundColor: theme.inputBg || "#fff",
      width: "100%",
    },
    inputError: { borderColor: theme.error },
    error: { color: theme.error, marginBottom: 12, fontSize: 12, alignSelf: "flex-start" },
    passwordContainer: {
      position: "relative",
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
    },
    passwordInput: { paddingRight: 50 },
    eyeIcon: { position: "absolute", right: 16, zIndex: 10, padding: 4 },
    eye: { color: theme.textSecondary || "#666" },
    optionsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      marginTop: 8,
      marginBottom: 20,
    },
    rememberRow: { flexDirection: "row", alignItems: "center" },
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 2,
      borderColor: theme.checkboxBorder || "#243d4d",
      borderRadius: 4,
      marginRight: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    checkboxChecked: { backgroundColor: theme.accent || "#243d4d" },
    checkmark: { color: "#fff", fontSize: 12, fontWeight: "bold" },
    rememberText: { color: theme.textSecondary || "#666", fontSize: 14 },
    recoveryText: { color: theme.accent || "#243d4d", fontSize: 14, fontWeight: "600" },
    languageContainer: { marginBottom: 20, alignSelf: "center" },
    submitButton: {
      backgroundColor: theme.accent || "#243d4d",
      padding: 16,
      borderRadius: 15,
      alignItems: "center",
      marginTop: 8,
      width: "100%",
    },
    buttonText: { color: theme.textSecondary || "#fff", fontSize: 17, fontWeight: "600" },
    settingsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      marginBottom: 20,
      gap: 12,
    },
    settingsButton: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 6,
      paddingVertical: 8,
      borderRadius: 10,
      backgroundColor: theme.cardAlt || "rgba(0,0,0,0.05)",
      borderWidth: 1,
      borderColor: theme.border || "#e0e0e0",
    },
    settingsButtonText: {
      fontSize: 12,
      fontWeight: "600",
      color: theme.textSecondary || "#243d4d",
    },
  });
