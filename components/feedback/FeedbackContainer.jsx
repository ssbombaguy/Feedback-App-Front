import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "../../context/ThemeContext";
import { makeStyles } from "../../app/(tabs)/(feedback)/index.styles";
import { useFeedbackListLogic } from "../../hooks/useFeedbackListLogic";
import { FeedbackLoading } from "./FeedbackLoading";
import { FeedbackError } from "./FeedbackError";
import { FeedbackEmpty } from "./FeedbackEmpty";

export const FeedbackContainer = ({ children }) => {
  const { theme } = useTheme();
  const styles = makeStyles(theme);

  const { state, setters, handlers } = useFeedbackListLogic();
  
  const {
    refreshing,
    isLoading,
    isError,
    rawError,
    courses,
  } = state;

  const { onRefresh } = handlers;

  if (isLoading && !refreshing) {
    return <FeedbackLoading styles={styles} />;
  }

  if (isError) {
    return (
      <FeedbackError
        styles={styles}
        refreshing={refreshing}
        onRefresh={onRefresh}
        rawError={rawError}
      />
    );
  }

  if (courses.length === 0) {
    return (
      <FeedbackEmpty
        styles={styles}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    );
  }

  return children({ state, setters, handlers, styles });
};

FeedbackContainer.propTypes = {
  children: PropTypes.func.isRequired,
};
