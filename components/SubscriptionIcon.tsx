import { Ionicons } from "@expo/vector-icons";
import { resolveSubscriptionIcon } from "@/lib/subscriptionIcon";
import type { ComponentProps } from "react";
import * as SimpleIcons from "simple-icons";
import Svg, { Path } from "react-native-svg";

interface Props {
  name: string;
  category?: string;
  size?: number;
  color?: string;
}

/**
 * Renders a brand icon for a subscription name using simple-icons (3,400+ brands).
 * Falls back to an Ionicons glyph by category when no brand is matched.
 */
const SubscriptionIcon = ({
  name,
  category,
  size = 28,
  color = "#081126",
}: Props) => {
  const resolved = resolveSubscriptionIcon(name, category);

  if (resolved.lib === "simple") {
    const key =
      "si" +
      resolved.name
        .replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase())
        .replace(/^[a-z]/, (c: string) => c.toUpperCase());

    const icon = (SimpleIcons as Record<string, { path: string } | undefined>)[
      key
    ];

    if (icon?.path) {
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d={icon.path} fill={color} />
        </Svg>
      );
    }
  }

  // Ionicons fallback
  return (
    <Ionicons
      name={resolved.name as ComponentProps<typeof Ionicons>["name"]}
      size={size}
      color={color}
    />
  );
};

export default SubscriptionIcon;
