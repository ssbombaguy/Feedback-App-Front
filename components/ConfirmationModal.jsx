import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useTheme } from '../context/ThemeContext'

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
  const {theme} = useTheme();
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
          <View style={[styles.iconContainer, isDangerous && styles.dangerIcon]}>
            <MaterialIcons
              name={isDangerous ? 'warning' : 'help'}
              size={40}
              color="#fff"
            />
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.confirmButton,
                isDangerous && styles.dangerButton,
                isLoading && styles.buttonDisabled,
              ]}
              onPress={onConfirm}
              disabled={isLoading}
            >
              <Text style={styles.confirmButtonText}>{confirmText}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.cancelButton, isLoading && styles.buttonDisabled]}
              onPress={onCancel}
              disabled={isLoading}
            >
              <Text style={styles.cancelButtonText}>{cancelText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

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
}

const makeStyles = (theme) => StyleSheet.create({
  overlay: { flex: 1, backgroundColor: theme.overlay, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  modalContainer: {
    backgroundColor: theme.modalBg,
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    width: '100%',
    maxWidth: 340,
  },
  iconContainer: {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: theme.accent,
    justifyContent: 'center', alignItems: 'center', marginBottom: 16,
  },
  dangerIcon: { backgroundColor: theme.error },
  title: { fontSize: 18, fontWeight: '700', color: theme.text, marginBottom: 8, textAlign: 'center' },
  message: { fontSize: 14, color: theme.subtext, marginBottom: 24, textAlign: 'center', lineHeight: 20 },
  buttonContainer: { width: '100%', gap: 12 },
  confirmButton: { backgroundColor: theme.accent, paddingVertical: 14, borderRadius: 8, alignItems: 'center' },
  dangerButton: { backgroundColor: theme.error },
  cancelButton: { backgroundColor: theme.disabled, paddingVertical: 14, borderRadius: 8, alignItems: 'center' },
  confirmButtonText: { color: theme.text, fontSize: 15, fontWeight: '700', letterSpacing: 0.5 },
  cancelButtonText: { color: theme.text, fontSize: 15, fontWeight: '600' },
  buttonDisabled: { opacity: 0.6 },
})