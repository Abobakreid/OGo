import { View, Text, Image } from "react-native";
import React from "react";
import { icons } from "@/constants";
import { HomeHeaderProps } from "@/constants/Tyes";

const HomeHeader = ({ headerText, searchText, icon }: HomeHeaderProps) => {
  return (
    <View className="py-6 flex-row justify-between items-center">
      <View>
        {headerText && (
          <Text className="text-lg color-gray-50">{headerText}</Text>
        )}
        {searchText && (
          <Text className="text-2xl color-white font-psemibold">
            {searchText}
          </Text>
        )}
      </View>
      {icon && <Image source={icon} resizeMode="contain" className="w-8 h-8" />}
    </View>
  );
};

export default HomeHeader;
