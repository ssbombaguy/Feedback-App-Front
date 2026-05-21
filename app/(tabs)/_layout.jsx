import { withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CustomTabBar from "../../components/tabs/CustomTabBar";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext(Navigator);

export default function Layout() {
  return (
    <MaterialTopTabs
      tabBar={(props) => <CustomTabBar {...props} />}
      tabBarPosition="bottom"
      screenOptions={{
        swipeEnabled: true,
      }}
    >
      <MaterialTopTabs.Screen name="(feedback)" />
      <MaterialTopTabs.Screen name="profile" />
    </MaterialTopTabs>
  );
}
