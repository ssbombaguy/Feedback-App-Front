import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../context/ThemeContext'

export const FeedbackField = ({
  name,
  labelKey,
  hintKey,
  placeholderKey,
  value,
  onChangeText,
  onBlur,
  error,
  touched,
  isSubmitting,
  isRequired = true,
  multiline = true,
  numberOfLines = 4,
}) => {
  const { t } = useTranslation()
  const { theme } = useTheme();
  const styles = makeStyles(theme);
  const hasError = touched && error

  return (
    <View style={styles.fieldContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>
          {t(labelKey)}
          {isRequired && <Text style={styles.required}> *</Text>}
        </Text>
      </View>
      <Text style={styles.hint}>{t(hintKey)}</Text>
      <TextInput
        style={[
          styles.textarea,
          hasError && styles.inputError,
        ]}
        placeholder={t(placeholderKey)}
        placeholderTextColor="#999"
        multiline={multiline}
        numberOfLines={numberOfLines}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        textAlignVertical="top"
        editable={!isSubmitting}
        testID={`feedback-field-${name}`}
        accessibilityLabel={t(labelKey)}
        accessibilityHint={t(hintKey)}
        keyboardType="default"
        allowFontScaling={true}
        autoCorrect={false}
        spellCheck={false}
      />
      {hasError && (
        <Text style={styles.errorText} testID={`error-${name}`}>
          {error}
        </Text>
      )}
    </View>
  )
}

FeedbackField.propTypes = {
  name: PropTypes.string.isRequired,
  labelKey: PropTypes.string.isRequired,
  hintKey: PropTypes.string.isRequired,
  placeholderKey: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  error: PropTypes.string,
  touched: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  isRequired: PropTypes.bool,
  multiline: PropTypes.bool,
  numberOfLines: PropTypes.number,
}

const makeStyles = (theme) => StyleSheet.create({
  fieldContainer: { marginBottom: 20 },
  labelContainer: { flexDirection: 'row', alignItems: 'center' },
  label: { fontSize: 14, fontWeight: '700', color: theme.text, marginBottom: 4 },
  required: { color: theme.error },
  hint: { fontSize: 12, fontStyle: 'italic', color: theme.hint, marginBottom: 8 },
  textarea: {
    borderWidth: 1,
    borderColor: theme.borderInput,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: theme.text,
    backgroundColor: theme.inputBg,
    minHeight: 100,
  },
  inputError: { borderColor: theme.error, backgroundColor: theme.errorBg },
  errorText: { color: theme.error, fontSize: 12, marginTop: 6, fontWeight: '600' },
})