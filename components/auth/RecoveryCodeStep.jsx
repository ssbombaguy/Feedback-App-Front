import React from "react";
import {} from "./RecoveryCodeStep.styles";

import { View, Text, TextInput, TouchableOpacity } from "react-native";
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
            <Text style={styles.buttonText}>{t("recovery.verifyCode")}</Text>
          </TouchableOpacity>
        </>
      )}
    </Formik>
  );
};
