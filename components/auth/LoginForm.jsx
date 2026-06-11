import React from "react";
import { makeStyles } from "./LoginForm.styles";
import { View, Text } from "react-native";
import { CustomInput } from "../ui/CustomInput";
import { CustomButton } from "../ui/CustomButton";
import { Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const AuthSchema = Yup.object().shape({
  email: Yup.string().required("auth.emailRequired").email("auth.invalidEmail"),
  password: Yup.string()
    .required("auth.passwordRequired")
    .min(8, "auth.passwordMin8")
    .matches(/[A-Z]/, "auth.passwordMustContainCapital")
    .matches(/[0-9]/, "auth.passwordMustContainNumber")
    .matches(/[^A-Za-z0-9]/, "auth.passwordMustContainSymbol"),
});

import { useLoginFormLogic } from "../../hooks/useLoginFormLogic";

export const LoginForm = ({ onSubmit, isPending, theme }) => {
  const { t } = useTranslation();
  const styles = makeStyles(theme);

  const { state, setters, handlers } = useLoginFormLogic(onSubmit);
  const { rememberMe, isDark, currentLanguage } = state;
  const { setRememberMe } = setters;
  const {
    handleLanguageToggle,
    handleThemeToggle,
    handleValidationErrors,
    submitWithRememberMe,
  } = handlers;

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={AuthSchema}
      onSubmit={submitWithRememberMe}
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
          <CustomInput
            placeholder={t("auth.email")}
            keyboardType="email-address"
            value={values.email}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            error={touched.email && errors.email ? t(errors.email) : null}
          />

          <CustomInput
            placeholder={t("auth.password")}
            secureTextEntry
            value={values.password}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            error={
              touched.password && errors.password ? t(errors.password) : null
            }
          />

          <View style={styles.optionsRow}>
            <View>
              <View style={styles.rememberRow}>
                <CustomButton
                  variant="custom"
                  onPress={() => setRememberMe(!rememberMe)}
                  style={[
                    styles.checkbox,
                    rememberMe && styles.checkboxChecked,
                  ]}
                >
                  {rememberMe && <Text style={styles.checkmark}>✓</Text>}
                </CustomButton>
                <Text style={styles.rememberText}>{t("auth.rememberMe")}</Text>
              </View>
            </View>

            <CustomButton
              variant="custom"
              onPress={() => router.push("/auth/recovery")}
            >
              <Text style={styles.recoveryText}>
                {t("auth.forgotPassword")}
              </Text>
            </CustomButton>
          </View>

          <View style={styles.settingsRow}>
            <CustomButton
              variant="custom"
              style={styles.settingsButton}
              onPress={handleLanguageToggle}
            >
              <Ionicons
                name="globe-outline"
                size={18}
                color={theme.textSecondary || "#243d4d"}
              />
              <Text style={styles.settingsButtonText}>
                {currentLanguage === "en" ? "KA" : "EN"}
              </Text>
            </CustomButton>

            <CustomButton
              variant="custom"
              style={styles.settingsButton}
              onPress={handleThemeToggle}
            >
              <Ionicons
                name={isDark ? "sunny-outline" : "moon-outline"}
                size={18}
                color={theme.textSecondary || "#243d4d"}
              />
              <Text style={styles.settingsButtonText}>
                {isDark ? t("profile.lightMode") : t("profile.darkMode")}
              </Text>
            </CustomButton>
          </View>

          <CustomButton
            title={t("auth.signIn")}
            onPress={() =>
              handleValidationErrors(validateForm, handleFormSubmit)
            }
            isPending={isPending}
            style={styles.signInButton}
          />
        </>
      )}
    </Formik>
  );
};
