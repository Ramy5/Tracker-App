import SubscriptionIcon from "@/components/SubscriptionIcon";
import clsx from "clsx";
import dayjs from "dayjs";
import { usePostHog } from "posthog-react-native";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

type Frequency = "Monthly" | "Yearly";

type Category =
  | "Entertainment"
  | "AI Tools"
  | "Developer Tools"
  | "Design"
  | "Productivity"
  | "Cloud"
  | "Music"
  | "Other";

const CATEGORIES: Category[] = [
  "Entertainment",
  "AI Tools",
  "Developer Tools",
  "Design",
  "Productivity",
  "Cloud",
  "Music",
  "Other",
];

const CATEGORY_COLORS: Record<Category, string> = {
  Entertainment: "#e8def8",
  "AI Tools": "#b8d4e3",
  "Developer Tools": "#dde8d0",
  Design: "#f5c542",
  Productivity: "#b8e8d0",
  Cloud: "#d0e8f5",
  Music: "#ffd6e0",
  Other: "#efefef",
};

export interface NewSubscription {
  id: string;
  name: string;
  plan: string;
  category: string;
  paymentMethod: string;
  status: "active";
  startDate: string;
  price: number;
  currency: string;
  billing: string;
  renewalDate: string;
  color: string;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (subscription: NewSubscription) => void;
}

const CreateSubscriptionModal = ({ visible, onClose, onSubmit }: Props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [frequency, setFrequency] = useState<Frequency>("Monthly");
  const [category, setCategory] = useState<Category | null>(null);

  const posthog = usePostHog();

  const isValid =
    name.trim().length > 0 &&
    parseFloat(price) > 0 &&
    !Number.isNaN(parseFloat(price));

  const handleSubmit = () => {
    if (!isValid) return;

    const now = dayjs();
    const renewalDate =
      frequency === "Monthly"
        ? now.add(1, "month").toISOString()
        : now.add(1, "year").toISOString();

    const selectedCategory = category ?? "Other";

    const subscription: NewSubscription = {
      id: `sub-${Date.now()}`,
      name: name.trim(),
      plan: `${frequency} Plan`,
      category: selectedCategory,
      paymentMethod: "",
      status: "active",
      startDate: now.toISOString(),
      price: parseFloat(parseFloat(price).toFixed(2)),
      currency: "USD",
      billing: frequency,
      renewalDate,
      color: CATEGORY_COLORS[selectedCategory],
    };

    posthog.capture("subscription_created", {
      subscription_name: subscription.name,
      subscription_category: subscription.category,
      subscription_price: subscription.price,
      subscription_frequency: subscription.billing,
    });

    onSubmit(subscription);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setFrequency("Monthly");
    setCategory(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const showPreview = name.trim().length > 0;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Pressable className="modal-overlay" onPress={handleClose} />

        <View className="modal-container">
          {/* HEADER */}
          <View className="modal-header">
            <Text className="modal-title">New Subscription</Text>
            <Pressable className="modal-close" onPress={handleClose}>
              <Text className="modal-close-text">✕</Text>
            </Pressable>
          </View>

          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View className="modal-body">
              {/* ICON PREVIEW */}
              {showPreview && (
                <View className="items-center py-2">
                  <View
                    className="size-20 rounded-2xl items-center justify-center"
                    style={{
                      backgroundColor: CATEGORY_COLORS[category ?? "Other"],
                    }}
                  >
                    <SubscriptionIcon
                      name={name}
                      category={category ?? "Other"}
                      size={36}
                      color="#081126"
                    />
                  </View>
                  <Text className="mt-2 text-sm font-sans-semibold text-muted-foreground">
                    Auto-detected icon
                  </Text>
                </View>
              )}

              {/* NAME */}
              <View className="auth-field">
                <Text className="auth-label">Name</Text>
                <TextInput
                  className="auth-input"
                  placeholder="e.g. Netflix"
                  placeholderTextColor="rgba(0,0,0,0.35)"
                  value={name}
                  onChangeText={setName}
                  returnKeyType="next"
                />
              </View>

              {/* PRICE */}
              <View className="auth-field">
                <Text className="auth-label">Price (USD)</Text>
                <TextInput
                  className="auth-input"
                  placeholder="0.00"
                  placeholderTextColor="rgba(0,0,0,0.35)"
                  value={price}
                  onChangeText={setPrice}
                  keyboardType="decimal-pad"
                  returnKeyType="done"
                />
              </View>

              {/* FREQUENCY */}
              <View className="auth-field">
                <Text className="auth-label">Billing Frequency</Text>
                <View className="picker-row">
                  {(["Monthly", "Yearly"] as Frequency[]).map((opt) => (
                    <Pressable
                      key={opt}
                      className={clsx(
                        "picker-option",
                        frequency === opt && "picker-option-active",
                      )}
                      onPress={() => setFrequency(opt)}
                    >
                      <Text
                        className={clsx(
                          "picker-option-text",
                          frequency === opt && "picker-option-text-active",
                        )}
                      >
                        {opt}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* CATEGORY */}
              <View className="auth-field">
                <Text className="auth-label">Category</Text>
                <View className="category-scroll">
                  {CATEGORIES.map((cat) => (
                    <Pressable
                      key={cat}
                      className={clsx(
                        "category-chip",
                        category === cat && "category-chip-active",
                      )}
                      onPress={() =>
                        setCategory((prev) => (prev === cat ? null : cat))
                      }
                    >
                      <Text
                        className={clsx(
                          "category-chip-text",
                          category === cat && "category-chip-text-active",
                        )}
                      >
                        {cat}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* SUBMIT */}
              <Pressable
                className={clsx(
                  "auth-button",
                  !isValid && "auth-button-disabled",
                )}
                onPress={handleSubmit}
                disabled={!isValid}
              >
                <Text className="auth-button-text">Add Subscription</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default CreateSubscriptionModal;
