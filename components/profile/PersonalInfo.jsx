import { View, Text, Linking } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";
import { CustomButton } from "../ui/CustomButton";
import { makeStyles } from "./PersonalInfo.styles";

const InfoRow = ({ icon, label, value, isLast = false, onPress }) => {
  const { theme } = useTheme();

  const styles = makeStyles(theme);

  const content = (
    <View style={[styles.infoRow, isLast && { borderBottomWidth: 0 }]}>
      <MaterialCommunityIcons
        name={icon}
        size={20}
        color="#243d4d"
        style={styles.icon}
      />
      <View style={styles.infoTextContainer}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={[styles.infoValue, onPress && styles.linkValue]}>
          {value || "N/A"}
        </Text>
      </View>
      {onPress && value ? (
        <MaterialCommunityIcons
          name="open-in-new"
          size={16}
          color="#243d4d"
          style={styles.linkIcon}
        />
      ) : null}
    </View>
  );

  if (onPress && value) {
    return (
      <CustomButton variant="custom" onPress={onPress}>
        {content}
      </CustomButton>
    );
  }
  return content;
};

export const PersonalInfo = ({ user }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = makeStyles(theme);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{t("profile.personalInfo")}</Text>

      <InfoRow
        icon="email-outline"
        label={t("profile.email")}
        value={user?.email}
      />
      <InfoRow
        icon="phone"
        label={t("profile.phone")}
        value={user?.phoneNumber}
      />
      <InfoRow
        icon="card-account-details"
        label={t("profile.privateNumber")}
        value={user?.personalNumber}
      />
      <InfoRow icon="map-marker" label={t("profile.town")} value={user?.city} />
      <InfoRow icon="school" label={t("profile.school")} value={user?.school} />
      <InfoRow
        icon="google-classroom"
        label={t("profile.grade")}
        value={user?.grade}
      />
      <InfoRow
        icon="linkedin"
        label={t("profile.linkedin")}
        value={user?.linkedinUrl}
        onPress={() => user?.linkedinUrl && Linking.openURL(user.linkedinUrl)}
      />
      <InfoRow
        icon="github"
        label={t("profile.github")}
        value={user?.githubUrl}
        onPress={() => user?.githubUrl && Linking.openURL(user.githubUrl)}
        isLast
      />
    </View>
  );
};
