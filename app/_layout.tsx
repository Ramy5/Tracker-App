import "@/global.css";
import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useFonts } from "expo-font";
import {
  SplashScreen,
  Stack,
  useGlobalSearchParams,
  usePathname,
} from "expo-router";
import { useEffect, useRef } from "react";
import { PostHogProvider } from "posthog-react-native";
import { posthog } from "@/src/config/posthog";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

// Prevent the splash screen from auto hiding before fonts loaded
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const pathname = usePathname();
  const params = useGlobalSearchParams();
  const previousPathname = useRef<string | undefined>(undefined);

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

  // Manual screen tracking for Expo Router
  // @see https://posthog.com/docs/libraries/react-native#screen-tracking
  useEffect(() => {
    if (previousPathname.current !== pathname) {
      posthog.screen(pathname, {
        previous_screen: previousPathname.current ?? null,
        ...params,
      });
      previousPathname.current = pathname;
    }
  }, [pathname, params]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ClerkProvider
      publishableKey={publishableKey as string}
      tokenCache={tokenCache}
    >
      <PostHogProvider
        client={posthog}
        autocapture={{
          captureScreens: false,
          captureTouches: true,
          propsToCapture: ["testID"],
          maxElementsCaptured: 20,
        }}
      >
        <Stack screenOptions={{ headerShown: false }} />
      </PostHogProvider>
    </ClerkProvider>
  );
}
