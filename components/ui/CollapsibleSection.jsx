import React, { useState } from "react";
import { View, Text, LayoutAnimation, UIManager, Platform } from "react-native";
import { CustomButton } from "./CustomButton";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "../../context/ThemeContext";
import { makeStyles } from "./CollapsibleSection.styles";
import PropTypes from "prop-types";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const CollapsibleSection = ({
  title,
  children,
  defaultExpanded = false,
  containerStyle,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const { theme } = useTheme();
  const styles = makeStyles(theme);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <CustomButton
        variant="custom"
        onPress={toggleExpand}
        style={styles.header}
      >
        <Text style={styles.title}>{title}</Text>
        <MaterialCommunityIcons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={24}
          color={theme.text}
          style={styles.icon}
        />
      </CustomButton>
      {expanded && <View style={styles.content}>{children}</View>}
    </View>
  );
};

CollapsibleSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  defaultExpanded: PropTypes.bool,
  containerStyle: PropTypes.object,
};
