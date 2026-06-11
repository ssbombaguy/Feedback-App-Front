import { View, Text, Modal, ScrollView } from "react-native";
import { CustomButton } from "./CustomButton";
import { CustomInput } from "./CustomInput";
import React from "react";
import { makeStyles } from "./VerificationModal.styles";

import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";

import { useVerificationLogic } from "../../hooks/useVerificationLogic";

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

  const { state, setters, handlers } = useVerificationLogic({
    visible,
    verificationType,
    contact,
    onSendCode,
    onVerifyCode,
    onSuccess,
    onCancel,
  });

  const { code, step, timer, isVerifying } = state;
  const { setCode, setStep, setTimer } = setters;
  const { handleSendCode, handleVerifyCode, handleResend, handleCancel } =
    handlers;

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
