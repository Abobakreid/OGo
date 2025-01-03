import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  InputModeOptions,
} from "react-native";
import React, { useState } from "react";
import { CustomInputProps, InputsTypes } from "@/constants/Tyes";
import { icons } from "@/constants";

const CustomInput = ({
  type,
  value,
  inputStyle,
  placeholderValue,
  label,
  icon,
  handelChange,
  containerStyle,
}: CustomInputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  return (
    <View className={`${containerStyle ?? ""}`}>
      {label && <Text className="text-2xl color-white mb-3">{label}</Text>}

      <View
        className={`bg-black-100 ${
          type == InputsTypes.password && "pr-9"
        } px-2  flex-row border-2 items-center  justify-between overflow-hidden rounded-md border-solid ${
          isFocused ? "border-orange-400" : "border-black"
        }`}
      >
        <TextInput
          className={`${inputStyle ?? ""} w-full  ${icon && "mr-1"}`}
          textContentType="name"
          value={value}
          inputMode={type as InputModeOptions}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          onChangeText={(text) => handelChange({ text })}
          placeholder={placeholderValue}
          placeholderTextColor={"white"}
          secureTextEntry={type == InputsTypes.password && !showPassword}
        />
        {icon ? (
          <TouchableOpacity
            onPress={() => {
              setShowPassword((prev) => !prev);
            }}
          >
            <Image
              source={icon}
              className="w-6 h-6"
              tintColor={"white"}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : (
          type == InputsTypes.password && (
            <TouchableOpacity
              onPress={() => {
                setShowPassword((prev) => !prev);
              }}
            >
              <Image
                source={showPassword ? icons.eye : icons.eyeHide}
                className="w-6 h-6"
                tintColor={"white"}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
};

export default CustomInput;
