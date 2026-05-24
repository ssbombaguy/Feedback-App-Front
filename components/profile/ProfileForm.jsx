import React from "react";
import {} from "./ProfileForm.styles";

import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { TextInput } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

export const ProfileForm = ({ userProfile, theme, onSubmit, isPending }) => {
  const { t } = useTranslation();
  const styles = makeStyles(theme);

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string().required(t("profile.phoneRequired")),
    email: Yup.string()
      .email(t("profile.invalidEmail"))
      .required(t("profile.emailRequired")),
    linkedinUrl: Yup.string().url(t("profile.invalidUrl")).nullable(),
    githubUrl: Yup.string().url(t("profile.invalidUrl")).nullable(),
  });

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
              <Text style={styles.editLabel}>{t("profile.phone")}</Text>
              <TextInput
                mode="flat"
                value={values.phoneNumber}
                onChangeText={handleChange("phoneNumber")}
                onBlur={handleBlur("phoneNumber")}
                keyboardType="phone-pad"
                style={styles.flatInput}
                textColor={theme.text}
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                error={touched.phoneNumber && !!errors.phoneNumber}
              />
            </View>
            {touched.phoneNumber && errors.phoneNumber && (
              <Text style={styles.errorText}>{errors.phoneNumber}</Text>
            )}

            <View style={styles.divider} />

            <View style={styles.editRow}>
              <Text style={styles.editLabel}>{t("profile.email")}</Text>
              <TextInput
                mode="flat"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.flatInput}
                textColor={theme.text}
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                error={touched.email && !!errors.email}
              />
            </View>
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <View style={styles.divider} />

            <View style={styles.editRow}>
              <Text style={styles.editLabel}>LinkedIn</Text>
              <TextInput
                mode="flat"
                value={values.linkedinUrl}
                onChangeText={handleChange("linkedinUrl")}
                onBlur={handleBlur("linkedinUrl")}
                autoCapitalize="none"
                placeholder="https://linkedin.com/in/..."
                placeholderTextColor={theme.subtext}
                style={styles.flatInput}
                textColor={theme.text}
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                error={touched.linkedinUrl && !!errors.linkedinUrl}
              />
            </View>
            {touched.linkedinUrl && errors.linkedinUrl && (
              <Text style={styles.errorText}>{errors.linkedinUrl}</Text>
            )}

            <View style={styles.divider} />

            <View style={styles.editRow}>
              <Text style={styles.editLabel}>GitHub</Text>
              <TextInput
                mode="flat"
                value={values.githubUrl}
                onChangeText={handleChange("githubUrl")}
                onBlur={handleBlur("githubUrl")}
                autoCapitalize="none"
                placeholder="https://github.com/..."
                placeholderTextColor={theme.subtext}
                style={styles.flatInput}
                textColor={theme.text}
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                error={touched.githubUrl && !!errors.githubUrl}
              />
            </View>
            {touched.githubUrl && errors.githubUrl && (
              <Text style={styles.errorText}>{errors.githubUrl}</Text>
            )}

            <TouchableOpacity
              style={[styles.updateButton, isPending && styles.disabled]}
              onPress={handleSubmit}
              disabled={isPending}
            >
              {isPending ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>{t("edit.update")}</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};
