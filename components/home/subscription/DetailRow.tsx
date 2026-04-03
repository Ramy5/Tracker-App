import { Text, View } from "react-native";
import type { DetailRowProps } from "./types";

const DetailRow = ({ label, value }: DetailRowProps) => (
  <View className="sub-row">
    <View className="sub-row-copy">
      <Text className="sub-label">{label}</Text>
      <Text numberOfLines={1} ellipsizeMode="tail" className="sub-value">
        {value}
      </Text>
    </View>
  </View>
);

export default DetailRow;
