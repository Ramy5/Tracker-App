import "@/global.css";
import { styled } from "nativewind";
import { Text, View } from "react-native";
import { SafeAreaView as RN_SafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RN_SafeAreaView);

export default function App() {
  return (
    <SafeAreaView className="flex-1 p-5 bg-background">
      <View className="">
        <Text className="text-7xl font-sans-extrabold text-blue-500">Home</Text>
        <Text className="text-7xl font-extrabold text-blue-500">Home</Text>
      </View>
    </SafeAreaView>
  );
}
