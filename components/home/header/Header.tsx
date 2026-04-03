import { View } from "react-native";
import AddBtn from "./AddBtn";
import UserInfo from "./UserInfo";

const Header = () => {
  return (
    <View className="flex-row items-center justify-between">
      <UserInfo />
      <AddBtn />
    </View>
  );
};

export default Header;
