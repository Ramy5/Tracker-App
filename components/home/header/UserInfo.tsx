import { useUser } from "@clerk/expo";
import { Image, Text, View } from "react-native";

const UserInfo = () => {
  const { user } = useUser();

  return (
    <View className="flex-row items-center gap-2">
      {user?.imageUrl ? (
        <Image
          source={{ uri: user?.imageUrl }}
          className="w-10 h-10 rounded-full"
          resizeMode="cover"
        />
      ) : (
        <Image
          source={require("@/assets/images/avatar.png")}
          className="w-10 h-10 rounded-full"
          resizeMode="cover"
        />
      )}

      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        className="font-sans-bold text-xl max-w-37.5"
      >
        {user?.fullName ?? "—"}
      </Text>
    </View>
  );
};

export default UserInfo;
