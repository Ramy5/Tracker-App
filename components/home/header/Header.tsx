import { View } from "react-native";
import AddBtn from "./AddBtn";
import UserInfo from "./UserInfo";

interface Props {
  onAdd?: () => void;
}

const Header = ({ onAdd }: Props) => {
  return (
    <View className="flex-row items-center justify-between">
      <UserInfo />
      <AddBtn onPress={onAdd} />
    </View>
  );
};

export default Header;
