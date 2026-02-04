import { View,Text, TextInput, TouchableOpacity, StyleSheet,Image,KeyboardAvoidingView,Platform,Alert,} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { router } from "expo-router";
import { phoneWidth } from "../../constants/Dimensions";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";


const EmailSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Enter a valid email"),
});

const CodeSchema = Yup.object().shape({
  code: Yup.string()
    .required("Code is required")
    .length(6, "Code must be 6 characters"),
});

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

export default function PasswordRecovery() {
  const { t } = useTranslation();
  const [step, setStep] = useState("email"); 
  const [userEmail, setUserEmail] = useState("");
  const [generatedCode] = useState("123456"); 

  const handleEmailSubmit = (values) => {
    const foundUser = users.find(
      (user) => user.email.toLowerCase() === values.email.toLowerCase()
    );

    if (!foundUser) {
      Alert.alert("Error", "Email not found in our system");
      return;
    }

    setUserEmail(values.email);
    Alert.alert("Success", "Code sent to your email: 123456");
    setStep("code");
  };

  const handleCodeSubmit = (values) => {
    if (values.code !== generatedCode) {
      Alert.alert("Error", "Invalid code. Please try again");
      return;
    }

    Alert.alert("Success", "Code verified! Now set your new password");
    setStep("password");
  };

  const handlePasswordSubmit = (values) => {
    Alert.alert(
      "Success",
      "Your password has been reset successfully!",
      [
        {
          text: "OK",
          onPress: () => router.replace("/auth"),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 5 : 5}
      >
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              if (step === "email") {
                router.back();
              } else {
                setStep("email");
                setUserEmail("");
              }
            }}
          >
            <Ionicons name="arrow-back" size={24} color="#243d4d" />
          </TouchableOpacity>

          <Image
            style={styles.logo}
            source={require("../../assets/mziuri-logo.png")}
          />

          {step === "email" && (
            <Formik
              initialValues={{ email: "" }}
              validationSchema={EmailSchema}
              onSubmit={handleEmailSubmit}
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
                  <Image
                    source={require("../../assets/group-26.png")}
                    style={styles.roundedImage}
                  />
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
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>
                      {t("recovery.confirm")}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          )}

          {step === "code" && (
            <Formik
              initialValues={{ code: "" }}
              validationSchema={CodeSchema}
              onSubmit={handleCodeSubmit}
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

                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>
                      {t("recovery.verifyCode")}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          )}

          {step === "password" && (
            <Formik
              initialValues={{ password: "", confirmPassword: "" }}
              validationSchema={PasswordSchema}
              onSubmit={handlePasswordSubmit}
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
                  <Text style={styles.title}>
                    {t("recovery.setNewPassword")}
                  </Text>
                  <Text style={styles.subtitle}>
                    {t("recovery.createPasswordInstruction")}
                  </Text>

                  <TextInput
                    placeholder="New Password"
                    secureTextEntry
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    style={[
                      styles.input,
                      touched.password && errors.password && styles.inputError,
                    ]}
                  />

                  {touched.password && errors.password && (
                    <Text style={styles.error}>{errors.password}</Text>
                  )}

                  <TextInput
                    placeholder="Confirm Password"
                    secureTextEntry
                    value={values.confirmPassword}
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    style={[
                      styles.input,
                      touched.confirmPassword &&
                        errors.confirmPassword &&
                        styles.inputError,
                    ]}
                  />

                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text style={styles.error}>{errors.confirmPassword}</Text>
                  )}

                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>
                      {t("recovery.resetPassword")}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          )}
        </View>
      </KeyboardAvoidingView>
      <Image
        source={require("../../assets/vector-2.png")}
        style={styles.background}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 24,
    paddingHorizontal: 50,
    width: phoneWidth,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 24,
    zIndex: 10,
  },
  logo: {
    width: 220,
    height: 120,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#243d4d",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    padding: 14,
    marginBottom: 6,
    fontSize: 16,
  },
  codeInput: {
    letterSpacing: 8,
    fontSize: 24,
    textAlign: "center",
  },
  inputError: {
    borderColor: "red",
  },
  error: {
    color: "red",
    marginBottom: 12,
    fontSize: 12,
  },
  button: {
    backgroundColor: "#FBC944",
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#243d4d",
    fontSize: 17,
    fontWeight: "600",
  },
  roundedImage: {
    marginBottom: 15,
    alignSelf: "center",
    marginTop: 80,
  },
  background: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    zIndex: -50,
  },
});
