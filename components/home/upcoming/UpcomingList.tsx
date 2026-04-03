import { UPCOMING_SUBSCRIPTIONS } from "@/constants/data";
import { FlatList, Text } from "react-native";
import UpcomingItem from "./UpcomingItem";

const UpcomingList = () => {
  return (
    <FlatList
      data={UPCOMING_SUBSCRIPTIONS}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <UpcomingItem {...item} />}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-5"
      ListEmptyComponent={
        <Text className="home-empty-state">No upcoming subscriptions</Text>
      }
    />
  );
};

export default UpcomingList;
