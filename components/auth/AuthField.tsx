import clsx from "clsx";
import { Text, TextInput, type TextInputProps, View } from "react-native";

type AuthFieldProps = {
  label: string;
  error?: string;
} & TextInputProps;

const AuthField = ({ label, error, ...inputProps }: AuthFieldProps) => (
  <View className="auth-field">
    <Text className="auth-label">{label}</Text>
    <TextInput
      className={clsx("auth-input", error && "auth-input-error")}
      placeholderTextColor="rgba(0, 0, 0, 0.35)"
      {...inputProps}
    />
    {error ? <Text className="auth-error">{error}</Text> : null}
  </View>
);

export default AuthField;
