import { View, Text, Modal } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "../context/ThemeContext";
import { CustomButton } from "./ui/CustomButton";
import { makeStyles } from "./ConfirmationModal.styles";

export const ConfirmationModal = ({
  visible,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  isLoading = false,
  isDangerous = false,
}) => {
  const { theme } = useTheme();
  const styles = makeStyles(theme);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View
            style={[styles.iconContainer, isDangerous && styles.dangerIcon]}
          >
            <MaterialIcons
              name={isDangerous ? "warning" : "help"}
              size={40}
              color="#fff"
            />
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttonContainer}>
            <CustomButton
              variant={isDangerous ? "danger" : "primary"}
              title={confirmText}
              onPress={onConfirm}
              isPending={isLoading}
              style={[styles.confirmButton, isDangerous && styles.dangerButton]}
            />

            <CustomButton
              variant="secondary"
              title={cancelText}
              onPress={onCancel}
              disabled={isLoading}
              style={styles.cancelButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  confirmText: PropTypes.string.isRequired,
  cancelText: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  isDangerous: PropTypes.bool,
};
