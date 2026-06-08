import React from "react";
import { ScrollView, RefreshControl, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Logo from "../../assets/MziuriLogo.svg";

export const FeedbackEmpty = ({ styles, refreshing, onRefresh }) => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.centerContainer}>
      <ScrollView
        contentContainerStyle={styles.centerContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Logo style={styles.logo} />
        <Text style={styles.emptyText}>{t("common.error")}</Text>
        <Text style={styles.emptySubtext}>{t("feedback.subtitle")}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

FeedbackEmpty.propTypes = {
  styles: PropTypes.object.isRequired,
  refreshing: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
};
