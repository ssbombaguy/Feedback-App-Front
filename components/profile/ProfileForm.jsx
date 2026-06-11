import React, { useMemo } from "react";
import { makeStyles } from "./ProfileForm.styles";

import { View, Text } from "react-native";
import { CustomInput } from "../ui/CustomInput";
import { CustomButton } from "../ui/CustomButton";
import { Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

export const ProfileForm = ({ userProfile, theme, onSubmit, isPending }) => {
  const { t } = useTranslation();
  const styles = makeStyles(theme);

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        phoneNumber: Yup.string().required(t("profile.phoneRequired")),
        email: Yup.string()
          .email(t("profile.invalidEmail"))
          .required(t("profile.emailRequired")),
        linkedinUrl: Yup.string().url(t("profile.invalidUrl")).nullable(),
        githubUrl: Yup.string().url(t("profile.invalidUrl")).nullable(),
      }),
    [t]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{t("profile.editableInfo")}</Text>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          phoneNumber: userProfile?.phoneNumber || "",
          email: userProfile?.email || "",
          linkedinUrl: userProfile?.linkedinUrl || "",
          githubUrl: userProfile?.githubUrl || "",
        }}
        enableReinitialize
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
          <View style={styles.card}>
            <View style={styles.editRow}>
              <CustomInput
                label={t("profile.phone")}
                variant="flat"
                value={values.phoneNumber}
                onChangeText={handleChange("phoneNumber")}
                onBlur={handleBlur("phoneNumber")}
                keyboardType="phone-pad"
                error={
                  touched.phoneNumber && errors.phoneNumber
                    ? errors.phoneNumber
                    : null
                }
                inputStyle={styles.flatInput}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.editRow}>
              <CustomInput
                label={t("profile.email")}
                variant="flat"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                keyboardType="email-address"
                autoCapitalize="none"
                error={touched.email && errors.email ? errors.email : null}
                inputStyle={styles.flatInput}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.editRow}>
              <CustomInput
                label="LinkedIn"
                variant="flat"
                value={values.linkedinUrl}
                onChangeText={handleChange("linkedinUrl")}
                onBlur={handleBlur("linkedinUrl")}
                autoCapitalize="none"
                placeholder="https://linkedin.com/in/..."
                error={
                  touched.linkedinUrl && errors.linkedinUrl
                    ? errors.linkedinUrl
                    : null
                }
                inputStyle={styles.flatInput}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.editRow}>
              <CustomInput
                label="GitHub"
                variant="flat"
                value={values.githubUrl}
                onChangeText={handleChange("githubUrl")}
                onBlur={handleBlur("githubUrl")}
                autoCapitalize="none"
                placeholder="https://github.com/..."
                error={
                  touched.githubUrl && errors.githubUrl
                    ? errors.githubUrl
                    : null
                }
                inputStyle={styles.flatInput}
              />
            </View>

            <CustomButton
              title={t("edit.update")}
              onPress={handleSubmit}
              isPending={isPending}
              style={styles.updateButton}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};
