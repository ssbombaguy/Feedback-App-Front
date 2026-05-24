import React from "react";
import {} from "./RecoveryPasswordStep.styles";

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

const PasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least one capital letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(/[^A-Za-z0-9]/, "Must contain at least one symbol"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

export const RecoveryPasswordStep = ({ onSubmit, isPending, theme }) => {
  const { t } = useTranslation();
  const styles = makeStyles(theme);

  return (
    <Formik
      initialValues={{ password: "", confirmPassword: "" }}
      validationSchema={PasswordSchema}
      onSubmit={onSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <>
          <Text style={styles.title}>{t("recovery.setNewPassword")}</Text>
          <Text style={styles.subtitle}>
            {t("recovery.createPasswordInstruction")}
          </Text>

          <TextInput
            placeholder="New Password"
            placeholderTextColor={theme.subtext || "#888"}
            secureTextEntry
            value={values.password}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            style={[
              styles.input,
              touched.password && errors.password && styles.inputError,
            ]}
          />

          {touched.password && errors.password && (
            <Text style={styles.error}>{errors.password}</Text>
          )}

          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor={theme.subtext || "#888"}
            secureTextEntry
            value={values.confirmPassword}
            onChangeText={handleChange("confirmPassword")}
            onBlur={handleBlur("confirmPassword")}
            style={[
              styles.input,
              touched.confirmPassword &&
                errors.confirmPassword &&
                styles.inputError,
            ]}
          />

          {touched.confirmPassword && errors.confirmPassword && (
            <Text style={styles.error}>{errors.confirmPassword}</Text>
          )}

          <TouchableOpacity
            onPress={handleSubmit}
            style={[styles.button, isPending && styles.buttonDisabled]}
            disabled={isPending}
          >
            {isPending ? (
              <ActivityIndicator
                color={theme.textSecondary || "#fff"}
                size="small"
              />
            ) : (
              <Text style={styles.buttonText}>
                {t("recovery.resetPassword")}
              </Text>
            )}
          </TouchableOpacity>
        </>
      )}
    </Formik>
  );
};
