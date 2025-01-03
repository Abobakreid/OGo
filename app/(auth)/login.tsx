import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";
import CustomInput from "@/components/CustomInput";
import { InputsTypes } from "@/constants/Tyes";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { Log_in } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GloabalProvider";

const Login = () => {
  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);
  const [userPass, setUserPassword] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUserData, setIsLoggedIn } = useGlobalContext();

  const handelSubmit = async () => {
    if (userEmail && userPass) {
      try {
        setIsLoading(true);
        const result = await Log_in(userEmail, userPass);
        setUserData(result);
        setIsLoggedIn(true);
        setIsLoading(false);
      } catch (e) {
        console.log(e, "erroData");
        setIsLoading(false);
      }
    } else {
      Alert.alert("Please enter All  Information");
    }
  };

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
            <Text className="font-psemibold color-white text-5xl block my-8">
              Login
            </Text>
            <CustomInput
              value={userEmail ?? ""}
              type={InputsTypes.email}
              label="Email"
              placeholderValue="Enter your Email"
              inputStyle="transparent  h-full color-white text-lg"
              handelChange={({ text }: { text: string }) => setUserEmail(text)}
            />
            <CustomInput
              value={userPass ?? ""}
              containerStyle={"mt-4"}
              type={InputsTypes.password}
              label="Password"
              placeholderValue="Enter your password"
              inputStyle="transparent  h-full color-white text-lg"
              handelChange={({ text }: { text: string }) =>
                setUserPassword(text)
              }
            />
            <Text
              onPress={() => router.push("/forget-password")}
              className="text-right mt-2 color-gray-100 pr-2 underline text-lg"
            >
              Forget Password ?
            </Text>
            <CustomButton
              text="login"
              onPress={handelSubmit}
              containerStyle={"my-6"}
              isLoading={isLoading}
            />
            <Text className="capitalize text-center color-gray-100">
              Don't have an account?{" "}
              <Link
                className="color-secondary-200 inline-block ml-1"
                href={"/sign-up"}
              >
                SignUp
              </Link>{" "}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Login;
