import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "../../context/ThemeContext";
import { usePasswordRecoveryLogic } from "../../hooks/usePasswordRecoveryLogic";
import { makeStyles } from "../../app/auth/recovery.styles";

export const RecoveryContainer = ({ children }) => {
  const { theme } = useTheme();
  const styles = makeStyles(theme);

  const { state, handlers } = usePasswordRecoveryLogic();

  return children({
    theme,
    styles,
    state,
    handlers,
  });
};

RecoveryContainer.propTypes = {
  children: PropTypes.func.isRequired,
};
