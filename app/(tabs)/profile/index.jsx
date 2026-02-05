import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { logout } from "../../../utils/AsyncStorage";
import { phoneWidth } from "../../../constants/Dimensions";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import { getUser } from "../../../utils/AsyncStorage";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../../../components/LanguageSwitcher";
import { ConfirmationModal } from "../../../components/ConfirmationModal";
import { SafeAreaView } from "react-native-safe-area-context";

const profile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await getUser();
      setUser(storedUser);
    };

    loadUser();
  }, []);

  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      router.replace("/auth");
    } catch (error) {
      console.error("Logout error:", error);
      alert(t("common.error"));
    } finally {
      setIsLoggingOut(false);
      setShowLogoutConfirm(false);
    }
  };

  return (
    <>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require("../../../assets/mziuri-logo.png")}
          />
          <View style={{ marginTop: 16, marginBottom: 16 }}>
            <LanguageSwitcher />
          </View>
          {user ? (
            <View
              style={{ alignItems: "flex-start", width: "100%", marginTop: 30 }}
            >
              <View style={styles.profileHeader}>
                <Image
                  style={styles.profilePicture}
                  source={{
                    uri:
                      user?.profilePicture || "https://via.placeholder.com/150",
                  }}
                />
                <View style={styles.userBasicInfo}>
                  <Text style={styles.name}>{user?.name || ""}</Text>
                  <Text style={styles.lastname}>{user?.lastname || ""}</Text>
                  <Text style={styles.email}>{user?.email || ""}</Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  {t("profile.personalInfo")}
                </Text>

                <View style={styles.infoRow}>
                  <MaterialCommunityIcons
                    name="phone"
                    size={20}
                    color="#243d4d"
                    style={styles.icon}
                  />
                  <View style={styles.userBasicInfo}>
                    <Text style={styles.name}>{user?.name || ""}</Text>
                    <Text style={styles.lastname}>{user?.lastname || ""}</Text>
                    <Text style={styles.email}>{user?.email || ""}</Text>
                  </View>
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>
                    {t("profile.personalInfo")}
                  </Text>

                  <View style={styles.infoRow}>
                    <MaterialCommunityIcons
                      name="phone"
                      size={20}
                      color="#243d4d"
                      style={styles.icon}
                    />
                    <View style={styles.infoTextContainer}>
                      <Text style={styles.infoLabel}>{t("profile.phone")}</Text>
                      <Text style={styles.infoValue}>
                        {user?.phone || "N/A"}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.infoRow}>
                    <MaterialCommunityIcons
                      name="phone"
                      size={20}
                      color="#243d4d"
                      style={styles.icon}
                    />
                    <View style={styles.infoTextContainer}>
                      <Text style={styles.infoLabel}>
                        {t("profile.privateNumber")}
                      </Text>
                      <Text style={styles.infoValue}>
                        {user?.privateNumber || "N/A"}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.infoRow}>
                    <MaterialCommunityIcons
                      name="map-marker"
                      size={20}
                      color="#243d4d"
                      style={styles.icon}
                    />
                    <View style={styles.infoTextContainer}>
                      <Text style={styles.infoLabel}>{t("profile.town")}</Text>
                      <Text style={styles.infoValue}>
                        {user?.town || "N/A"}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.infoRow}>
                    <MaterialCommunityIcons
                      name="school"
                      size={20}
                      color="#243d4d"
                      style={styles.icon}
                    />
                    <View style={styles.infoTextContainer}>
                      <Text style={styles.infoLabel}>{t("profile.grade")}</Text>
                      <Text style={styles.infoValue}>
                        {user?.grade || "N/A"}
                      </Text>
                    </View>
                  </View>
                </View>

                {user?.courses?.active && (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                      {t("profile.activeCourse")}
                    </Text>
                    <View style={styles.courseCard}>
                      <View style={styles.courseHeader}>
                        <Text style={styles.courseName}>
                          {user.courses.active.courseName}
                        </Text>
                        <View style={styles.activeBadge}>
                          <Ionicons
                            name="checkmark-circle"
                            size={16}
                            color="#fff"
                          />
                          <Text style={styles.activeBadgeText}>Active</Text>
                        </View>
                      </View>
                      <View style={styles.courseContent}>
                        <View style={styles.courseInfo}>
                          <MaterialCommunityIcons
                            name="target"
                            size={16}
                            color="#243d4d"
                            style={styles.courseIcon}
                          />
                          <View>
                            <Text style={styles.courseLabel}>
                              {t("course.focusArea")}
                            </Text>
                            <Text style={styles.courseValue}>
                              {user.courses.active.focusArea}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.courseInfo}>
                          <MaterialCommunityIcons
                            name="human-greeting"
                            size={16}
                            color="#243d4d"
                            style={styles.courseIcon}
                          />
                          <View>
                            <Text style={styles.courseLabel}>
                              {t("course.teacher")}
                            </Text>
                            <Text style={styles.courseValue}>
                              {user.courses.active.teacher}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                )}

                {user?.courses?.passed && user.courses.passed.length > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                      {t("profile.completedCourses")} (
                      {user.courses.passed.length})
                    </Text>
                    {user.courses.passed.map((course, index) => (
                      <View key={index} style={styles.courseCard}>
                        <Text style={styles.courseName}>
                          {course.courseName}
                        </Text>
                        <View style={styles.courseContent}>
                          <View style={styles.courseInfo}>
                            <MaterialCommunityIcons
                              name="target"
                              size={16}
                              color="#243d4d"
                              style={styles.courseIcon}
                            />
                            <View>
                              <Text style={styles.courseLabel}>
                                {t("course.focusArea")}
                              </Text>
                              <Text style={styles.courseValue}>
                                {course.focusArea}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.courseInfo}>
                            <MaterialCommunityIcons
                              name="human-greeting"
                              size={16}
                              color="#243d4d"
                              style={styles.courseIcon}
                            />
                            <View>
                              <Text style={styles.courseLabel}>
                                {t("course.teacher")}
                              </Text>
                              <Text style={styles.courseValue}>
                                {course.teacher}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                )}

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => setShowLogoutConfirm(true)}
                  >
                    <Ionicons
                      name="log-out-outline"
                      size={20}
                      color="#243d4d"
                    />
                    <Text style={styles.logoutText}>{t("profile.logout")}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.container}>
              <Text style={styles.emptyText}>{t("profile.loading")}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <ConfirmationModal
        visible={showLogoutConfirm}
        title={t("profile.confirmLogout")}
        message={t("profile.confirmLogoutMessage")}
        confirmText={t("profile.yesLogout")}
        cancelText={t("common.cancel")}
        onConfirm={handleLogoutConfirm}
        onCancel={() => setShowLogoutConfirm(false)}
        isLoading={isLoggingOut}
        isDangerous={true}
      />
    </>
  );
};
export default profile;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    alignItems: "center",
    paddingHorizontal: 20,
    width: phoneWidth,
    paddingBottom: 40,
  },
  logo: {
    width: 180,
    height: 80,
    resizeMode: "contain",
    alignSelf: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    marginTop: 40,
  },
  profileHeader: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profilePicture: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginRight: 16,
    backgroundColor: "#e0e0e0",
  },
  userBasicInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#243d4d",
  },
  lastname: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    marginBottom: 4,
  },
  email: {
    fontSize: 12,
    color: "#999",
  },
  section: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#243d4d",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  icon: {
    marginRight: 12,
    marginTop: 2,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 2,
    fontWeight: "600",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#243d4d",
  },
  courseCard: {
    backgroundColor: "#f9f9f9",
    borderLeftWidth: 4,
    borderLeftColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  courseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  courseName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#243d4d",
    flex: 1,
  },
  activeBadge: {
    backgroundColor: "#4CAF50",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  activeBadgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#fff",
  },
  courseContent: {
    gap: 8,
  },
  courseInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  courseIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  courseLabel: {
    fontSize: 11,
    color: "#999",
    fontWeight: "600",
    marginBottom: 2,
  },
  courseValue: {
    fontSize: 13,
    fontWeight: "500",
    color: "#555",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 12,
  },
  logoutButton: {
    backgroundColor: "#F9C94D",
    borderRadius: 10,
    padding: 14,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 30,
  },
  logoutText: {
    fontSize: 16,
    color: "#243d4d",
    fontWeight: "700",
  },
});
