import React from "react";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PropTypes from "prop-types";

export const FeedbackLoading = ({ styles }) => {
  return (
    <SafeAreaView style={styles.centerContainer}>
      <ActivityIndicator size="large" color="#243d4d" />
    </SafeAreaView>
  );
};

FeedbackLoading.propTypes = {
  styles: PropTypes.object.isRequired,
};
