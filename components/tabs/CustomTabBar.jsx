import { useTheme } from "../../context/ThemeContext";
import { View, StyleSheet } from "react-native";
import { Tabs, TabSlot, TabList, TabTrigger } from "expo-router/ui";
import TabButton from "./TabButton";
import Home from "../../assets/home.svg";
import Profile from "../../assets/profile.svg";

export default function CustomTabBar() {
  const { theme } = useTheme();
  const styles = makeStyles(theme);

  return (
    <Tabs>
      <TabSlot />
      <TabList asChild>
        <View style={styles.container}>
          <TabTrigger name="(feedback)" href="/(tabs)/(feedback)" asChild>
            <TabButton Icon={Home} />
          </TabTrigger>
          <TabTrigger name="profile" href="/(tabs)/profile" asChild>
            <TabButton Icon={Profile} />
          </TabTrigger>
        </View>
      </TabList>
    </Tabs>
  );
}

const makeStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      backgroundColor: theme.tabBar,
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
