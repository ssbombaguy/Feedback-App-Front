import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

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

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
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
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F9C94D',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  dangerIcon: {
    backgroundColor: '#F44336',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: '#546E7A',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  confirmButton: {
    backgroundColor: '#F9C94D',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dangerButton: {
    backgroundColor: '#F44336',
  },
  cancelButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    color: '#2C3E50',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  dangerButton: {
    backgroundColor: '#F44336',
  },
  cancelButtonText: {
    color: '#2C3E50',
    fontSize: 15,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
})
