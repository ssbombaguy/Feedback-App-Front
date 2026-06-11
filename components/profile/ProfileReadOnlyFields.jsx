import React from "react";
import { makeStyles } from "./ProfileReadOnlyFields.styles";

import { View, Text } from "react-native";
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
            <Text
              style={styles.cardValue}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
