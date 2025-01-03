import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";
import CustomInput from "@/components/CustomInput";
import { InputsTypes } from "@/constants/Tyes";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GloabalProvider";

const SignUp = () => {
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);
  const [userPass, setUserPassword] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUserData, setIsLoggedIn } = useGlobalContext();
  const handelSubmit = async () => {
    if (userName && userEmail && userPass) {
      try {
        setIsLoading(true);
        const userData = await createUser({
          userName,
          userEmail,
          userPass,
        }).then((userData) => {
          if (userData) {
            setUserData(userData);
            setIsLoggedIn(true);
          }
          console.log(userData), "userData";
        });
      } catch (e) {
        console.log(e, "errorData");
      } finally {
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
              Sign Up
            </Text>
            <CustomInput
              value={userName ?? ""}
              type={InputsTypes.name}
              label="UserName"
              placeholderValue="Enter your Name"
              inputStyle="transparent  h-full color-white text-lg"
              handelChange={({ text }: { text: string }) => setUserName(text)}
            />
            <CustomInput
              value={userEmail ?? ""}
              type={InputsTypes.email}
              containerStyle={"mt-4"}
              label="Email"
              placeholderValue="Enter your Email"
              inputStyle="transparent  h-full color-white text-lg"
              handelChange={({ text }: { text: string }) => setUserEmail(text)}
            />
            <CustomInput
              value={userPass ?? ""}
              containerStyle={"mt-4"}
              label="Password"
              type={InputsTypes.password}
              placeholderValue="Enter your Password"
              inputStyle="transparent  h-full color-white text-lg"
              handelChange={({ text }: { text: string }) =>
                setUserPassword(text)
              }
            />
            <CustomButton
              text="Sign up"
              onPress={handelSubmit}
              containerStyle={"my-6"}
              isLoading={isLoading}
            />
            <Text className="capitalize text-center color-gray-100">
              already have an account?{" "}
              <Link
                className="color-secondary-200 inline-block ml-1"
                href={"/login"}
              >
                Login
              </Link>
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SignUp;
