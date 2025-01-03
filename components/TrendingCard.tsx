import {
  View,
  Text,
  Image,
  Animated,
  ImageBackground,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { icons, images } from "@/constants";
import * as Animatable from "react-native-animatable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";
import { LastsCardProps } from "@/constants/Tyes";
import { ResizeMode, Video } from "expo-av";

const TrendingCard = ({
  item,
  activeItem,
}: {
  item: LastsCardProps;
  activeItem?: string;
}) => {
  const [play, setPlay] = useState<boolean>(false);
  const videoSource = item.video ? item.video : "";

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true; // Enable looping
    player.bufferOptions = {
      minBufferForPlayback: 10, // 5 minutes
      maxBufferBytes: 5 * 1024 * 1024,
      preferredForwardBufferDuration: 30, // 5MB buffer
    };
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player?.playing,
  });

  const handelPress = () => {
    if (isPlaying) {
      player.pause(); // Pause the video
    } else {
      player.play(); // Play the video
    }
  };
  useEffect(() => {
    setPlay(isPlaying);
  }, [isPlaying]);

  const scaleIn: Animatable.CustomAnimation = {
    0: { transform: [{ scale: 0.9 }] },
    1: { transform: [{ scale: 1.1 }] },
  };
  const scaleOut: Animatable.CustomAnimation = {
    0: { transform: [{ scale: 1.1 }] },
    1: { transform: [{ scale: 0.9 }] },
  };
  return (
    <Animatable.View
      className={`w-52 h-72  rounded-[33px] my-5 overflow-hidden mx-5`}
      animation={
        (activeItem && activeItem) === item.$id.toString() ? scaleIn : scaleOut
      }
      duration={500}
    >
      <View className="bg-white h-full w-full justify-center items-center relative">
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
            onPress={handelPress}
            className=" h-full w-full red justify-center items-center"
          >
            <ImageBackground
              source={{
                uri: item.thumbnail,
              }}
              resizeMode="cover"
              className={`w-full h-full absolute`}
            />
            <Image
              source={icons.play}
              resizeMode="contain"
              className={`w-14 h-14 absolute`}
              tintColor={"red"}
            />
          </TouchableOpacity>
        )}
      </View>
    </Animatable.View>
  );
};

export default TrendingCard;
