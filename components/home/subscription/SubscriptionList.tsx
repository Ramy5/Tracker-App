import CreateSubscriptionModal, {
  type NewSubscription,
} from "@/components/CreateSubscriptionModal";
import GlobalHeader from "@/components/ui/GlobalHeader";
import { HOME_SUBSCRIPTIONS } from "@/constants/data";
import { usePostHog } from "posthog-react-native";
import { useMemo, useState } from "react";
import { FlatList, Text, View } from "react-native";
import Balance from "../balance/Balance";
import Header from "../header/Header";
import Upcoming from "../upcoming/Upcoming";
import SubscriptionItem from "./SubscriptionItem";

// Merge NewSubscription into the shape SubscriptionItem expects
type AnySubscription = (typeof HOME_SUBSCRIPTIONS)[0] | NewSubscription;

const SubscriptionList = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [subscriptions, setSubscriptions] =
    useState<AnySubscription[]>(HOME_SUBSCRIPTIONS);
  const posthog = usePostHog();

  const handleAdd = (subscription: NewSubscription) => {
    setSubscriptions((prev) => [subscription, ...prev]);
  };

  const handleDelete = (id: string) => {
    setSubscriptions((prev) => prev.filter((s) => s.id !== id));
    setExpandedId((prev) => (prev === id ? null : prev));
  };

  const ListHeader = useMemo(
    () => (
      <View className="gap-5">
        <Header onAdd={() => setModalVisible(true)} />
        <Balance />
        <Upcoming subscriptions={subscriptions} />
        <GlobalHeader title="All Subscriptions" />
      </View>
    ),

    [subscriptions],
  );

  return (
    <>
      <FlatList
        ListHeaderComponent={ListHeader}
        data={subscriptions}
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
            onDelete={handleDelete}
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

      <CreateSubscriptionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAdd}
      />
    </>
  );
};

export default SubscriptionList;
