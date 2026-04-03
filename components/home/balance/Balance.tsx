import { formatCurrency } from "@/lib/utils";
import dayjs from "dayjs";
import { Text, View } from "react-native";

const Balance = () => {
  return (
    <View className="bg-accent p-5 rounded-tr-3xl rounded-bl-3xl gap-6">
      <Text className="text-xl font-sans-semibold text-white">Balance</Text>

      <View className="flex-row justify-between items-center">
        <Text className="text-4xl font-sans-bold text-white">
          {formatCurrency(198.53)}
        </Text>
        <Text className="text-white font-sans-semibold text-xl">
          {dayjs().format("MM/DD")}
        </Text>
      </View>
    </View>
  );
};

export default Balance;
