import AuthBrand from "@/components/auth/AuthBrand";
import AuthField from "@/components/auth/AuthField";
import AuthScreen from "@/components/auth/AuthScreen";
import VerificationView from "@/components/auth/VerificationView";
import { useAuth, useSignUp } from "@clerk/expo";
import { Href, Link, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

export default function SignUpPage() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const loading = fetchStatus === "fetching";

  const handleSignUp = async () => {
    const { error } = await signUp.password({ emailAddress: email, password });

    if (error) {
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    if (signUp.status === "complete") {
      await signUp.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session?.currentTask);
            return;
          }

          const url = decorateUrl("/");

          if (url.startsWith("http")) {
            window.location.href = url;
          } else {
            router.replace(url as Href);
          }
        },
      });
    }
    await signUp.verifications.sendEmailCode();
  };

  const handleVerify = async () => {
    await signUp.verifications.verifyEmailCode({ code });

    if (signUp.status === "complete") {
      await signUp.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session?.currentTask);
            return;
          }

          const url = decorateUrl("/");

          if (url.startsWith("http")) {
            window.location.href = url;
          } else {
            router.replace(url as Href);
          }
        },
      });
    } else {
      console.error("Sign-up attempt not complete:", signUp);
    }
  };

  if (signUp?.status === "complete" || isSignedIn) return null;

  if (
    signUp?.status === "missing_requirements" &&
    signUp.unverifiedFields?.includes("email_address") &&
    signUp.missingFields?.length === 0
  ) {
    return (
      <VerificationView
        title="Verify your email"
        subtitle="We sent a 6-digit code to your email address"
        code={code}
        onChangeCode={setCode}
        onVerify={handleVerify}
        onResend={() => signUp.verifications.sendEmailCode()}
        error={errors?.fields?.code?.message}
        loading={loading}
      />
    );
  }

  return (
    <AuthScreen>
      <AuthBrand />

      <Text className="auth-title">Create account</Text>
      <Text className="auth-subtitle">
        Start managing your subscriptions today
      </Text>

      <View className="auth-card">
        <View className="auth-form">
          <AuthField
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            error={errors?.fields?.emailAddress?.message}
          />

          <AuthField
            label="Password"
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            textContentType="newPassword"
            error={errors?.fields?.password?.message}
          />

          <Pressable
            className={`auth-button ${!email || !password || loading ? "auth-button-disabled" : ""}`}
            onPress={handleSignUp}
            disabled={!email || !password || loading}
          >
            {loading ? (
              <ActivityIndicator color="#081126" />
            ) : (
              <Text className="auth-button-text">Create account</Text>
            )}
          </Pressable>
        </View>

        <View className="auth-link-row">
          <Text className="auth-link-copy">Already have an account? </Text>
          <Link href="/(auth)/sign-in">
            <Text className="auth-link">Sign in</Text>
          </Link>
        </View>

        <View nativeID="clerk-captcha" />
      </View>
    </AuthScreen>
  );
}
