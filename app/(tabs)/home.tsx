import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Modal,
  Button,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "@/components/HomeHeader";
import CustomInput from "@/components/CustomInput";
import { InputsTypes, LastsCardProps } from "@/constants/Tyes";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import LastsCard from "@/components/LastsCard";
import { icons, images } from "@/constants";
import { getAllPosts } from "@/lib/appwrite";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import useAppWrite from "@/lib/useAppwrite";
import Model from "@/components/Model";

const Home = () => {
  const [searchData, setSearchData] = useState<string | undefined>(undefined);
  const [refresh, setRefresh] = useState<boolean>(false);
  const { posts, isLoading, refetch } = useAppWrite({ getData: getAllPosts });
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const onRefresh = async () => {
    setRefresh(true);
    await refetch();
    setRefresh(false);
    router.replace("/login");
  };

  const handleSaveVideo = () => {
    setOpenMenu(false);
  };

  return (
    <SafeAreaView className=" bg-black-100 h-full">
      <FlatList
        data={posts}
        showsVerticalScrollIndicator={false}
        className="px-4"
        renderItem={({ item }: { item: LastsCardProps }) => (
          <LastsCard item={item} setOpenMenu={setOpenMenu} />
        )}
        keyExtractor={(item: { $id: number }) => item.$id.toString()}
        ListHeaderComponent={
          <View>
            <HomeHeader
              headerText={"Welcome Back"}
              searchText={`Abo_bakr`}
              icon={images.logoSmall}
            />

            <SearchInput
              type={InputsTypes.search}
              value={searchData ?? ""}
              inputStyle="color-white bg-slate-600"
              containerStyle="py-0 my-0"
              handelChange={({ text }: { text: string }) => {
                setSearchData(text);
              }}
            />

            {posts?.length > 0 && (
              <Text className="text-white my-4 text-2xl">Trending</Text>
            )}

            <Trending data={posts} />
          </View>
        }
        ListEmptyComponent={
          <View className="justify-center items-center flex-1">
            <TouchableOpacity
              onPress={() => {
                setOpenMenu(true);
              }}
            >
              <Text className="text-white bg-slate-500 text-xl font-bold mb-4">
                HEloo
              </Text>
            </TouchableOpacity>
            <Image
              source={images.empty}
              resizeMode="contain"
              className="w-52 h-52"
            />
            <CustomButton
              text="Create Video"
              containerStyle="mt-4"
              isLoading={isLoading}
              onPress={() => {
                router.push("/create");
              }}
            />
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      />
      <Model openMenu={openMenu} setOpenMenu={setOpenMenu} />
    </SafeAreaView>
  );
};

export default Home;
