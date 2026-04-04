import { ActivityIndicator, Pressable, Text, View } from "react-native";
import AuthBrand from "./AuthBrand";
import AuthField from "./AuthField";
import AuthScreen from "./AuthScreen";

type VerificationViewProps = {
  title: string;
  subtitle: string;
  code: string;
  onChangeCode: (code: string) => void;
  onVerify: () => void;
  onResend: () => void;
  error?: string;
  loading: boolean;
};

const VerificationView = ({
  title,
  subtitle,
  code,
  onChangeCode,
  onVerify,
  onResend,
  error,
  loading,
}: VerificationViewProps) => (
  <AuthScreen>
    <AuthBrand />

    <Text className="auth-title">{title}</Text>
    <Text className="auth-subtitle">{subtitle}</Text>

    <View className="auth-card">
      <View className="auth-form">
        <AuthField
          label="Verification code"
          placeholder="Enter the 6-digit code"
          value={code}
          onChangeText={onChangeCode}
          keyboardType="number-pad"
          autoFocus
          error={error}
        />

        <Pressable
          className={`auth-button ${!code || loading ? "auth-button-disabled" : ""}`}
          onPress={onVerify}
          disabled={!code || loading}
        >
          {loading ? (
            <ActivityIndicator color="#081126" />
          ) : (
            <Text className="auth-button-text">Verify</Text>
          )}
        </Pressable>

        <Pressable className="auth-secondary-button" onPress={onResend}>
          <Text className="auth-secondary-button-text">Resend code</Text>
        </Pressable>
      </View>
    </View>
  </AuthScreen>
);

export default VerificationView;
