import GlobalHeader from "@/components/ui/GlobalHeader";
import { HOME_SUBSCRIPTIONS } from "@/constants/data";
import { useMemo, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { usePostHog } from "posthog-react-native";
import Balance from "../balance/Balance";
import Header from "../header/Header";
import Upcoming from "../upcoming/Upcoming";
import SubscriptionItem from "./SubscriptionItem";

const SubscriptionList = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const posthog = usePostHog();

  const ListHeader = useMemo(
    () => (
      <View className="gap-5">
        {/* HEADER */}
        <Header />

        {/* BALANCE */}
        <Balance />

        {/* UPCOMING */}
        <Upcoming />

        <GlobalHeader title="All Subscriptions" />
      </View>
    ),
    [],
  );

  return (
    <FlatList
      ListHeaderComponent={ListHeader}
      data={HOME_SUBSCRIPTIONS}
      renderItem={({ item }) => (
        <SubscriptionItem
          {...item}
          onPress={() => {
            const isExpanding = expandedId !== item.id;
            setExpandedId((prev) => (prev === item.id ? null : item.id));
            if (isExpanding) {
              posthog.capture("subscription_viewed", {
                subscription_id: item.id,
                subscription_name: item.name,
                subscription_category: item.category ?? null,
              });
            }
          }}
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
