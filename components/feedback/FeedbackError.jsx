import React from "react";
import { ScrollView, RefreshControl, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { CustomButton } from "../ui/CustomButton";
import Logo from "../../assets/MziuriLogo.svg";
import { getErrorMessage } from "../../utils/errorHandler";

export const FeedbackError = ({ styles, refreshing, onRefresh, rawError }) => {
  const { t } = useTranslation();
  const errorInfo = getErrorMessage(rawError);

  return (
    <SafeAreaView style={styles.centerContainer}>
      <ScrollView
        contentContainerStyle={styles.centerContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Logo style={styles.logo} />
        <Text style={styles.errorTitle}>{errorInfo.title}</Text>
        <Text style={styles.errorMessage}>{errorInfo.message}</Text>
        <CustomButton variant="custom" style={styles.retryButton} onPress={onRefresh}>
          <Text style={styles.retryButtonText}>
            {t("common.retry") || "Retry"}
          </Text>
        </CustomButton>
      </ScrollView>
    </SafeAreaView>
  );
};

FeedbackError.propTypes = {
  styles: PropTypes.object.isRequired,
  refreshing: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  rawError: PropTypes.any,
};
