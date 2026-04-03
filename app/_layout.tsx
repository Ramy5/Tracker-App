import "@/global.css";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

// Prevent the splash screen from auto hiding before fonts loaded
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "sans-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "sans-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "sans-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
    "sans-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    "sans-Regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "sans-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
