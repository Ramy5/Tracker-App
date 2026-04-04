import { tabs } from "@/constants/data";
import { colors, components } from "@/constants/theme";
import { useAuth } from "@clerk/expo";
import clsx from "clsx";
import { Redirect, Tabs } from "expo-router";
import {
  Image,
  type ImageSourcePropType,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const tabBar = components.tabBar;

const TabLayout = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const insets = useSafeAreaInsets();

  if (!isLoaded)
    return <View style={{ flex: 1, backgroundColor: "#fff9e3" }} />;
  if (!isSignedIn) return <Redirect href="/(auth)/sign-in" />;

  const screenOptions = {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: [
      styles.tabBarStyle,
      { bottom: Math.max(insets.bottom, tabBar.horizontalInset) },
    ],
    tabBarItemStyle: styles.tabBarItemStyle,
    tabBarIconStyle: styles.tabBarIconStyle,
  };

  return (
    <Tabs screenOptions={screenOptions}>
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused }) =>
              renderIcon({ focused, icon: tab.icon }),
          }}
        />
      ))}
      <Tabs.Screen name="subscriptions/[id]" options={{ href: null }} />
      <Tabs.Screen name="settings/edit-profile" options={{ href: null }} />
    </Tabs>
  );
};

// icon
const renderIcon = ({
  focused,
  icon,
}: {
  focused: boolean;
  icon: ImageSourcePropType;
}) => (
  <View className="tabs-icon">
    <View className={clsx("tabs-pill", focused && "tabs-active")}>
      <Image source={icon} resizeMode="contain" className="tabs-glyph" />
    </View>
  </View>
);

// styles
const styles = StyleSheet.create({
  tabBarStyle: {
    position: "absolute",

    height: tabBar.height,
    borderRadius: tabBar.radius,
    marginHorizontal: tabBar.horizontalInset,
    backgroundColor: colors.primary,
    borderTopWidth: 0,
    elevation: 0,
  },
  tabBarItemStyle: {
    height: tabBar.height,
    paddingVertical: tabBar.height / 2 - tabBar.iconFrame / 1.6,
  },
  tabBarIconStyle: {
    height: tabBar.iconFrame,
    width: tabBar.iconFrame,
    alignItems: "center",
  },
});

export default TabLayout;
