import dayjs from "dayjs";
import { FlatList, Text } from "react-native";
import UpcomingItem from "./UpcomingItem";

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

const UPCOMING_WINDOW_DAYS = 30;

const UpcomingList = ({ subscriptions }: Props) => {
  const upcoming = subscriptions
    .filter((s) => {
      if (s.status === "cancelled") return false;
      if (!s.renewalDate) return false;
      const daysLeft = dayjs(s.renewalDate).diff(dayjs(), "day");
      return daysLeft <= UPCOMING_WINDOW_DAYS;
    })
    .sort(
      (a, b) => dayjs(a.renewalDate).valueOf() - dayjs(b.renewalDate).valueOf(),
    );

  return (
    <FlatList
      data={upcoming}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <UpcomingItem
          id={item.id}
          name={item.name}
          price={item.price}
          renewalDate={item.renewalDate ?? ""}
          category={item.category}
        />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-5"
      ListEmptyComponent={
        <Text className="home-empty-state">No upcoming renewals</Text>
      }
    />
  );
};

export default UpcomingList;
