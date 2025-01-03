import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import CustomInput from "@/components/CustomInput";
import { InputsTypes } from "@/constants/Tyes";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
const ForgetPassword = () => {
  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);
  return (
    <>
      <SafeAreaView className="w-full">
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="px-3 w-full justify-center h-full bg-black-200">
            <View className="flex-row items-center">
              <Image
                source={images.logoSmall}
                resizeMode="contain"
                className="w-10 h-10"
              />
              <Text className="text-3xl color-white">OGo</Text>
            </View>
            <Text className="font-psemibold color-white text-3xl block my-8">
              Forget Password
            </Text>
            <CustomInput
              value={userEmail}
              type={InputsTypes.email}
              inputStyle="transparent  h-full color-white text-lg"
              handelChange={({ text }: { text: string }) => setUserEmail(text)}
            />
            <CustomButton
              text="login"
              onPress={() => router.push("/home")}
              containerStyle={"my-6"}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default ForgetPassword;
