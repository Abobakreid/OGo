import { View, Text, Modal, Image, TouchableOpacity } from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { icons } from "@/constants";

const Model = ({
  openMenu,
  setOpenMenu,
}: {
  openMenu: boolean;
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
}) => {
  const translateY = useSharedValue(0);
  const [saveVideo, setSaveVideo] = useState<boolean>(false);
  const dragGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateY.value = Math.max(0, event.translationY);
    })
    .onEnd(() => {
      console.log("onEnd", translateY.value);
      if (translateY.value > 150) {
        console.log("if onEnd", translateY.value);
        translateY.value = withSpring(300);
        setOpenMenu(false);
      } else {
        console.log("else onEnd", translateY.value);
        translateY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const handleSaveVideo = () => {
    setSaveVideo((prev) => !prev);
    setTimeout(() => {
      setOpenMenu(false);
    }, 1000);
  };
  const handleClose = () => {
    setOpenMenu(false);
  };

  return (
    <Modal animationType="slide" visible={openMenu} transparent={true}>
      <GestureHandlerRootView className="flex-1 h-full w-full">
        <GestureDetector gesture={dragGesture}>
          <Animated.View
            style={[animatedStyle]}
            className="w-full h-72 bg-white absolute bottom-0 rounded-s-md p-3"
          >
            <View className="flex-row justify-between items-center">
              <Text className="text-xl font-psemibold">Save Video</Text>
              <TouchableOpacity onPress={handleClose}>
                <Image
                  source={icons.bookmark}
                  resizeMode="contain"
                  className="w-8 h-8"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleSaveVideo}>
              <Image
                source={icons.play}
                resizeMode="contain"
                className="w-14 h-14"
                tintColor={saveVideo ? "red" : "green"}
              />
            </TouchableOpacity>
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </Modal>
  );
};

export default Model;
