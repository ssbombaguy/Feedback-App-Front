import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

export const ProfileReadOnlyFields = ({ userProfile, theme }) => {
  const { t } = useTranslation();
  const styles = makeStyles(theme);

  const readOnlyFields = [
    { label: t("profile.firstName"), value: userProfile?.firstName },
    { label: t("profile.lastName"), value: userProfile?.lastName },
    { label: t("profile.privateNumber"), value: userProfile?.personalNumber },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{t("profile.readOnlyInfo")}</Text>
      <View style={styles.card}>
        {readOnlyFields.map((item, index) => (
          <View
            key={item.label}
            style={[
              styles.cardRow,
              index === readOnlyFields.length - 1 && { borderBottomWidth: 0 },
            ]}
          >
            <Text style={styles.cardLabel}>{item.label}</Text>
            <Text style={styles.cardValue} numberOfLines={1} ellipsizeMode="tail">
              {item.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const makeStyles = (theme) =>
  StyleSheet.create({
    container: {
      width: "100%",
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.subtext,
      marginBottom: 8,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    card: {
      backgroundColor: theme.card,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.border,
      paddingHorizontal: 16,
    },
    cardRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    cardLabel: {
      fontSize: 14,
      color: theme.label || "#666",
      fontWeight: "500",
    },
    cardValue: {
      fontSize: 14,
      color: theme.textSecondary || "#333",
      fontWeight: "600",
      flex: 1,
      textAlign: "right",
      marginLeft: 16,
    },
  });
