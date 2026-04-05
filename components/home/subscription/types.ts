import type { ImageSourcePropType } from "react-native";

export type TSubscriptionStatus = "active" | "paused" | "cancelled";

export interface SubscriptionItemProps {
  id: string;
  icon?: ImageSourcePropType;
  name: string;
  price: number;
  currency?: string;
  billing: string;
  color?: string;
  category?: string;
  plan?: string;
  renewalDate?: string;
  onPress: () => void;
  onDelete: (id: string) => void;
  expanded: boolean;
  paymentMethod?: string;
  startDate?: string;
  status?: TSubscriptionStatus;
}

export interface DetailRowProps {
  label: string;
  value: string;
}
