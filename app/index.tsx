import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";
import { useEffect, useRef } from "react";
import { Animated, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useGlobalContext } from "@/context/GloabalProvider";
import { router } from "expo-router";

export default function Index() {
  const AnimatedImage = useRef(new Animated.Value(0)).current;
  const AnimatedButton = useRef(new Animated.Value(100)).current;
  const { isLoggedIn, isLoading } = useGlobalContext();
  const handelPress = () => {
    router.push("/login");
  };

  useEffect(() => {
    Animated.timing(AnimatedImage, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
    Animated.spring(AnimatedButton, {
      toValue: 0,
      friction: 1,
      tension: 0,
      useNativeDriver: true,
    }).start();
  }, [AnimatedImage, AnimatedButton]);

  return (
    <SafeAreaView className="h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="px-2 gap-y-10 justify-center items-center h-full bg-black-200">
          <View className="flex-row  items-center justify-center">
            <Image
              source={images.logoSmall}
              className="w-16 h-12 mr-1"
              resizeMode="contain"
            />
            <Text className=" font-psemibold text-3xl color-secondary-200">
              OGo
            </Text>
          </View>
          <Animated.Image
            source={images.cards}
            resizeMode="contain"
            className="max-w-[380px] w-full min-h-[200] h-[350px]"
            style={{ opacity: AnimatedImage }}
          />
          <View className="relative ">
            <Text className="text-4xl color-white text-center">
              Discover Endless Possibilities with OGo
            </Text>
            <Image
              source={images.path}
              className="absolute top-12 -right-1 w-20 h-12"
              resizeMode="contain"
            />
          </View>
          <View>
            <Text className="color-white text-gray-100 text-sm font-pregular text-center capitalize">
              where creativity meets innovation: embark an a journey of
              limitations exploration with OGo
            </Text>
          </View>
          <Animated.View
            style={[{ transform: [{ translateY: AnimatedButton }] }]}
          >
            <CustomButton
              containerStyle={"bg-orange-500"}
              text={"continue with email"}
              onPress={handelPress}
            />
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
