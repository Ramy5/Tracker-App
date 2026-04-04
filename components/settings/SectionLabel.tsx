import { Text } from "react-native";

type SectionLabelProps = {
  label: string;
};

const SectionLabel = ({ label }: SectionLabelProps) => (
  <Text className="mb-2 text-xs font-sans-semibold uppercase tracking-[1px] text-muted-foreground">
    {label}
  </Text>
);

export default SectionLabel;
