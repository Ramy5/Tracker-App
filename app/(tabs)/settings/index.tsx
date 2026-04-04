import Divider from "@/components/settings/Divider";
import ProfileCard from "@/components/settings/ProfileCard";
import SectionLabel from "@/components/settings/SectionLabel";
import SettingsRow from "@/components/settings/SettingsRow";
import { useAuth, useUser } from "@clerk/expo";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView as RN_SafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RN_SafeAreaView);

const Settings = () => {
  const { signOut } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  const firstName = user?.firstName ?? "";
  const lastName = user?.lastName ?? "";
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "—";
  const email = user?.primaryEmailAddress?.emailAddress ?? "—";
  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleSignOut = () => {
    Alert.alert("Sign out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign out",
        style: "destructive",
        onPress: async () => {
          setSigningOut(true);
          try {
            await signOut();
            router.replace("/(auth)/sign-in");
          } catch {
            Alert.alert("Sign out failed", "Please try again.");
          } finally {
            setSigningOut(false);
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="mb-6 mt-4 text-3xl font-sans-bold text-primary">
          Settings
        </Text>

        <ProfileCard
          fullName={fullName}
          email={email}
          imageUrl={user?.imageUrl}
          initials={initials}
          onEditPress={() => router.push("/settings/edit-profile")}
        />

        <SectionLabel label="Account" />
        <View className="mb-6 rounded-2xl border border-border bg-card px-4">
          <SettingsRow
            label="Full name"
            value={fullName}
            onPress={() => router.push("/settings/edit-profile")}
            showChevron
          />
          <Divider />
          <SettingsRow label="Email" value={email} />
        </View>

        <SectionLabel label="Session" />
        <View className="rounded-2xl border border-border bg-card px-4">
          <SettingsRow
            label="Sign out"
            destructive
            onPress={handleSignOut}
            loading={signingOut}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
