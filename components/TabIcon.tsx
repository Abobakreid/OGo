import { TabIconProp } from "@/constants/Tyes";
import { Image, Text, View } from "react-native";

const TabIcon = ({ icon, focused, name, color }: TabIconProp) => {
  return (
    <View className="flex-col justify-center items-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className={focused ? "w-8 h-8" : "w-7 h-7"}
      />
      <Text className="w-full">{name}</Text>
    </View>
  );
};

export default TabIcon;
