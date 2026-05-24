import { View, Text } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";
import { CustomInput } from "../ui/CustomInput";
import { makeStyles } from "./FeedbackField.styles";

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
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = makeStyles(theme);
  const hasError = touched && error;

  return (
    <View style={styles.fieldContainer}>
      <CustomInput
        label={
          <Text>
            {t(labelKey)}
            {isRequired && <Text style={styles.required}> *</Text>}
          </Text>
        }
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        error={hasError ? error : null}
        placeholder={t(placeholderKey)}
        multiline={multiline}
        numberOfLines={numberOfLines}
        editable={!isSubmitting}
        testID={`feedback-field-${name}`}
        accessibilityLabel={t(labelKey)}
        accessibilityHint={t(hintKey)}
        inputStyle={[styles.textarea, multiline && { minHeight: 100, textAlignVertical: "top" }]}
      />
      <Text style={styles.hint}>{t(hintKey)}</Text>
    </View>
  );
};

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
};
