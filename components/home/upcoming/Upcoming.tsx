import GlobalHeader from "@/components/ui/GlobalHeader";
import { View } from "react-native";
import UpcomingList from "./UpcomingList";

const Upcoming = () => {
  return (
    <View className="gap-6">
      <GlobalHeader title="Upcoming" />
      <UpcomingList />
    </View>
  );
};

export default Upcoming;
