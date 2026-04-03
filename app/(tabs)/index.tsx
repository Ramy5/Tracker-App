import Subscriptions from "@/components/home/subscription/Subscriptions";
import "@/global.css";
import { styled } from "nativewind";
import { SafeAreaView as RN_SafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RN_SafeAreaView);

export default function App() {
  return (
    <SafeAreaView className="flex-1 p-5 bg-background">
      {/* SUBSCRIPTION */}
      <Subscriptions />
    </SafeAreaView>
  );
}
