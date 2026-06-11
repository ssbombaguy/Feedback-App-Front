import React from "react";
import { makeStyles } from "./RecoveryEmailStep.styles";

import { Text } from "react-native";
import { CustomInput } from "../ui/CustomInput";
import { CustomButton } from "../ui/CustomButton";
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

          <CustomInput
            placeholder={t("recovery.enterEmail")}
            autoCapitalize="none"
            keyboardType="email-address"
            value={values.email}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            error={touched.email && errors.email ? errors.email : null}
          />

          <CustomButton
            title={t("recovery.confirm")}
            onPress={handleSubmit}
            isPending={isPending}
            style={styles.button}
          />
        </>
      )}
    </Formik>
  );
};
