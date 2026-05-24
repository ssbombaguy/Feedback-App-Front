import React, { useState } from "react";
import {} from "./LoginForm.styles";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
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
                <Text style={styles.rememberText}>{t("auth.rememberMe")}</Text>
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
                  t("auth.fillAllFields") ||
                    "Please fill in all fields correctly",
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
