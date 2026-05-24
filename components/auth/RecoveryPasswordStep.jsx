import React from "react";
import {} from "./RecoveryPasswordStep.styles";

import {
  View,
  Text,
} from "react-native";
import { CustomInput } from "../ui/CustomInput";
import { CustomButton } from "../ui/CustomButton";
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

          <CustomInput
            placeholder="New Password"
            secureTextEntry
            value={values.password}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            error={touched.password && errors.password ? errors.password : null}
          />

          <CustomInput
            placeholder="Confirm Password"
            secureTextEntry
            value={values.confirmPassword}
            onChangeText={handleChange("confirmPassword")}
            onBlur={handleBlur("confirmPassword")}
            error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : null}
          />

          <CustomButton
            title={t("recovery.resetPassword")}
            onPress={handleSubmit}
            isPending={isPending}
            style={styles.button}
          />
        </>
      )}
    </Formik>
  );
};
