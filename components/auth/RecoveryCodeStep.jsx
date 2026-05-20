import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const CodeSchema = Yup.object().shape({
  code: Yup.string()
    .required("Code is required")
    .min(4, "Code must be at least 4 characters"),
});

export const RecoveryCodeStep = ({ onSubmit, userEmail, theme }) => {
  const { t } = useTranslation();
  const styles = makeStyles(theme);

  return (
    <Formik
      initialValues={{ code: "" }}
      validationSchema={CodeSchema}
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
          <Text style={styles.title}>{t("recovery.verifyCode")}</Text>
          <Text style={styles.subtitle}>
            {t("recovery.codeSent", { email: userEmail })}
          </Text>

          <TextInput
            placeholder="000000"
            placeholderTextColor={theme.subtext || "#888"}
            keyboardType="number-pad"
            maxLength={6}
            value={values.code}
            onChangeText={handleChange("code")}
            onBlur={handleBlur("code")}
            style={[
              styles.input,
              styles.codeInput,
              touched.code && errors.code && styles.inputError,
            ]}
          />

          {touched.code && errors.code && (
            <Text style={styles.error}>{errors.code}</Text>
          )}

          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>
              {t("recovery.verifyCode")}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </Formik>
  );
};

const makeStyles = (theme) =>
  StyleSheet.create({
    title: {
      fontSize: 30,
      fontWeight: "700",
      color: theme.textSecondary,
      marginBottom: 8,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 14,
      color: theme.hint,
      marginBottom: 24,
      textAlign: "center",
    },
    input: {
      borderWidth: 1,
      borderColor: theme.borderInput,
      borderRadius: 15,
      padding: 14,
      marginBottom: 6,
      fontSize: 16,
      color: theme.text,
      backgroundColor: theme.inputBg,
    },
    codeInput: { letterSpacing: 8, fontSize: 24, textAlign: "center" },
    inputError: { borderColor: theme.error },
    error: { color: theme.error, marginBottom: 12, fontSize: 12 },
    button: {
      backgroundColor: theme.accent,
      padding: 16,
      borderRadius: 15,
      alignItems: "center",
      marginTop: 16,
    },
    buttonText: { color: theme.textSecondary, fontSize: 17, fontWeight: "600" },
  });
