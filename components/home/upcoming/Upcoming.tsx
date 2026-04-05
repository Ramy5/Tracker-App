import GlobalHeader from "@/components/ui/GlobalHeader";
import { View } from "react-native";
import UpcomingList from "./UpcomingList";

interface Subscription {
  id: string;
  name: string;
  price: number;
  currency?: string;
  billing?: string;
  status?: string;
  renewalDate?: string;
  category?: string;
}

interface Props {
  subscriptions: Subscription[];
}

const Upcoming = ({ subscriptions }: Props) => {
  return (
    <View className="gap-6">
      <GlobalHeader title="Upcoming" />
      <UpcomingList subscriptions={subscriptions} />
    </View>
  );
};

export default Upcoming;
