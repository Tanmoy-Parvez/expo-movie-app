import { icons } from "@/constants/icons";
import { Image, TextInput, View } from "react-native";

interface Props {
  onPress?: () => void;
  placeholder: string;
}

const SearchBox = ({ onPress, placeholder }: Props) => {
  return (
    <View className="flex-row items-center rounded-full px-5 py-4 bg-dark-200">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        placeholder={placeholder}
        onPress={onPress}
        onChange={() => {}}
        value=""
        placeholderTextColor="#a8b5db"
        className="flex-1 ml-2 text-white"
      />
    </View>
  );
};

export default SearchBox;
