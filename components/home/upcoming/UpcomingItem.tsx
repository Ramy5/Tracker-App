import SubscriptionIcon from "@/components/SubscriptionIcon";
import { computeDaysLeft } from "@/constants/data";
import { formatCurrency } from "@/lib/utils";
import { Text, View } from "react-native";

interface UpcomingItemProps {
  id: string;
  name: string;
  price: number;
  renewalDate: string;
  category?: string;
}

const UpcomingItem = ({
  name,
  price,
  renewalDate,
  category,
}: UpcomingItemProps) => {
  const daysLeft = computeDaysLeft(renewalDate);

  const getDaysLeftText = () => {
    if (daysLeft < 0) {
      const overdue = Math.abs(daysLeft);
      return overdue === 1 ? "1 day overdue" : `${overdue} days overdue`;
    }
    if (daysLeft === 0) return "Due today";
    if (daysLeft === 1) return "1 day left";
    return `${daysLeft} days left`;
  };

  return (
    <View className="border border-[#C6BFA2] rounded-2xl p-4 gap-2">
      <View className="flex-row justify-between items-center gap-2">
        <View className="bg-[#F6ECC9] rounded-xl w-12 h-12 items-center justify-center">
          <SubscriptionIcon
            name={name}
            category={category}
            size={24}
            color="#081126"
          />
        </View>

        <View>
          <Text className="text-lg font-sans-bold">
            {formatCurrency(price)}
          </Text>
          <Text
            className="text-sm text-[#435875] font-sans-semibold"
            numberOfLines={1}
          >
            {getDaysLeftText()}
          </Text>
        </View>
      </View>

      <Text className="text-lg font-sans-bold text-primary">{name}</Text>
    </View>
  );
};

export default UpcomingItem;
