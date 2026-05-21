import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

export const ProfileForm = ({ userProfile, theme, onSubmit, isPending }) => {
  const { t } = useTranslation();
  const styles = makeStyles(theme);

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string().required(t("profile.phoneRequired")),
    email: Yup.string().email(t("profile.invalidEmail")).required(t("profile.emailRequired")),
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
              style={[
                styles.updateButton,
                isPending && styles.disabled,
              ]}
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

const makeStyles = (theme) =>
  StyleSheet.create({
    container: {
      width: "100%",
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.subtext,
      marginBottom: 8,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    card: {
      backgroundColor: theme.card,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.border,
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
    editRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 6,
    },
    editLabel: {
      fontSize: 14,
      color: theme.label || "#666",
      fontWeight: "500",
      width: 80,
    },
    flatInput: {
      flex: 1,
      backgroundColor: "transparent",
      height: 40,
      fontSize: 14,
      textAlign: "right",
      paddingHorizontal: 0,
    },
    divider: {
      height: 1,
      backgroundColor: theme.border,
      marginVertical: 4,
    },
    errorText: {
      color: theme.error || "#ff1744",
      fontSize: 12,
      marginTop: -4,
      marginBottom: 8,
      textAlign: "right",
    },
    updateButton: {
      backgroundColor: theme.accent || "#243d4d",
      borderRadius: 8,
      paddingVertical: 14,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
    },
    disabled: {
      opacity: 0.7,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
  });
