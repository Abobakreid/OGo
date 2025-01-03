import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ImageBackgroundProps,
  ImageSourcePropType,
} from "react-native";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { icons, images } from "@/constants";
import { useVideoPlayer, VideoView, VideoViewProps } from "expo-video";
import { useEvent } from "expo";
import { LastsCardProps } from "@/constants/Tyes";
import { ResizeMode, Video } from "expo-av";

const LastsCard = ({
  item,
  setOpenMenu,
}: {
  item: LastsCardProps;
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
}) => {
  const [play, setPlay] = useState<boolean>(false);
  const videoSource = item.video ? item.video : "";
  const handelPress = () => {
    setPlay(true);
  };

  const openMenu = () => {
    console.log("Open menu");
    setOpenMenu(true);
  };

  // useEffect(() => {
  //   setPlay(isPlaying);
  // }, [isPlaying]);

  return (
    <View className="my-4 w-full">
      <View className="flex-row w-full justify-between items-center ">
        <Image
          source={images.profile}
          resizeMode="cover"
          className="w-14 h-full mr-2 rounded-lg"
        />
        <View className="flex-1">
          <Text className="text-white font-pextrabold" numberOfLines={1}>
            {item.title}
          </Text>
          <Text className="text-white" numberOfLines={1}>
            {item.desc}
          </Text>
        </View>

        <View className="justify-end items-end ">
          <TouchableOpacity onPress={openMenu}>
            <Image
              source={icons.menu}
              resizeMode="contain"
              className="w-4 h-6"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View className="justify-center items-center w-full h-72 mt-2 overflow-hidden relative">
        {play ? (
          <Video
            source={{
              uri: item.video,
            }}
            resizeMode={ResizeMode.CONTAIN}
            className="rounded-2xl bg-black mt-5 w-full h-full"
            useNativeControls={true}
            shouldPlay={true}
            onPlaybackStatusUpdate={(status) => {
              console.log(status, "ss");
            }}
          />
        ) : (
          <TouchableOpacity
            className="w-full h-full justify-center items-center"
            onPress={handelPress}
          >
            <ImageBackground
              source={{
                uri: item.thumbnail,
              }}
              className="w-full h-full absolute"
              resizeMode="contain"
            />
            <Image
              source={icons.play}
              className="w-16 h-16 absolute"
              resizeMode="contain"
              tintColor={"red"}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default LastsCard;
