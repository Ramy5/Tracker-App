import { ActivityIndicator, Pressable, Text, View } from "react-native";

type SettingsRowProps = {
  label: string;
  value?: string;
  onPress?: () => void;
  destructive?: boolean;
  loading?: boolean;
  showChevron?: boolean;
};

const SettingsRow = ({
  label,
  value,
  onPress,
  destructive = false,
  loading = false,
  showChevron = false,
}: SettingsRowProps) => (
  <Pressable
    onPress={onPress}
    disabled={!onPress || loading}
    className="flex-row items-center justify-between py-4"
  >
    <Text
      className={`text-base font-sans-semibold ${
        destructive ? "text-destructive" : "text-primary"
      }`}
    >
      {label}
    </Text>

    <View className="flex-row items-center gap-2">
      {loading ? (
        <ActivityIndicator size="small" className="text-accent" />
      ) : value ? (
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="max-w-full text-right text-sm font-sans-medium text-muted-foreground"
        >
          {value}
        </Text>
      ) : null}

      {showChevron && !loading && (
        <Text className="text-muted-foreground">›</Text>
      )}
    </View>
  </Pressable>
);

export default SettingsRow;
