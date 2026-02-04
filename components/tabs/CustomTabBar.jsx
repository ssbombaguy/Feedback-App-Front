import { View, StyleSheet } from "react-native";
import { Tabs, TabSlot, TabList, TabTrigger } from "expo-router/ui";
import TabButton from "./TabButton";
import homeIcon from "../../assets/home.png";
import profileIcon from "../../assets/profile.png";

export default function CustomTabBar() {
  return (
    <Tabs>
      <TabSlot />

      <TabList asChild>
        <View style={styles.container}>
          <TabTrigger name="(feedback)" href="/(tabs)/(feedback)" asChild>
            <TabButton iconSource={homeIcon} />
          </TabTrigger>

          <TabTrigger name="profile" href="/(tabs)/profile" asChild>
            <TabButton iconSource={profileIcon} />
          </TabTrigger>
        </View>
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#243E4D",
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 35,
    padding: 5,

    position: "absolute",
    bottom: 25,
    left: 0,
    right: 0,
  },
});
