import { styled } from "nativewind";
import type { PropsWithChildren } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView as RN_SafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RN_SafeAreaView);

const AuthScreen = ({ children }: PropsWithChildren) => (
  <SafeAreaView className="flex-1">
    <KeyboardAvoidingView
      className="auth-screen"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        className="auth-scroll"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="auth-content">{children}</View>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>
);

export default AuthScreen;
