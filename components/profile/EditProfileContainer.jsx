import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "../../context/ThemeContext";
import { useUser } from "../../hooks/useUser";
import { useEditProfileLogic } from "../../hooks/useEditProfileLogic";
import { makeStyles } from "../../app/(tabs)/profile/edit.styles";

export const EditProfileContainer = ({ children }) => {
  const { theme } = useTheme();
  const styles = makeStyles(theme);
  const { userProfile } = useUser();

  const { state, handlers } = useEditProfileLogic(userProfile);

  return children({
    theme,
    styles,
    userProfile,
    state,
    handlers,
  });
};

EditProfileContainer.propTypes = {
  children: PropTypes.func.isRequired,
};
