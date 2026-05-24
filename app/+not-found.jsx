import React from "react";
import {} from "./+not-found.styles";

import { View, Text, Image, StatusBar } from "react-native";
import { CustomButton } from "../components/ui/CustomButton";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../assets/MziuriLogo.svg";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";

export default function NotFoundScreen() {
  const router = useRouter();
  const { theme, isDark } = useTheme();
  const styles = makeStyles(theme);
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

        <View style={styles.header}>
          <Logo style={styles.logoSmall} />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{t("notfound.title")}</Text>
          <Text style={styles.subtitle}>{t("notfound.subtitle")}</Text>

          <Text style={styles.message}>{t("notfound.message")}</Text>

          <CustomButton
            variant="custom"
            onPress={() => router.push("/(tabs)/(feedback)")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{t("notfound.goHome")}</Text>
          </CustomButton>

          <CustomButton
            variant="custom"
            onPress={() => router.push("")}
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryButtonText}>
              {t("notfound.reportProblem")}
            </Text>
          </CustomButton>
        </View>
      </View>
    </SafeAreaView>
  );
}
