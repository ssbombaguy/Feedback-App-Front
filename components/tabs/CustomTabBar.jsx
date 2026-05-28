import React from "react";
import {makeStyles} from "./CustomTabBar.styles";

import { View } from "react-native";
import TabButton from "./TabButton";
import Home from "../../assets/home.svg";
import Profile from "../../assets/profile.svg";
import { useTheme } from "../../context/ThemeContext";

export default function CustomTabBar({ state, navigation }) {
  const { theme } = useTheme();
  const styles = makeStyles(theme);

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const Icon = route.name === "(feedback)" ? Home : Profile;

        return (
          <TabButton
            key={route.key}
            Icon={Icon}
            isFocused={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
          />
        );
      })}
    </View>
  );
}
