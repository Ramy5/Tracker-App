import AuthField from "@/components/auth/AuthField";
import { useState } from "react";
import { ActivityIndicator, Modal, Pressable, Text, View } from "react-native";

type EditProfileModalProps = {
  visible: boolean;
  initialFirstName: string;
  initialLastName: string;
  onClose: () => void;
  onSave: (firstName: string, lastName: string) => Promise<void>;
};

const EditProfileModal = ({
  visible,
  initialFirstName,
  initialLastName,
  onClose,
  onSave,
}: EditProfileModalProps) => {
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const hasChanged =
    firstName.trim() !== initialFirstName ||
    lastName.trim() !== initialLastName;

  const handleSave = async () => {
    if (!firstName.trim()) {
      setError("First name is required");
      return;
    }
    setSaving(true);
    setError(undefined);
    try {
      await onSave(firstName.trim(), lastName.trim());
      onClose();
    } catch {
      setError("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="modal-overlay">
        <View className="modal-container">
          <View className="modal-header">
            <Text className="modal-title">Edit profile</Text>
            <Pressable onPress={onClose} className="modal-close">
              <Text className="modal-close-text">✕</Text>
            </Pressable>
          </View>

          <View className="modal-body">
            <AuthField
              label="First name"
              placeholder="Enter your first name"
              value={firstName}
              onChangeText={(v) => {
                setFirstName(v);
                setError(undefined);
              }}
              error={error}
              autoCapitalize="words"
              textContentType="givenName"
            />

            <AuthField
              label="Last name"
              placeholder="Enter your last name"
              value={lastName}
              onChangeText={setLastName}
              autoCapitalize="words"
              textContentType="familyName"
            />

            <Pressable
              className={`auth-button ${!hasChanged || saving ? "auth-button-disabled" : ""}`}
              onPress={handleSave}
              disabled={!hasChanged || saving}
            >
              {saving ? (
                <ActivityIndicator color="#081126" />
              ) : (
                <Text className="auth-button-text">Save changes</Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditProfileModal;
