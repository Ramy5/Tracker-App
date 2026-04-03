import GlobalHeader from "@/components/ui/GlobalHeader";
import { HOME_SUBSCRIPTIONS } from "@/constants/data";
import { useState } from "react";
import { FlatList, Text, View } from "react-native";
import Balance from "../balance/Balance";
import Header from "../header/Header";
import Upcoming from "../upcoming/Upcoming";
import SubscriptionItem from "./SubscriptionItem";

const SubscriptionList = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <FlatList
      ListHeaderComponent={() => (
        <View className="gap-5">
          {/* HEADER */}
          <Header />

          {/* BALANCE */}
          <Balance />

          {/* UPCOMING */}
          <Upcoming />

          <GlobalHeader title="All Subscriptions" />
        </View>
      )}
      data={HOME_SUBSCRIPTIONS}
      renderItem={({ item }) => (
        <SubscriptionItem
          {...item}
          onPress={() =>
            setExpandedId((prev) => (prev === item.id ? null : item.id))
          }
          expanded={expandedId === item.id}
        />
      )}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerClassName="gap-4 pb-28"
      ListEmptyComponent={
        <Text className="home-empty-state">No subscriptions found</Text>
      }
      extraData={expandedId}
    />
  );
};

export default SubscriptionList;
