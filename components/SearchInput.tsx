import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  InputModeOptions,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { CustomInputProps, InputsTypes } from "@/constants/Tyes";
import { icons } from "@/constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({
  type,
  value,
  inputStyle,
  handelChange,
  containerStyle,
}: CustomInputProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const pathName = usePathname();
  return (
    <View>
      <View
        className={`bg-gray-800 px-2 pr-9 mb-2  flex-row border-2 items-center justify-between overflow-hidden rounded-md border-solid ${
          isFocused ? "border-orange-400" : "border-gray-800"
        }`}
      >
        <TextInput
          className={`w-full color-white max-w-[99%] mr-1 py-3`}
          textContentType="name"
          value={value}
          inputMode="search"
          multiline={false}
          numberOfLines={1}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          onChangeText={(text) => handelChange({ text })}
          placeholder={`search`}
          placeholderTextColor={"white"}
        />

        <TouchableOpacity
          className="flex-1"
          onPress={() => {
            if (!value) {
              Alert.alert("Please enter a search term");
            }

            if (pathName.startsWith("/search") && value) {
              router.setParams({ value });
            } else if (value) {
              router.push(`/search/${value}`);
            }
          }}
        >
          <Image
            source={icons.search}
            className="w-6 h-6"
            tintColor={"white"}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchInput;
