// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
// } from "react-native";
// import { TextInput } from "react-native-paper";
// import { useRouter } from "expo-router";
// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import { useCurrentUserProfile } from "../../../api/useUser";
// import { userAPI } from "../../../api/apiClient";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Formik } from "formik";
// import * as Yup from "yup";
// import { Feather } from "@expo/vector-icons";
// import Logo from "../../../assets/MziuriLogo.svg";
// import YellowBg from "../../../assets/yellowBg.svg"
// import { useTranslation } from "react-i18next";
// import {useTheme} from "../../../context/ThemeContext";

// export default function EditProfile() {
//   const { t } = useTranslation();
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   const { theme } = useTheme();
//   const styles = makeStyles(theme);

//   const { userProfile } = useCurrentUserProfile();

//   const validationSchema = Yup.object().shape({
//     name: Yup.string()
//       .min(2, t("edit.min2"))
//       .required(t("edit.firstNameRequired")),
  
//     lastname: Yup.string()
//       .min(2, t("edit.min2"))
//       .required(t("edit.lastNameRequired")),
  
//     email: Yup.string()
//       .email(t("auth.invalidEmail"))
//       .required(t("auth.emailRequired")),
//   });

//   const updateMutation = useMutation({
//     mutationFn: (data) => userAPI.updateCurrentUser(data),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["currentUserProfile"]);
//       router.back();
//     },
//   });

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => router.back()}
//           style={styles.backButton}
//         >
//           <Feather name="chevron-left" size={20} color="#243E4D" />
//           <Text style={styles.backText}>{t("edit.back")}</Text>
//         </TouchableOpacity>

//         <Text style={styles.headerTitle}>{t("edit.editProfile")}</Text>
//         <View style={{ width: 60 }} />
//       </View>

//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         keyboardVerticalOffset={Platform.OS === "ios" ? 5 : 5}
//       >
//         <ScrollView contentContainerStyle={styles.container}>
//           <Logo style={styles.logo} />

//           <View style={styles.iconContainer}>
//             <FontAwesome name="user-circle-o" size={100} color="#243E4D" />
//             <Text style={styles.changePicture}>{t("edit.changePicture")}</Text>
//           </View>

//           <Formik
//             validationSchema={validationSchema}
//             initialValues={{
//               name: userProfile?.name || "",
//               lastname: userProfile?.lastname || "",
//               email: userProfile?.email || "",
//             }}
//             enableReinitialize
//             onSubmit={(values) => {
//               updateMutation.mutate(values);
//             }}
//           >
//             {({
//               handleChange,
//               handleBlur,
//               handleSubmit,
//               values,
//               errors,
//               touched,
//             }) => (
//               <>
//                 <View style={styles.inputGroup}>
//                   <TextInput
//                     style={[
//                       styles.input,
//                       errors.name && touched.name && styles.inputError,
//                     ]}
//                     labelStyle={{ fontSize: 16 }}
//                     outlineStyle={{
//                       borderWidth: 2,
//                       borderRadius: 15,
//                     }}
//                     value={values.name}
//                     mode="outlined"
//                     label={t("edit.firstName")}
//                     onChangeText={handleChange("name")}
//                     onBlur={handleBlur("name")}
//                   />
//                   {errors.name && touched.name && (
//                     <Text style={styles.errorText}>{errors.name}</Text>
//                   )}
//                 </View>
//                 <View style={styles.inputGroup}>
//                   <TextInput
//                     style={[
//                       styles.input,
//                       errors.lastname && touched.lastname && styles.inputError,
//                     ]}
//                     mode="outlined"
//                     label={t("edit.lastName")}
//                     labelStyle={{ fontSize: 16 }}
//                     outlineStyle={{
//                       borderWidth: 2,
//                       borderRadius: 15,
//                     }}
//                     value={values.lastname}
//                     onChangeText={handleChange("lastname")}
//                     onBlur={handleBlur("lastname")}
//                   />
//                   {errors.lastname && touched.lastname && (
//                     <Text style={styles.errorText}>{errors.lastname}</Text>
//                   )}
//                 </View>
//                 <View style={styles.inputGroup}>
//                   <TextInput
//                     style={[
//                       styles.input,
//                       errors.email && touched.email && styles.inputError,
//                     ]}
//                     mode="outlined"
//                     label={t("auth.email")}
//                     labelStyle={{ fontSize: 16 }}
//                     outlineStyle={{
//                       borderWidth: 2,
//                       borderRadius: 15,
//                     }}
//                     value={values.email}
//                     keyboardType="email-address"
//                     autoCapitalize="none"
//                     onChangeText={handleChange("email")}
//                     onBlur={handleBlur("email")}
//                   />
//                   {errors.email && touched.email && (
//                     <Text style={styles.errorText}>{errors.email}</Text>
//                   )}
//                 </View>

//                 <TouchableOpacity
//                   style={styles.updateButton}
//                   onPress={handleSubmit}
//                   disabled={updateMutation.isLoading}
//                 >
//                   <Text style={styles.buttonText}>
//                     {updateMutation.isLoading
//                       ? t("edit.isUpdating")
//                       : t("edit.update")}
//                   </Text>
//                 </TouchableOpacity>
//               </>
//             )}
//           </Formik>
//         </ScrollView>
//       </KeyboardAvoidingView>
//       <YellowBg style={styles.background} />
//     </SafeAreaView>
//   );
// }

// const makeStyles = (theme) =>
//   StyleSheet.create({
//     safeArea: {
//       flex: 1,
//       backgroundColor: theme.background,
//     },
//     header: {
//       flexDirection: "row",
//       alignItems: "center",
//       justifyContent: "space-between",
//       paddingHorizontal: 25,
//       paddingTop: 15,
//       paddingBottom: 10,
//       backgroundColor: theme.background,
//     },
//     backButton: {
//       flexDirection: "row",
//       alignItems: "center",
//       width: 60,
//     },
//     backText: {
//       color: theme.textSecondary,
//       fontWeight: "600",
//       marginLeft: 3,
//     },
//     headerTitle: {
//       fontSize: 18,
//       fontWeight: "700",
//       color: theme.textSecondary,
//     },
//     container: {
//       paddingHorizontal: 25,
//       paddingTop: 25,
//       paddingBottom: 40,
//       flexGrow: 1,
//     },
//     logo: {
//       width: 160,
//       height: 70,
//       alignSelf: "center",
//       marginBottom: 20,
//     },
//     iconContainer: {
//       alignItems: "center",
//       marginBottom: 30,
//     },
//     changePicture: {
//       marginTop: 6,
//       color: theme.textSecondary,
//       fontWeight: "650",
//       fontSize: 17,
//     },
//     background: {
//       position: "absolute",
//       bottom: 0,
//       width: "100%",
//       alignSelf: "center",
//     },
//     inputGroup: {
//       marginBottom: 20,
//     },

//     inputError: {
//       borderColor: theme.error,
//     },
//     input: {
//       borderRadius: 15,
//     },
//     errorText: {
//       marginTop: 4,
//       fontSize: 12,
//       color: theme.error,
//     },
//     updateButton: {
//       backgroundColor: theme.accent,
//       paddingVertical: 16,
//       borderRadius: 14,
//       alignItems: "center",
//       marginTop: 10,
//       shadowColor: "#000",
//       shadowOffset: { width: 0, height: 0 },
//       shadowOpacity: 0.25,
//       shadowRadius: 15,
//       elevation: 6,
//     },
//     buttonText: {
//       color: theme.textSecondary,
//       fontWeight: "700",
//       fontSize: 16,
//     },
//   });