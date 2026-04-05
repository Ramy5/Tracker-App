import SubscriptionIcon from "@/components/SubscriptionIcon";
import {
  formatCurrency,
  formatStatusLabel,
  formatSubscriptionDateTime,
} from "@/lib/utils";
import { Pressable, Text, View } from "react-native";
import DetailRow from "./DetailRow";
import type { SubscriptionItemProps } from "./types";
import { truncateName } from "./utils";

const SubscriptionItem = ({
  id,
  name,
  price,
  currency,
  billing,
  color,
  category,
  plan,
  renewalDate,
  onPress,
  onDelete,
  expanded,
  paymentMethod,
  startDate,
  status,
}: SubscriptionItemProps) => {
  const shortName = truncateName(name);

  const secondaryText =
    category?.trim() ||
    plan?.trim() ||
    (renewalDate ? formatSubscriptionDateTime(renewalDate) : "");

  const detailRows = [
    { label: "Payment:", value: paymentMethod?.trim() || "—" },
    { label: "Category:", value: category?.trim() || plan?.trim() || "—" },
    {
      label: "Started:",
      value: startDate ? formatSubscriptionDateTime(startDate) : "—",
    },
    {
      label: "Renewal date:",
      value: renewalDate ? formatSubscriptionDateTime(renewalDate) : "—",
    },
    { label: "Status:", value: status ? formatStatusLabel(status) : "—" },
  ];

  const canDelete = status !== "cancelled";

  return (
    <Pressable
      onPress={onPress}
      style={!expanded && color ? { backgroundColor: color } : undefined}
      className="rounded-2xl p-4 gap-4"
    >
      {/* HEAD ROW */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <View className="bg-white/30 rounded-xl p-3 w-14 h-14 items-center justify-center">
            <SubscriptionIcon
              name={name}
              category={category}
              size={28}
              color="#081126"
            />
          </View>

          <View>
            <Text className="font-sans-bold text-lg">{shortName}</Text>
            <Text
              className="font-sans-semibold text-sm text-[#435875]"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {secondaryText}
            </Text>
          </View>
        </View>

        <View className="items-end">
          <Text className="font-sans-bold text-lg">
            {formatCurrency(price, currency)}
          </Text>
          <Text className="font-sans-semibold text-sm text-[#435875]">
            {billing}
          </Text>
        </View>
      </View>

      {/* EXPANDED DETAILS */}
      {expanded && (
        <View className="sub-body w-full">
          <View className="sub-details">
            {detailRows.map((row) => (
              <DetailRow key={row.label} label={row.label} value={row.value} />
            ))}
          </View>

          {/* ACTION BUTTONS */}
          <View className="flex-row gap-3 px-4 mt-2">
            {/* UNSUBSCRIBE / REMOVE */}
            <Pressable
              className="flex-1 items-center rounded-full bg-destructive/15 py-3"
              onPress={() => onDelete(id)}
            >
              <Text className="font-sans-bold text-destructive text-sm">
                {canDelete ? "Remove" : "Delete"}
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </Pressable>
  );
};

export default SubscriptionItem;
