import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { showErrorToast, showSuccessToast } from "../utils/toastUtils";

export const useVerificationLogic = ({
  visible,
  verificationType,
  contact,
  onSendCode,
  onVerifyCode,
  onSuccess,
  onCancel,
}) => {
  const { t } = useTranslation();
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

  return {
    state: {
      code,
      step,
      timer,
      isVerifying,
    },
    setters: {
      setCode,
      setStep,
      setTimer,
    },
    handlers: {
      handleSendCode,
      handleVerifyCode,
      handleResend,
      handleCancel,
    },
  };
};
