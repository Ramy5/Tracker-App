import {
  formatCurrency,
  formatStatusLabel,
  formatSubscriptionDateTime,
} from "@/lib/utils";
import { Image, Pressable, Text, View } from "react-native";
import DetailRow from "./DetailRow";
import type { SubscriptionItemProps } from "./types";
import { truncateName } from "./utils";

const SubscriptionItem = ({
  icon,
  name,
  price,
  currency,
  billing,
  color,
  category,
  plan,
  renewalDate,
  onPress,
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
    { label: "Payment:", value: paymentMethod?.trim() || "" },
    { label: "Category:", value: category?.trim() || plan?.trim() || "" },
    {
      label: "Started:",
      value: startDate ? formatSubscriptionDateTime(startDate) : "",
    },
    {
      label: "Renewal date:",
      value: renewalDate ? formatSubscriptionDateTime(renewalDate) : "",
    },
    { label: "Status:", value: status ? formatStatusLabel(status) : "" },
  ];

  return (
    <Pressable
      onPress={onPress}
      style={!expanded && color && { backgroundColor: color }}
      className="flex-row items-center justify-between rounded-2xl p-4"
    >
      <View className="flex-row flex-1 items-center justify-between">
        <View className="flex-row items-center gap-3">
          <View className="bg-white/30 rounded-xl p-3 w-14 h-14 items-center justify-center">
            <Image source={icon} className="w-9 h-9" resizeMode="contain" />
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

      {expanded && (
        <View className="sub-body">
          <View className="sub-details">
            {detailRows.map((row) => (
              <DetailRow key={row.label} label={row.label} value={row.value} />
            ))}
          </View>
        </View>
      )}
    </Pressable>
  );
};

export default SubscriptionItem;
