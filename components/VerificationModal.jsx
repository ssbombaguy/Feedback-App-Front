import {
  View,
  Text,
  Modal,
  ScrollView,
} from "react-native";
import { CustomButton } from "./ui/CustomButton";
import { CustomInput } from "./ui/CustomInput";
import React, { useState, useRef, useEffect } from "react";
import {} from "./VerificationModal.styles";

import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { showErrorToast, showSuccessToast } from "../utils/toastUtils";
import { useTranslation } from "react-i18next";

export const VerificationModal = ({
  visible,
  title,
  message,
  verificationType,
  contact,
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
  const [step, setStep] = useState("send");
  const [timer, setTimer] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const timerIntervalRef = useRef(null);

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
        t("verification.codeSent", { type: verificationType }),
      );
    } catch (error) {
      showErrorToast(
        t("common.error"),
        error.message || t("verification.failedToSend"),
      );
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
        t("verification.verified", { type: verificationType }),
      );
      onSuccess();
    } catch (error) {
      showErrorToast(
        t("verification.verificationFailed"),
        error.message || t("verification.invalidCode"),
      );
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
            <CustomButton
              variant="custom"
              style={styles.closeButton}
              onPress={handleCancel}
              disabled={isLoading || isVerifying}
            >
              <Feather name="x" size={24} color={theme.textSecondary} />
            </CustomButton>

            <View style={styles.iconContainer}>
              <Feather
                name={verificationType === "phone" ? "smartphone" : "mail"}
                size={48}
                color={theme.primary || "#243d4d"}
              />
            </View>

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{message}</Text>

            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>
                {t("verification.verificationSentTo")}
              </Text>
              <Text style={styles.contactValue}>{contact}</Text>
            </View>

            {step === "send" && (
              <View style={styles.content}>
                <Text style={styles.stepDescription}>
                  {t("verification.sendCodeDescription", {
                    type: verificationType,
                  })}
                </Text>

                <CustomButton
                  variant="primary"
                  title={t("verification.sendCode")}
                  onPress={handleSendCode}
                  isPending={isLoading || isVerifying}
                  style={styles.primaryButton}
                />

                <CustomButton
                  variant="secondary"
                  title={t("common.cancel")}
                  onPress={handleCancel}
                  disabled={isLoading}
                  style={styles.secondaryButton}
                />
              </View>
            )}

            {step === "verify" && (
              <View style={styles.content}>
                <Text style={styles.stepDescription}>
                  {t("verification.enterCodeDescription", {
                    type: verificationType,
                  })}
                </Text>

                <View style={styles.codeInputContainer}>
                  <CustomInput
                    variant="bordered"
                    label={t("verification.verificationCode")}
                    value={code}
                    onChangeText={setCode}
                    keyboardType="number-pad"
                    maxLength={6}
                    placeholder="000000"
                    placeholderTextColor={theme.subtext}
                    inputStyle={styles.codeInput}
                  />
                </View>

                <View style={styles.timerContainer}>
                  {timer > 0 ? (
                    <Text style={styles.timerText}>
                      {t("verification.resendIn", { seconds: timer })}
                    </Text>
                  ) : (
                    <CustomButton
                      variant="custom"
                      onPress={handleResend}
                      disabled={isVerifying}
                    >
                      <Text style={styles.resendLink}>
                        {t("verification.didntReceiveCode")}
                      </Text>
                    </CustomButton>
                  )}
                </View>

                <CustomButton
                  variant="primary"
                  title={t("verification.verifyCode")}
                  onPress={handleVerifyCode}
                  isPending={isVerifying}
                  disabled={code.length < 4}
                  style={styles.primaryButton}
                />

                <CustomButton
                  variant="secondary"
                  title={t("verification.change", {
                    type:
                      verificationType === "phone"
                        ? t("profile.phone")
                        : t("profile.email"),
                  })}
                  onPress={() => {
                    setCode("");
                    setStep("send");
                    setTimer(0);
                  }}
                  disabled={isVerifying}
                  style={styles.secondaryButton}
                />
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
