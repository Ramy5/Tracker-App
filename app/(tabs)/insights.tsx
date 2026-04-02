import { styled } from "nativewind";
import { Text } from "react-native";
import { SafeAreaView as RN_SafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RN_SafeAreaView);

const Insights = () => {
  return (
    <SafeAreaView className="flex-1 p-5 bg-background">
      <Text>Insight</Text>
    </SafeAreaView>
  );
};

export default Insights;
