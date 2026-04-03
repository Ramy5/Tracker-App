import { Text, TouchableOpacity, View } from "react-native";

interface GlobalHeaderProps {
  title: string;
  buttonText?: string;
  onPress?: () => void;
}

const GlobalHeader = ({
  title,
  buttonText = "View All",
  onPress,
}: GlobalHeaderProps) => {
  return (
    <View className="flex-row justify-between items-center">
      <Text className="text-xl font-sans-bold text-primary">{title}</Text>
      <TouchableOpacity
        onPress={onPress}
        disabled={!onPress}
        className="border border-[`#C6BFA2`] rounded-full px-3 py-1"
      >
        <Text className=" font-sans-semibold text-base text-primary">
          {buttonText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GlobalHeader;
