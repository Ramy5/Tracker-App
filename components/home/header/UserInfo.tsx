import { Image, Text, View } from "react-native";

const UserInfo = () => {
  return (
    <View className="flex-row items-center gap-2">
      <Image
        source={require("@/assets/images/ramy.jpeg")}
        className="w-10 h-10 rounded-full"
        resizeMode="cover"
      />

      <Text className="font-sans-bold text-xl">Ramy Sabry</Text>
    </View>
  );
};

export default UserInfo;
