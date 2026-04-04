import AuthBrand from "@/components/auth/AuthBrand";
import AuthField from "@/components/auth/AuthField";
import AuthScreen from "@/components/auth/AuthScreen";
import VerificationView from "@/components/auth/VerificationView";
import { useSignIn } from "@clerk/expo";
import { type Href, Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";

export const navigateHome =
  (router: ReturnType<typeof useRouter>) =>
  ({ decorateUrl }: { decorateUrl: (url: string) => string }) => {
    const url = decorateUrl("/");

    if (url.startsWith("http") && Platform.OS === "web") {
      window.location.href = url;
    } else {
      router.replace(url as Href);
    }
  };

export default function SignInPage() {
  const { signIn, errors, fetchStatus } = useSignIn();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const loading = fetchStatus === "fetching";
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const { error } = await signIn.password({
        emailAddress: email,
        password,
      });

      if (error) {
        console.error(JSON.stringify(error, null, 2));
        return;
      }

      if (signIn.status === "complete") {
        await signIn.finalize({ navigate: navigateHome(router) });
      } else if (signIn.status === "needs_client_trust") {
        const emailFactor = signIn.supportedSecondFactors?.find(
          (f: { strategy: string }) => f.strategy === "email_code",
        );

        if (emailFactor) await signIn.mfa.sendEmailCode();
      }
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  };

  const handleVerify = async () => {
    try {
      await signIn.mfa.verifyEmailCode({ code });

      if (signIn.status === "complete") {
        await signIn.finalize({ navigate: navigateHome(router) });
      }
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  };

  const handleResend = async () => {
    try {
      await signIn.mfa.sendEmailCode();
    } catch (err) {
      console.error("Resend failed", err);
    }
  };

  if (signIn?.status === "needs_client_trust") {
    return (
      <VerificationView
        title="Verify your identity"
        subtitle="We sent a verification code to your email"
        code={code}
        onChangeCode={setCode}
        onVerify={handleVerify}
        onResend={handleResend}
        error={errors?.fields?.code?.message}
        loading={loading}
      />
    );
  }

  return (
    <AuthScreen>
      <AuthBrand />

      <Text className="auth-title">Welcome back</Text>
      <Text className="auth-subtitle">
        Sign in to continue managing your subscriptions
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
            error={errors?.fields?.identifier?.message}
          />

          <AuthField
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            textContentType="password"
            error={errors?.fields?.password?.message}
          />

          <Pressable
            className={`auth-button ${!email || !password || loading ? "auth-button-disabled" : ""}`}
            onPress={handleSignIn}
            disabled={!email || !password || loading}
          >
            {loading ? (
              <ActivityIndicator color="#081126" />
            ) : (
              <Text className="auth-button-text">Sign in</Text>
            )}
          </Pressable>
        </View>

        <View className="auth-link-row">
          <Text className="auth-link-copy">New to Tracker? </Text>
          <Link href="/(auth)/sign-up">
            <Text className="auth-link">Create an account</Text>
          </Link>
        </View>
      </View>
    </AuthScreen>
  );
}
