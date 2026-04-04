import { Image, Pressable, Text, View } from "react-native";

type ProfileCardProps = {
  fullName: string;
  email: string;
  imageUrl?: string;
  initials: string;
  onEditPress: () => void;
};

const ProfileCard = ({
  fullName,
  email,
  imageUrl,
  initials,
  onEditPress,
}: ProfileCardProps) => (
  <View className="mb-6 items-center rounded-3xl border border-border bg-card p-6">
    {imageUrl ? (
      <Image
        source={{ uri: imageUrl }}
        className="mb-4 size-20 rounded-full"
        resizeMode="cover"
      />
    ) : (
      <View className="mb-4 size-20 items-center justify-center rounded-full bg-accent">
        <Text className="text-2xl font-sans-bold text-background">
          {initials}
        </Text>
      </View>
    )}

    <Text className="text-2xl font-sans-bold text-primary">{fullName}</Text>
    <Text className="mt-1 text-sm font-sans-medium text-muted-foreground">
      {email}
    </Text>

    <Pressable
      onPress={onEditPress}
      className="mt-4 rounded-full border border-accent/30 bg-accent/10 px-5 py-2"
    >
      <Text className="text-sm font-sans-semibold text-accent">
        Edit profile
      </Text>
    </Pressable>
  </View>
);

export default ProfileCard;
