import AuthField from "@/components/auth/AuthField";
import { useUser } from "@clerk/expo";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import { useState } from "react";
import { usePostHog } from "posthog-react-native";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView as RN_SafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RN_SafeAreaView);

const EditProfile = () => {
  const { user } = useUser();
  const router = useRouter();
  const posthog = usePostHog();

  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [avatarUri, setAvatarUri] = useState<string | null>(null); // URI for local storage
  const [avatarBase64, setAvatarBase64] = useState<string | null>(null); // base64 for Clerk upload
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const initialFirstName = user?.firstName ?? "";
  const initialLastName = user?.lastName ?? "";

  const hasChanged =
    firstName.trim() !== initialFirstName ||
    lastName.trim() !== initialLastName ||
    avatarUri !== null;

  const displayImage = avatarUri ?? user?.imageUrl;
  const initials = [firstName, lastName]
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "Please allow access to your photo library to change your profile picture.",
      );

      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled && result.assets[0]) {
      setAvatarUri(result.assets[0].uri);
      const { base64, mimeType } = result.assets[0];
      if (base64) {
        setAvatarBase64(`data:${mimeType ?? "image/jpeg"};base64,${base64}`);
      }
    }
  };

  const handleSave = async () => {
    if (!user) {
      setError("User data is still loading. Please try again.");
      return;
    }

    if (!firstName.trim()) {
      setError("First name is required");
      return;
    }

    setSaving(true);
    setError(undefined);

    try {
      if (avatarBase64) {
        setUploadingImage(true);
        await user.setProfileImage({ file: avatarBase64 });
        setUploadingImage(false);
      }

      await user.update({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });

      posthog.capture("profile_updated", {
        updated_name:
          firstName.trim() !== initialFirstName ||
          lastName.trim() !== initialLastName,
        updated_photo: !!avatarBase64,
      });

      router.back();
    } catch (e) {
      console.error(e);
      setError("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
      setUploadingImage(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View className="mb-8 mt-4 flex-row items-center gap-4">
          <Pressable
            onPress={() => router.back()}
            className="size-10 items-center justify-center rounded-full bg-muted"
          >
            <Text className="-mt-1 font-sans-bold text-2xl text-primary">
              ‹
            </Text>
          </Pressable>
          <Text className="text-2xl font-sans-bold text-primary">
            Edit profile
          </Text>
        </View>

        {/* ── Avatar picker ── */}
        <View className="mb-8 items-center">
          <Pressable onPress={handlePickImage} className="relative">
            {displayImage ? (
              <Image
                source={{ uri: displayImage }}
                className="size-24 rounded-full"
                resizeMode="cover"
              />
            ) : (
              <View className="size-24 items-center justify-center rounded-full bg-accent">
                <Text className="text-3xl font-sans-bold text-background">
                  {initials}
                </Text>
              </View>
            )}

            {/* camera badge */}
            <View className="absolute bottom-0 right-0 size-8 items-center justify-center rounded-full border-2 border-background bg-accent">
              {uploadingImage ? (
                <ActivityIndicator size="small" color="#fff9e3" />
              ) : (
                <Text className="text-xs text-background">✎</Text>
              )}
            </View>
          </Pressable>

          <Pressable onPress={handlePickImage} className="mt-3">
            <Text className="text-sm font-sans-semibold text-accent">
              Change photo
            </Text>
          </Pressable>
        </View>

        {/* ── Fields ── */}
        <View className="gap-4 rounded-3xl border border-border bg-card mb-4 p-5">
          <AuthField
            label="First name"
            placeholder="Enter your first name"
            value={firstName}
            onChangeText={(v) => {
              setFirstName(v);
              setError(undefined);
            }}
            error={error}
            autoCapitalize="words"
            textContentType="givenName"
          />

          <AuthField
            label="Last name"
            placeholder="Enter your last name"
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
            textContentType="familyName"
          />

          <AuthField
            label="Email"
            value={user?.primaryEmailAddress?.emailAddress ?? ""}
            editable={false}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
        </View>

        {/* ── Save button ── */}
        <Pressable
          className={`auth-button mt-6 ${!hasChanged || saving ? "auth-button-disabled" : ""}`}
          onPress={handleSave}
          disabled={!hasChanged || saving}
        >
          {saving ? (
            <ActivityIndicator color="#081126" />
          ) : (
            <Text className="auth-button-text">Save changes</Text>
          )}
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
