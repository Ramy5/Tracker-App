import SubscriptionItem from "@/components/home/subscription/SubscriptionItem";
import { HOME_SUBSCRIPTIONS } from "@/constants/data";
import { styled } from "nativewind";
import { useMemo, useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import { SafeAreaView as RN_SafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RN_SafeAreaView);

const Subscriptions = () => {
  const [query, setQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return HOME_SUBSCRIPTIONS;

    return HOME_SUBSCRIPTIONS.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.category?.toLowerCase().includes(q) ||
        s.plan?.toLowerCase().includes(q),
    );
  }, [query]);

  const handleDelete = (id: string) => {
    // TODO: Implement delete logic (remove from state/call API)
    console.log("Deleting subscription:", id);

    // Collapse the item if it's currently expanded
    if (expandedId === id) {
      setExpandedId(null);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SubscriptionItem
            {...item}
            expanded={expandedId === item.id}
            onPress={() =>
              setExpandedId((prev) => (prev === item.id ? null : item.id))
            }
            onDelete={handleDelete}
          />
        )}
        ListHeaderComponent={
          <View className="pt-5 pb-3 gap-4">
            <Text className="text-2xl font-sans-bold text-primary">
              All Subscriptions
            </Text>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search subscriptions..."
              placeholderTextColor="#9ca3af"
              className="bg-white rounded-xl px-4 py-3 font-sans text-base text-primary"
            />
          </View>
        }
        ListEmptyComponent={
          <Text className="text-center font-sans text-gray-400 mt-10">
            No subscriptions found
          </Text>
        }
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-4 pb-28 px-5"
        extraData={expandedId}
      />
    </SafeAreaView>
  );
};

export default Subscriptions;