import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import PropTypes from "prop-types";
import { CustomButton } from "../ui/CustomButton";
import Logo from "../../assets/MziuriLogo.svg";

export const RecoveryHeader = ({ handleBack, styles }) => {
  return (
    <>
      <CustomButton
        variant="custom"
        style={styles.backButton}
        onPress={handleBack}
      >
        <Ionicons name="arrow-back" size={24} color="#243d4d" />
      </CustomButton>

      <Logo style={styles.logo} />
    </>
  );
};

RecoveryHeader.propTypes = {
  handleBack: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
};
