import React from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import Question from "../../assets/question.svg";

const EmailSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Enter a valid email"),
});

export const RecoveryEmailStep = ({ onSubmit, isPending, theme }) => {
  const { t } = useTranslation();
  const styles = makeStyles(theme);

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={EmailSchema}
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
          <Question style={styles.roundedImage} />
          <Text style={styles.title}>
            {t("recovery.forgotPassword")}
          </Text>
          <Text style={styles.subtitle}>
            {t("recovery.resetPasswordInstruction")}
          </Text>

          <TextInput
            placeholder={t("recovery.enterEmail")}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholderTextColor={theme.subtext || "#888"}
            value={values.email}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            style={[
              styles.input,
              touched.email && errors.email && styles.inputError,
            ]}
          />

          {touched.email && errors.email && (
            <Text style={styles.error}>{errors.email}</Text>
          )}

          <TouchableOpacity
            onPress={handleSubmit}
            style={[styles.button, isPending && styles.buttonDisabled]}
            disabled={isPending}
          >
            {isPending ? (
              <ActivityIndicator color={theme.textSecondary || "#fff"} size="small" />
            ) : (
              <Text style={styles.buttonText}>
                {t("recovery.confirm")}
              </Text>
            )}
          </TouchableOpacity>
        </>
      )}
    </Formik>
  );
};

const makeStyles = (theme) =>
  StyleSheet.create({
    roundedImage: { marginBottom: 15, alignSelf: "center", marginTop: 80 },
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
    inputError: { borderColor: theme.error },
    error: { color: theme.error, marginBottom: 12, fontSize: 12 },
    button: {
      backgroundColor: theme.accent,
      padding: 16,
      borderRadius: 15,
      alignItems: "center",
      marginTop: 16,
    },
    buttonDisabled: { opacity: 0.7 },
    buttonText: { color: theme.textSecondary, fontSize: 17, fontWeight: "600" },
  });
