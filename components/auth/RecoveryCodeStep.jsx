import React from "react";
import {makeStyles} from "./RecoveryCodeStep.styles";

import { View, Text } from "react-native";
import { CustomInput } from "../ui/CustomInput";
import { CustomButton } from "../ui/CustomButton";
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

          <CustomInput
            placeholder="000000"
            keyboardType="number-pad"
            maxLength={6}
            value={values.code}
            onChangeText={handleChange("code")}
            onBlur={handleBlur("code")}
            error={touched.code && errors.code ? errors.code : null}
            inputStyle={styles.codeInput}
          />

          <CustomButton
            title={t("recovery.verifyCode")}
            onPress={handleSubmit}
            style={styles.button}
          />
        </>
      )}
    </Formik>
  );
};
