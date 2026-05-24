import React from "react";
import {} from "./RecoveryEmailStep.styles";

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
          <Text style={styles.title}>{t("recovery.forgotPassword")}</Text>
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
              <ActivityIndicator
                color={theme.textSecondary || "#fff"}
                size="small"
              />
            ) : (
              <Text style={styles.buttonText}>{t("recovery.confirm")}</Text>
            )}
          </TouchableOpacity>
        </>
      )}
    </Formik>
  );
};
