import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { TextInput } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { showErrorToast, showSuccessToast } from "../utils/toastUtils";
import { useTranslation } from "react-i18next";

export const VerificationModal = ({
  visible,
  title,
  message,
  verificationType, // 'phone' or 'email'
  contact, // phone number or email
  onSuccess,
  onCancel,
  isLoading = false,
  onSendCode,
  onVerifyCode,
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = makeStyles(theme);
  const [code, setCode] = useState("");
  const [step, setStep] = useState("send"); // 'send', 'verify'
  const [timer, setTimer] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const timerIntervalRef = useRef(null);

  // Handle countdown timer
  useEffect(() => {
    if (timer > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(timerIntervalRef.current);
    }
    return () => clearInterval(timerIntervalRef.current);
  }, [timer]);

  // Reset state when modal closes
  useEffect(() => {
    if (!visible) {
      setCode("");
      setStep("send");
      setTimer(0);
      setIsVerifying(false);
    }
  }, [visible]);

  const handleSendCode = async () => {
    try {
      await onSendCode(contact);
      setStep("verify");
      setTimer(60);
      showSuccessToast(
        t("common.success"),
        t("verification.codeSent", { type: verificationType })
      );
    } catch (error) {
      showErrorToast(t("common.error"), error.message || t("verification.failedToSend"));
    }
  };

  const handleVerifyCode = async () => {
    if (code.length < 4) {
      showErrorToast(t("common.error"), t("verification.invalidCode"));
      return;
    }

    setIsVerifying(true);
    try {
      await onVerifyCode(contact, code);
      showSuccessToast(
        t("common.success"),
        t("verification.verified", { type: verificationType })
      );
      onSuccess();
    } catch (error) {
      showErrorToast(t("verification.verificationFailed"), error.message || t("verification.invalidCode"));
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setCode("");
    await handleSendCode();
  };

  const handleCancel = () => {
    setCode("");
    setStep("send");
    setTimer(0);
    onCancel();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleCancel}
    >
      <View style={styles.overlay}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.modalContainer}>
            {/* Header */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCancel}
              disabled={isLoading || isVerifying}
            >
              <Feather
                name="x"
                size={24}
                color={theme.textSecondary}
              />
            </TouchableOpacity>

            {/* Icon */}
            <View style={styles.iconContainer}>
              <Feather
                name={verificationType === "phone" ? "smartphone" : "mail"}
                size={48}
                color={theme.primary || "#243d4d"}
              />
            </View>

            {/* Content */}
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{message}</Text>

            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>{t("verification.verificationSentTo")}</Text>
              <Text style={styles.contactValue}>{contact}</Text>
            </View>

            {/* Step: Send Code */}
            {step === "send" && (
              <View style={styles.content}>
                <Text style={styles.stepDescription}>
                  {t("verification.sendCodeDescription", { type: verificationType })}
                </Text>

                <TouchableOpacity
                  style={[
                    styles.primaryButton,
                    (isLoading || isVerifying) && styles.buttonDisabled,
                  ]}
                  onPress={handleSendCode}
                  disabled={isLoading || isVerifying}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.primaryButtonText}>{t("verification.sendCode")}</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={handleCancel}
                  disabled={isLoading}
                >
                  <Text style={styles.secondaryButtonText}>{t("common.cancel")}</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Step: Verify Code */}
            {step === "verify" && (
              <View style={styles.content}>
                <Text style={styles.stepDescription}>
                  {t("verification.enterCodeDescription", { type: verificationType })}
                </Text>

                {/* Code Input */}
                <View style={styles.codeInputContainer}>
                  <TextInput
                    mode="outlined"
                    label={t("verification.verificationCode")}
                    value={code}
                    onChangeText={setCode}
                    keyboardType="number-pad"
                    maxLength={6}
                    placeholder="000000"
                    placeholderTextColor={theme.subtext}
                    style={styles.codeInput}
                    outlineColor={theme.borderLight}
                    activeOutlineColor={theme.primary}
                    textColor={theme.text}
                    selectionColor={theme.primary}
                  />
                </View>

                {/* Timer and Resend */}
                <View style={styles.timerContainer}>
                  {timer > 0 ? (
                    <Text style={styles.timerText}>
                      {t("verification.resendIn", { seconds: timer })}
                    </Text>
                  ) : (
                    <TouchableOpacity
                      onPress={handleResend}
                      disabled={isVerifying}
                    >
                      <Text style={styles.resendLink}>
                        {t("verification.didntReceiveCode")}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>

                {/* Verify Button */}
                <TouchableOpacity
                  style={[
                    styles.primaryButton,
                    (isVerifying || code.length < 4) &&
                      styles.buttonDisabled,
                  ]}
                  onPress={handleVerifyCode}
                  disabled={isVerifying || code.length < 4}
                >
                  {isVerifying ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.primaryButtonText}>
                      {t("verification.verifyCode")}
                    </Text>
                  )}
                </TouchableOpacity>

                {/* Back Button */}
                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={() => {
                    setCode("");
                    setStep("send");
                    setTimer(0);
                  }}
                  disabled={isVerifying}
                >
                  <Text style={styles.secondaryButtonText}>
                    {t("verification.change", { 
                      type: verificationType === "phone" ? t("profile.phone") : t("profile.email") 
                    })}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

VerificationModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  verificationType: PropTypes.oneOf(["phone", "email"]).isRequired,
  contact: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  onSendCode: PropTypes.func.isRequired,
  onVerifyCode: PropTypes.func.isRequired,
};

const makeStyles = (theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: theme.overlay,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: "center",
    },
    modalContainer: {
      backgroundColor: theme.modalBg,
      borderRadius: 20,
      paddingTop: 20,
      paddingHorizontal: 24,
      paddingBottom: 32,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 12,
      width: "100%",
      maxWidth: 380,
    },
    closeButton: {
      alignSelf: "flex-end",
      padding: 8,
      marginRight: -8,
      marginBottom: 8,
    },
    iconContainer: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: theme.primary + "15",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      marginBottom: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: "700",
      color: theme.text,
      textAlign: "center",
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 14,
      color: theme.subtext,
      textAlign: "center",
      lineHeight: 20,
      marginBottom: 20,
    },
    contactInfo: {
      backgroundColor: theme.card,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 12,
      marginBottom: 24,
      borderLeftWidth: 3,
      borderLeftColor: theme.primary,
    },
    contactLabel: {
      fontSize: 12,
      color: theme.subtext,
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: 0.5,
      marginBottom: 4,
    },
    contactValue: {
      fontSize: 14,
      color: theme.text,
      fontWeight: "600",
    },
    content: {
      marginTop: 8,
    },
    stepDescription: {
      fontSize: 14,
      color: theme.subtext,
      lineHeight: 20,
      marginBottom: 20,
      textAlign: "center",
    },
    codeInputContainer: {
      marginBottom: 16,
    },
    codeInput: {
      backgroundColor: theme.card,
      fontSize: 16,
      letterSpacing: 4,
      fontWeight: "600",
      textAlign: "center",
    },
    timerContainer: {
      alignItems: "center",
      marginBottom: 20,
      minHeight: 24,
    },
    timerText: {
      fontSize: 13,
      color: theme.subtext,
      fontWeight: "500",
    },
    resendLink: {
      fontSize: 13,
      color: theme.primary,
      fontWeight: "600",
      textDecorationLine: "underline",
    },
    primaryButton: {
      backgroundColor: theme.primary,
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 12,
    },
    secondaryButton: {
      borderWidth: 1.5,
      borderColor: theme.borderLight,
      paddingVertical: 12,
      borderRadius: 12,
      alignItems: "center",
    },
    primaryButtonText: {
      color: "#fff",
      fontSize: 15,
      fontWeight: "700",
      letterSpacing: 0.3,
    },
    secondaryButtonText: {
      color: theme.text,
      fontSize: 14,
      fontWeight: "600",
    },
    buttonDisabled: {
      opacity: 0.6,
    },
  });