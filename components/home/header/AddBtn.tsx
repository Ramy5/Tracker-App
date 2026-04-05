import { Image, TouchableOpacity } from "react-native";

interface Props {
  onPress?: () => void;
}

const AddBtn = ({ onPress }: Props) => {
  return (
    <TouchableOpacity
      className="w-10 h-10 border border-[#C6BFA2] rounded-full flex-row items-center justify-center"
      onPress={onPress}
    >
      <Image
        source={require("@/assets/icons/add.png")}
        className="w-6 h-6"
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default AddBtn;
