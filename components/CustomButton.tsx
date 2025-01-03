import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { CustomButtonProps } from "@/constants/Tyes";

const CustomButton = ({
  text,
  onPress,
  containerStyle,
  isLoading,
}: CustomButtonProps) => {
  return (
    <>
      <TouchableOpacity
        className={` ${containerStyle} w-full rounded-2xl overflow-hidden cursor-pointer border-solid border-orange-300 border-1`}
        onPress={onPress}
      >
        <Text className="rounded-2xl capitalize py-3 font-pmedium text-2xl bg-orange-500 text-center color-black">
          {text}
        </Text>
      </TouchableOpacity>
      {isLoading && <ActivityIndicator />}
    </>
  );
};

export default CustomButton;
