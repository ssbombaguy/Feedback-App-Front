import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useCurrentUserProfile } from "../../../api/useUser";
import { userAPI } from "../../../api/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as Yup from "yup";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../../context/ThemeContext";
import Logo from "../../../assets/MziuriLogo.svg";
import YellowBg from "../../../assets/yellowBg.svg"

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Must be at least 2 characters")
    .required("First name is required"),
  lastname: Yup.string()
    .min(2, "Must be at least 2 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
});

const makeStyles = (theme) =>
  StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 25,
      paddingTop: 15,
      paddingBottom: 10,
      backgroundColor: theme.background,
    },
    backButton: {
      flexDirection: "row",
      alignItems: "center",
      width: 60,
    },
    backText: {
      color: theme.textSecondary,
      fontWeight: "600",
      marginLeft: 3,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.textSecondary,
    },
    container: {
      paddingHorizontal: 25,
      paddingTop: 25,
      paddingBottom: 40,
      backgroundColor: theme.background,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      flexGrow: 1,
    },
    logo: {
      width: 160,
      height: 70,
      alignSelf: "center",
      marginBottom: 20,
    },
    iconContainer: {
      alignItems: "center",
      marginBottom: 30,
    },
    changePicture: {
      marginTop: 6,
      color: theme.textSecondary,
      fontWeight: "650",
      fontSize: 17,
    },
    background: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      alignSelf: "center",
    },
    inputGroup: {
      marginBottom: 20,
    },
    label: {
      marginBottom: 6,
      color: theme.textSecondary,
      fontSize: 14,
      fontWeight: "500",
    },
    input: {
      borderWidth: 2,
      borderColor: theme.borderInput,
      borderRadius: 15,
      paddingVertical: 14,
      paddingHorizontal: 16,
      fontSize: 15,
      color: theme.text,
      backgroundColor: theme.inputBg,
    },
    inputError: {
      borderColor: theme.error,
    },
    errorText: {
      marginTop: 4,
      fontSize: 12,
      color: theme.error,
    },
    button: {
      backgroundColor: theme.accent,
      paddingVertical: 16,
      borderRadius: 14,
      alignItems: "center",
      marginTop: 10,
    },
    buttonText: {
      color: theme.textSecondary,
      fontWeight: "700",
      fontSize: 16,
    },
  });

export default function EditProfile() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { theme } = useTheme();
  const styles = makeStyles(theme);

  const { userProfile } = useCurrentUserProfile();

  const updateMutation = useMutation({
    mutationFn: (data) => userAPI.updateCurrentUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUserProfile"]);
      router.back();
    },
  });

  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Feather name="chevron-left" size={20} color={theme.textSecondary} />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Edit Profile</Text>
          <View style={{ width: 60 }} />
        </View>

        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 5 : 5}
        >
          <ScrollView contentContainerStyle={styles.container}>
            <Logo
              style={styles.logo}
            />

            <View style={styles.iconContainer}>
              <FontAwesome name="user-circle-o" size={100} color={theme.textSecondary} />
              <Text style={styles.changePicture}>Change Picture</Text>
            </View>

            <Formik
              validationSchema={validationSchema}
              initialValues={{
                name: userProfile?.name || "",
                lastname: userProfile?.lastname || "",
                email: userProfile?.email || "",
              }}
              enableReinitialize
              onSubmit={(values) => {
                updateMutation.mutate(values);
              }}
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
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                      style={[
                        styles.input,
                        errors.name && touched.name && styles.inputError,
                      ]}
                      value={values.name}
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                    />
                    {errors.name && touched.name && (
                      <Text style={styles.errorText}>{errors.name}</Text>
                    )}
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                      style={[
                        styles.input,
                        errors.lastname &&
                          touched.lastname &&
                          styles.inputError,
                      ]}
                      value={values.lastname}
                      onChangeText={handleChange("lastname")}
                      onBlur={handleBlur("lastname")}
                    />
                    {errors.lastname && touched.lastname && (
                      <Text style={styles.errorText}>{errors.lastname}</Text>
                    )}
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                      style={[
                        styles.input,
                        errors.email && touched.email && styles.inputError,
                      ]}
                      value={values.email}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                    />
                    {errors.email && touched.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}
                  </View>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                    disabled={updateMutation.isLoading}
                  >
                    <Text style={styles.buttonText}>
                      {updateMutation.isLoading ? "Updating..." : "Update"}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>
    <YellowBg
      style={styles.background}
    />
      </SafeAreaView>
  );
}