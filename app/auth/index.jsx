import {View,Text,TextInput,TouchableOpacity,StyleSheet, Image,KeyboardAvoidingView,Platform, ActivityIndicator} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Formik } from "formik"
import * as Yup from "yup"
import { router } from "expo-router"
import { setLoggedIn } from "../../utils/AsyncStorage"
import { authAPI } from "../../api/apiClient"
import { phoneWidth } from "../../constants/Dimensions"
import { useMutation } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { LanguageSwitcher } from "../../components/LanguageSwitcher"



const AuthSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Enter a valid email"),

  password: Yup.string()
    .required("Password is required"),
})

export default function Authentication() {
  const { t } = useTranslation()
 const loginMutation = useMutation({
  mutationFn: (values) => authAPI.login(values.email, values.password),
  onSuccess: async (response) => {
    if (response.user) {
      await setLoggedIn(response.user)
      router.replace("/(tabs)/(feedback)")
    }
  },
  onError: (error) => {
    console.error("Login error:", error)
    console.log("Response:", error.response?.data)
    console.log("Status:", error.response?.status)
  },
})

  const handleLogin = (values) => {
    loginMutation.mutate(values)
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 5 : 5}
      >
        <View style={styles.container}>
          <View style={styles.topPart}>
            <Image
              style={styles.logo}
              source={require("../../assets/mziuri-logo.png")}
            />

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
              handleSubmit,
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
                  <Text style={styles.error}>{errors.email}</Text>
                )}

                <TextInput
                  placeholder={t("auth.password")}
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
                <View style={styles.optionsRow}>
                  <View>
                    <View style={styles.rememberRow}>
                      <View style={styles.checkbox} />
                      <Text style={styles.rememberText}>
                        {t("auth.rememberMe")}
                      </Text>
                    </View>

                    <View style={styles.languageContainer}>
                      <LanguageSwitcher />
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

                <TouchableOpacity
                  onPress={handleSubmit}
                  style={styles.button}
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? (
                    <ActivityIndicator color="#fff" size="small" />
                  ) : (
                    <Text style={styles.buttonText}>{t("auth.signIn")}</Text>
                  )}
                </TouchableOpacity>

                {loginMutation.error && (
                  <Text style={styles.apiError}>
                    {loginMutation.error.message}
                  </Text>
                )}

                <TouchableOpacity
                  onPress={() => router.push("/auth/recovery")}
                  style={styles.recoveryButton}
                ></TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingView>
      <Image
        source={require("../../assets/vector-1.png")}
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
  topPart: {
    alignSelf: "center",
  },
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
    color: "#243d4d",
  },
  bigTitle: {
    fontSize: 35,
    fontWeight: "700",
    marginBottom: 20,
    color: "#243d4d",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    padding: 14,
    marginBottom: 6,
  },
  inputError: {
    borderColor: "red",
    borderRadius: 15,
  },
  error: {
    color: "red",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#243d4d",
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 16,
    minHeight: 50,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  apiError: {
    color: "#F44336",
    marginTop: 12,
    padding: 10,
    backgroundColor: "#FFEBEE",
    borderRadius: 4,
    textAlign: "center",
    fontWeight: "600",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  recoveryButton: {
    marginTop: 12,
    alignItems: "center",
  },
  recoveryText: {
    color: "#F9C94D",
    fontSize: 15,
    fontWeight: "700",
    textDecorationLine: "none",
  },
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
    borderColor: "#243d4d",
    borderRadius: 4,
    marginRight: 8,
  },
  rememberText: {
    color: "#243d4d",
    fontWeight: "600",
    fontSize: 14,
  },
  languageContainer: {
    marginTop: 10,
    width: "100%",
    alignItems: "flex-start",
  },
  background: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    zIndex: -50,
  },
});
