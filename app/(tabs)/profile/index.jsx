import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { logout } from '../../../utils/AsyncStorage';
import { phoneWidth } from '../../../constants/Dimensions';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { getUser } from "../../../utils/AsyncStorage";

const profile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await getUser();
      setUser(storedUser);
    };

    loadUser();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../../assets/mziuri-logo.png")}
      />
      <View
        style={{ alignItems: "flex-start", width: "100%", marginTop: "50" }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: "50" }}>
          <FontAwesome name="user-circle-o" size={130} color="#243d4d" />
          <View style={{ gap: "10" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.nameTitle}>Name:  </Text>
              <Text style={styles.name}>{user?.name || " "}</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.nameTitle}>Last name:  </Text>
              <Text style={styles.name}>{user?.lastname || " "}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => logout().then(() => router.replace("/auth"))}
        >
          <Text style={styles.logoutText}>Logout</Text>
          <Ionicons name="log-out-outline" size={24} color="#243d4d" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginTop: "20" }}
          onPress={() => router.push("/+not-found")}
        >
          <Text>Go to Not Found Page</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    width: phoneWidth,
  },
  logo: {
    width: 180,
    height: 80,
    resizeMode: "contain",
    alignSelf: "center",
  },
  logoutButton: {
    backgroundColor: "#F9C94D",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    flexDirection: "row",
    width: 110,
    gap: 5,
    marginTop: 30,
  },
  logoutText: {
    fontSize: 18,
    color: "#243d4d",
    fontWeight: "700",
  },
  nameTitle: {
    fontSize: 20,
    color: "#243d4d",
    fontWeight: "500",
  },
  name: {
    fontSize: 20,
    color: "#243d4d",
  }
});
