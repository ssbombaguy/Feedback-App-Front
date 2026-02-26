import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { router } from 'expo-router'
import { phoneWidth } from '../../constants/Dimensions'
import { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../context/ThemeContext'

import Question from "../../assets/question.svg"
import Logo from "../../assets/MziuriLogo.svg"
import GreyBg from "../../assets/greyBg.svg"


const EmailSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Enter a valid email'),
})
const CodeSchema = Yup.object().shape({
  code: Yup.string().required('Code is required').length(6, 'Code must be 6 characters'),
})
const PasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required').min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Must contain at least one capital letter')
    .matches(/[0-9]/, 'Must contain at least one number')
    .matches(/[^A-Za-z0-9]/, 'Must contain at least one symbol'),
  confirmPassword: Yup.string().required('Confirm password is required').oneOf([Yup.ref('password')], 'Passwords must match'),
})

export default function PasswordRecovery() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const styles = makeStyles(theme)
  const [step, setStep] = useState('email')
  const [userEmail, setUserEmail] = useState('')
  const [generatedCode] = useState('123456')

  const handleEmailSubmit = (values) => {
    setUserEmail(values.email)
    Alert.alert('Success', 'Code sent to your email: 123456')
    setStep('code')
  }

  const handleCodeSubmit = (values) => {
    if (values.code !== generatedCode) { Alert.alert('Error', 'Invalid code. Please try again'); return }
    Alert.alert('Success', 'Code verified! Now set your new password')
    setStep('password')
  }

  const handlePasswordSubmit = () => {
    Alert.alert('Success', 'Your password has been reset successfully!', [{ text: 'OK', onPress: () => router.replace('/auth') }])
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={5}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => { if (step === 'email') { router.back() } else { setStep('email'); setUserEmail('') } }}
          >
            <Ionicons name="arrow-back" size={24} color={theme.textSecondary} />
          </TouchableOpacity>

          <Logo
            style={styles.logo}
          />

          {step === 'email' && (
            <Formik initialValues={{ email: '' }} validationSchema={EmailSchema} onSubmit={handleEmailSubmit}>
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <>
                  <Question
                    style={styles.roundedImage}
                  />
                  <Text style={styles.title}>
                    {t("recovery.forgotPassword")}
                  </Text>
                  <Text style={styles.subtitle}>
                    {t("recovery.resetPasswordInstruction")}
                  </Text>

                  <TextInput
                    placeholder={t('recovery.enterEmail')}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    style={[styles.input, touched.email && errors.email && styles.inputError]}
                    placeholderTextColor={theme.label}
                  />
                  {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
                  <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>{t('recovery.confirm')}</Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          )}

          {step === 'code' && (
            <Formik initialValues={{ code: '' }} validationSchema={CodeSchema} onSubmit={handleCodeSubmit}>
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <>
                  <Text style={styles.title}>{t('recovery.verifyCode')}</Text>
                  <Text style={styles.subtitle}>{t('recovery.codeSent', { email: userEmail })}</Text>
                  <TextInput
                    placeholder="000000"
                    keyboardType="number-pad"
                    maxLength={6}
                    value={values.code}
                    onChangeText={handleChange('code')}
                    onBlur={handleBlur('code')}
                    style={[styles.input, styles.codeInput, touched.code && errors.code && styles.inputError]}
                    placeholderTextColor={theme.label}
                  />
                  {touched.code && errors.code && <Text style={styles.error}>{errors.code}</Text>}
                  <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>{t('recovery.verifyCode')}</Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          )}

          {step === 'password' && (
            <Formik initialValues={{ password: '', confirmPassword: '' }} validationSchema={PasswordSchema} onSubmit={handlePasswordSubmit}>
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <>
                  <Text style={styles.title}>{t('recovery.setNewPassword')}</Text>
                  <Text style={styles.subtitle}>{t('recovery.createPasswordInstruction')}</Text>
                  <TextInput
                    placeholder="New Password"
                    secureTextEntry
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    style={[styles.input, touched.password && errors.password && styles.inputError]}
                    placeholderTextColor={theme.label}
                  />
                  {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
                  <TextInput
                    placeholder="Confirm Password"
                    secureTextEntry
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    style={[styles.input, touched.confirmPassword && errors.confirmPassword && styles.inputError]}
                    placeholderTextColor={theme.label}
                  />
                  {touched.confirmPassword && errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}
                  <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>{t('recovery.resetPassword')}</Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          )}
        </View>
      </KeyboardAvoidingView>
      <GreyBg
        style={styles.background}
      />
    </SafeAreaView>
  )
}

const makeStyles = (theme) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.background },
  keyboardView: { flex: 1 },
  container: { flex: 1, justifyContent: 'flex-start', padding: 24, paddingHorizontal: 50, width: phoneWidth },
  backButton: { position: 'absolute', top: 40, left: 24, zIndex: 10 },
  logo: { width: 220, height: 120, resizeMode: 'contain', alignSelf: 'center', marginBottom: 24 },
  title: { fontSize: 30, fontWeight: '700', color: theme.textSecondary, marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 14, color: theme.hint, marginBottom: 24, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: theme.borderInput,
    borderRadius: 15,
    padding: 14,
    marginBottom: 6,
    fontSize: 16,
    color: theme.text,
    backgroundColor: theme.inputBg,
  },
  codeInput: { letterSpacing: 8, fontSize: 24, textAlign: 'center' },
  inputError: { borderColor: theme.error },
  error: { color: theme.error, marginBottom: 12, fontSize: 12 },
  button: { backgroundColor: theme.accent, padding: 16, borderRadius: 15, alignItems: 'center', marginTop: 16 },
  buttonText: { color: theme.textSecondary, fontSize: 17, fontWeight: '600' },
  roundedImage: { marginBottom: 15, alignSelf: 'center', marginTop: 80 },
  background: { position: 'absolute', bottom: 0, width: '100%', zIndex: -50 },
})