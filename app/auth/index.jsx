import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as Yup from "yup";
import { router } from "expo-router";
import { setLoggedIn } from "../../utils/AsyncStorage";
import { phoneWidth } from "../../constants/Dimensions";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../../components/LanguageSwitcher";
import { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Logo from "../../assets/MziuriLogo.svg";
import YellowBg from "../../assets/yellowBg";
import { useTheme } from "../../context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../context/AuthContext";
import { showErrorToast } from "../../utils/toastUtils";

const AuthSchema = Yup.object().shape({
  email: Yup.string().required("auth.emailRequired").email("auth.invalidEmail"),
  password: Yup.string()
    .required("auth.passwordRequired")
    .min(8, "auth.passwordMin8")
    .matches(/[A-Z]/, "auth.passwordMustContainCapital")
    .matches(/[0-9]/, "auth.passwordMustContainNumber")
    .matches(/[^A-Za-z0-9]/, "auth.passwordMustContainSymbol"),
});

export default function Authentication() {
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [pushToken, setPushToken] = useState("");
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const { login } = useAuth();
  const styles = makeStyles(theme);

  const loginMutation = useMutation({
    mutationFn: (values) =>
      login(values.email, values.password, values.rememberMe),
    onSuccess: async (response) => {
      if (response?.user) {
        await setLoggedIn(response.user);
        router.replace("/(tabs)/(feedback)");
      }
    },
    onError: (error) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      showErrorToast(t("common.error"), message);
    },
  });

  const handleLogin = (values) => {
    loginMutation.mutate({ ...values, rememberMe });
  };

  useEffect(() => {
    const getPushToken = async () => {
      const token = await AsyncStorage.getItem("pushToken");
      setPushToken(token);
    };
    getPushToken();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 5 : 5}
      >
        <View style={styles.container}>
          <View style={styles.topPart}>
            <Logo style={styles.logo} />
            <Text style={styles.smallTitle}>{t("auth.welcomeBack")}</Text>
          </View>

          <Text style={styles.bigTitle}>{t("auth.signIn")}</Text>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={AuthSchema}
            onSubmit={handleLogin}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit: handleFormSubmit,
              validateForm,
              values,
              errors,
              touched,
            }) => (
              <>
                <TextInput
                  placeholder={t("auth.email")}
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
                  <Text style={styles.error}>{t(errors.email)}</Text>
                )}

                <View style={styles.passwordContainer}>
                  <TextInput
                    placeholder={t("auth.password")}
                    secureTextEntry={!showPassword}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    style={[
                      styles.input,
                      styles.passwordInput,
                      touched.password && errors.password && styles.inputError,
                    ]}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword((prev) => !prev)}
                  >
                    <AntDesign
                      name={showPassword ? "eye" : "eye-invisible"}
                      size={22}
                      style={styles.eye}
                    />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.error}>{t(errors.password)}</Text>
                )}

                <View
                  style={[
                    styles.optionsRow,
                    {
                      flexDirection: i18n.language === "ka" ? "column" : "row",
                      gap: i18n.language === "ka" ? 5 : undefined,
                    },
                  ]}
                >
                  <View>
                    <View style={styles.rememberRow}>
                      <TouchableOpacity
                        onPress={() => setRememberMe(!rememberMe)}
                        style={[
                          styles.checkbox,
                          rememberMe && styles.checkboxChecked,
                        ]}
                      >
                        {rememberMe && <Text style={styles.checkmark}>✓</Text>}
                      </TouchableOpacity>
                      <Text style={styles.rememberText}>
                        {t("auth.rememberMe")}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => router.push("/auth/recovery")}
                  >
                    <Text style={styles.recoveryText}>
                      {t("auth.forgotPassword")}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.languageContainer}>
                  <LanguageSwitcher />
                </View>

                <TouchableOpacity
                  onPress={async () => {
                    const formErrors = await validateForm();
                    if (Object.keys(formErrors).length > 0) {
                      showErrorToast(
                        t("auth.validationError"),
                        t("auth.fillAllFields"),
                      );
                      return; 
                    }
                    handleFormSubmit();
                  }}
                  style={styles.submitButton}
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? (
                    <ActivityIndicator color="#fff" size="small" />
                  ) : (
                    <Text style={styles.buttonText}>{t("auth.signIn")}</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => router.push("/auth/recovery")}
                  style={styles.recoveryButton}
                />
              </>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingView>
      <YellowBg style={styles.background} />
    </SafeAreaView>
  );
}

const makeStyles = (theme) =>
  StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.background },
    keyboardView: { flex: 1 },
    container: {
      flex: 1,
      justifyContent: "flex-start",
      padding: 24,
      paddingHorizontal: 50,
      width: phoneWidth,
    },
    topPart: { alignSelf: "center" },
    logo: {
      width: 220,
      height: 120,
      resizeMode: "contain",
      alignSelf: "center",
    },
    smallTitle: {
      fontSize: 20,
      fontWeight: "600",
      marginBottom: 24,
      textAlign: "center",
      color: theme.textSecondary,
    },
    bigTitle: {
      fontSize: 35,
      fontWeight: "700",
      marginBottom: 20,
      marginTop: 100,
      color: theme.textSecondary,
      textAlign: "center",
    },
    input: {
      borderWidth: 1,
      borderColor: theme.borderInput,
      borderRadius: 15,
      padding: 14,
      marginBottom: 6,
      color: theme.text,
      backgroundColor: theme.inputBg,
    },
    inputError: { borderColor: theme.error, borderRadius: 15 },
    error: { color: theme.error, marginBottom: 12 },
    submitButton: {
      backgroundColor: theme.primary,
      padding: 16,
      borderRadius: 15,
      alignItems: "center",
      marginTop: 16,
      minHeight: 50,
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.25,
      shadowRadius: 15,
      elevation: 6,
    },
    buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
    passwordContainer: { position: "relative", width: "100%", marginBottom: 6 },
    passwordInput: { paddingRight: 50 },
    eyeIcon: { position: "absolute", right: 14, top: 14, zIndex: 10 },
    eye: { color: theme.primary },
    optionsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginTop: 10,
      marginBottom: 20,
    },
    rememberRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    checkbox: {
      width: 18,
      height: 18,
      borderWidth: 2,
      borderColor: theme.textSecondary,
      borderRadius: 4,
      marginRight: 8,
    },
    checkboxChecked: { backgroundColor: theme.textSecondary },
    checkmark: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 12,
      textAlign: "center",
    },
    rememberText: {
      color: theme.textSecondary,
      fontWeight: "600",
      fontSize: 14,
    },
    languageContainer: {
      marginTop: 10,
      width: "100%",
      alignItems: "flex-start",
    },
    recoveryText: { color: theme.accent, fontSize: 15, fontWeight: "700" },
    background: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      zIndex: -50,
      alignSelf: "center",
    },
  });
