import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { makeStyles } from "./ProfileHeader.styles";

import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { useTheme } from "../../context/ThemeContext";

export const ProfileHeader = ({ user }) => {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = makeStyles(theme);
  const photoUri = user?.photo
    ? `${process.env.EXPO_PUBLIC_API_URL.replace(/\/api\/v1\/?$/, "")}${user.photo}`
    : null;
  return (
    <View style={styles.profileHeader}>
      <Image
        style={styles.profilePicture}
        source={{ uri: photoUri || "https://via.placeholder.com/150" }}
      />

      <View style={styles.userBasicInfo}>
        <Text style={styles.name}>{user?.firstName || ""}</Text>
        <Text style={styles.lastname}>{user?.lastName || ""}</Text>
        <Text style={styles.email}>{user?.email || ""}</Text>
      </View>

      <Pressable onPress={() => router.push("/profile/edit")}>
        <AntDesign name="edit" size={25} color="#243E4D" />
      </Pressable>
    </View>
  );
};
