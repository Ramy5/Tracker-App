import type { ImageSourcePropType } from "react-native";

export interface SubscriptionItemProps {
  id: string;
  icon: ImageSourcePropType;
  name: string;
  price: number;
  currency?: string;
  billing: string;
  color?: string;
  category?: string;
  plan?: string;
  renewalDate?: string;
  onPress: () => void;
  expanded: boolean;
  paymentMethod?: string;
  startDate?: string;
  status?: string;
}

export interface DetailRowProps {
  label: string;
  value: string;
}
