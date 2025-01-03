import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "@/components/CustomInput";
import { CreatePostProps, InputsTypes } from "@/constants/Tyes";
import { icons } from "@/constants";
import { ResizeMode, Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { createPost } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GloabalProvider";

const Create = () => {
  const { userData } = useGlobalContext();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [postData, setPostData] = useState<CreatePostProps>({
    postTitle: "",
    postVideoUrl: "",
    postImageUrl: "",
    postDescription: "",
    userId: userData.$id,
  });

  const handleUploadVideo = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    const mediaLibraryPermission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraPermission.status !== "granted") {
      alert("Camera permission is required to capture media.");
      return;
    }

    if (mediaLibraryPermission.status !== "granted") {
      alert("Media Library permission is required to pick photos or videos.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["videos"], // Allow capturing photos and videos
      allowsEditing: false, // Enable basic editing (e.g., cropping)
      quality: 1, // High-quality media
    });

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      setPostData({ ...postData, postVideoUrl: result.assets[0].uri });
    } else {
      alert("You did not select any image.");
    }
  };

  const handleUploadImage = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    const mediaLibraryPermission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraPermission.status !== "granted") {
      alert("Camera permission is required to capture media.");
      return;
    }

    if (mediaLibraryPermission.status !== "granted") {
      alert("Media Library permission is required to pick photos or videos.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"], // Allow capturing photos and videos
      allowsEditing: false, // Enable basic editing (e.g., cropping)
      quality: 1, // High-quality media
    });
    if (!result.canceled) {
      setPostData({ ...postData, postImageUrl: result.assets[0].uri });
    } else {
      alert("You did not select any image.");
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await createPost(postData);
      console.log("Post created successfully", res);
    } catch (error) {
      Alert.alert("Error", "Failed to create post");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="h-ful">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="bg-primary h-full flex-1 w-full px-2">
          <Text className="text-white font-pextrabold text-3xl mt-12">
            Upload
          </Text>
          <CustomInput
            value={postData.postTitle ?? ""}
            type={InputsTypes.name}
            placeholderValue="Create Your Post"
            label="Title"
            containerStyle="mt-4"
            handelChange={({ text }: { text: string }) =>
              setPostData({ ...postData, postTitle: text as string })
            }
          />
          <Text className="text-white text-2xl my-4 ">Upload video</Text>
          <View className="justify-center items-center bg-gray-700 w-full h-72 rounded-2xl relative ">
            <TouchableOpacity
              onPress={handleUploadVideo}
              className="w-full h-full justify-center items-center"
            >
              {postData?.postVideoUrl ? (
                <Video
                  source={{
                    uri: postData?.postVideoUrl,
                  }}
                  className="w-full h-full rounded-lg"
                  resizeMode={ResizeMode.CONTAIN}
                  useNativeControls={true}
                />
              ) : (
                <View>
                  <Image
                    source={icons.upload}
                    className="w-20 h-20"
                    resizeMode="contain"
                  />
                </View>
              )}
            </TouchableOpacity>
          </View>
          <Text className="text-white text-2xl my-4 ">Upload Image</Text>
          <View className="justify-center items-center mt-4 bg-gray-700 w-full h-32 rounded-2xl relative ">
            <TouchableOpacity
              onPress={handleUploadImage}
              className="h-full w-full justify-center items-center"
            >
              {postData?.postImageUrl ? (
                <Image
                  source={{
                    uri: postData?.postImageUrl,
                  }}
                  className="w-full h-full rounded-lg"
                  resizeMode="contain"
                />
              ) : (
                <View>
                  <Image
                    source={icons.upload}
                    className="w-20 h-20"
                    resizeMode="contain"
                  />
                </View>
              )}
            </TouchableOpacity>
          </View>
          <CustomInput
            value={postData.postTitle ?? ""}
            type={InputsTypes.name}
            placeholderValue="Create Your desc.."
            label="Description"
            containerStyle="mt-4"
            handelChange={({ text }: { text: string }) =>
              setPostData({ ...postData, postTitle: text as string })
            }
          />
          <CustomButton
            text="Create"
            onPress={() => handleSubmit()}
            containerStyle={"my-6 mb-12"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
