import AuthBrand from "@/components/auth/AuthBrand";
import AuthField from "@/components/auth/AuthField";
import AuthScreen from "@/components/auth/AuthScreen";
import VerificationView from "@/components/auth/VerificationView";
import { useSignIn } from "@clerk/expo";
import { type Href, Link, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

type TNavigateHome = {
  session: { currentTask?: unknown } | null;
  decorateUrl: (url: string) => string;
};

export default function SignInPage() {
  const { signIn, errors, fetchStatus } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const loading = fetchStatus === "fetching";

  const navigateHome = ({ session, decorateUrl }: TNavigateHome) => {
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
  };

  const handleSignIn = async () => {
    const { error } = await signIn.password({ emailAddress: email, password });

    if (error) {
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    if (signIn.status === "complete") {
      await signIn.finalize({ navigate: navigateHome });
    } else if (signIn.status === "needs_client_trust") {
      const emailFactor = signIn.supportedSecondFactors?.find(
        (f: { strategy: string }) => f.strategy === "email_code",
      );

      if (emailFactor) await signIn.mfa.sendEmailCode();
    }
  };

  const handleVerify = async () => {
    await signIn.mfa.verifyEmailCode({ code });

    if (signIn.status === "complete") {
      await signIn.finalize({ navigate: navigateHome });
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
        onResend={() => signIn.mfa.sendEmailCode()}
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
