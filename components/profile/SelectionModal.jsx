import React from "react";
import {makeStyles} from "./SelectionModal.styles";

import {
  View,
  Text,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import { CustomButton } from "../ui/CustomButton";
import Ionicons from "@expo/vector-icons/Ionicons";

export const SelectionModal = ({
  visible,
  title,
  options,
  selectedValue,
  onSelect,
  onClose,
  theme,
}) => {
  const styles = makeStyles(theme);

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.modalCard} onStartShouldSetResponder={() => true}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <CustomButton variant="custom" onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={theme.text} />
            </CustomButton>
          </View>

          <ScrollView
            style={styles.optionsList}
            showsVerticalScrollIndicator={false}
          >
            {options.map((option) => {
              const isSelected = option.value === selectedValue;
              return (
                <CustomButton
                  variant="custom"
                  key={option.value}
                  style={[
                    styles.optionRow,
                    isSelected && styles.optionRowSelected,
                  ]}
                  onPress={() => {
                    onSelect(option.value);
                    onClose();
                  }}
                >
                  <Text
                    style={[
                      styles.optionLabel,
                      isSelected && styles.optionLabelSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                  {isSelected && (
                    <Ionicons
                      name="checkmark-circle"
                      size={22}
                      color="#243d4d"
                    />
                  )}
                </CustomButton>
              );
            })}
          </ScrollView>
        </View>
      </Pressable>
    </Modal>
  );
};
