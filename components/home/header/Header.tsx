import { View } from "react-native";
import AddBtn from "./AddBtn";
import UserInfo from "./UserInfo";

const Header = () => {
  return (
    <View>
      <View className="flex-row items-center justify-between">
        <UserInfo />
        <AddBtn />
      </View>
    </View>
  );
};

export default Header;
