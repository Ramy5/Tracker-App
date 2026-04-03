import { Image, TouchableOpacity } from "react-native";

const AddBtn = () => {
  return (
    <TouchableOpacity className="w-10 h-10 border border-[#C6BFA2] rounded-full flex-row items-center justify-center">
      <Image
        source={require("@/assets/icons/add.png")}
        className="w-6 h-6"
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default AddBtn;
