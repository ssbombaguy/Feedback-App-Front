import { View,Text, TextInput, TouchableOpacity, StyleSheet,Image,KeyboardAvoidingView,Platform,Alert,} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { router } from "expo-router";
import { phoneWidth } from "../../constants/Dimensions";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

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
                <Text style={styles.title}>Password Recovery</Text>
                <Text style={styles.subtitle}>
                  Enter your email to reset your password
                </Text>

                <TextInput
                  placeholder="Enter your email"
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

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                  <Text style={styles.buttonText}>Send Code</Text>
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
                <Text style={styles.title}>Verify Code</Text>
                <Text style={styles.subtitle}>
                  Enter the 6-digit code sent to {userEmail}
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

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                  <Text style={styles.buttonText}>Verify Code</Text>
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
                <Text style={styles.title}>Set New Password</Text>
                <Text style={styles.subtitle}>
                  Create a strong password for your account
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

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                  <Text style={styles.buttonText}>Reset Password</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
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
    fontSize: 24,
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
    borderRadius: 8,
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
    backgroundColor: "#243d4d",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
