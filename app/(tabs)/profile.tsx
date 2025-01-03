import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "@/components/HomeHeader";
import CustomInput from "@/components/CustomInput";
import { InputsTypes, LastsCardProps } from "@/constants/Tyes";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import LastsCard from "@/components/LastsCard";
import { useLocalSearchParams } from "expo-router";
import { icons } from "@/constants";
import useAppWrite from "@/lib/useAppwrite";
import { LogOut, userPosts } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GloabalProvider";

const Profile = () => {
  const { query } = useLocalSearchParams();
  const { userData, setUserData, setIsLoggedIn } = useGlobalContext();
  const [searchData, setSearchData] = useState<string | string[]>(query);
  const { isLoading, posts } = useAppWrite({ getData: () => userPosts("1") });
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const logOut = async () => {
    await LogOut();
    setUserData(null);
    setIsLoggedIn(false);
  };
  return (
    <SafeAreaView className=" bg-black-100 h-full">
      <FlatList
        data={[]}
        className="px-4"
        renderItem={({ item }: { item: LastsCardProps }) => (
          <LastsCard item={item} setOpenMenu={setOpenMenu} />
        )}
        keyExtractor={(item: { $id: number }) => item.$id.toString()}
        ListHeaderComponent={
          <View>
            <View className="user_data flex-1 justify-center py-5 items-center">
              <TouchableOpacity
                onPress={logOut}
                className="flex-row w-full p- justify-end"
              >
                <Image
                  source={icons.logout}
                  resizeMode="contain"
                  className="w-10 h-10  rounded-xl"
                />
              </TouchableOpacity>
              <Image
                source={icons.profile}
                resizeMode="contain"
                className="w-14 h-14 mt-1 bg-white rounded-xl"
              />
              <Text className="text-white text-xl font-psemibold my-5">
                Abobakr
              </Text>
              <View className="flex-row flex w-full justify-center items-center gap-4">
                <View className="mr-4 items-center">
                  <Text className="text-white text-xl font-psemibold">10K</Text>
                  <Text className="text-white text-lg font-psemibold">
                    Posts
                  </Text>
                </View>
                <View className="items-center">
                  <Text className="text-white text-xl font-psemibold">10K</Text>
                  <Text className="text-white text-lg font-psemibold">
                    Videos
                  </Text>
                </View>
              </View>
            </View>
            {/* <SearchInput
              type={InputsTypes.search}
              value={`${searchData}`}
              inputStyle="color-white bg-slate-600"
              containerStyle="py-0 my-0"
              handelChange={({ text }: { text: string }) => {
                setSearchData(text);
              }}
            /> */}
            {/* <Text className="text-white my-4">Trending</Text> */}
            {/* <Trending
              data={[
                { id: 1, name: "one" },
                { id: 2, name: "one" },
                { id: 3, name: "one" },
                { id: 4, name: "one" },
                { id: 5, name: "one" },
              ]}
            /> */}
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Profile;
