import { View, Text, FlatList, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "@/components/HomeHeader";
import CustomInput from "@/components/CustomInput";
import { InputsTypes, LastsCardProps } from "@/constants/Tyes";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import LastsCard from "@/components/LastsCard";
import { useLocalSearchParams } from "expo-router";

const Bookmark = () => {
  const [searchData, setSearchData] = useState<string | undefined>("");
  const [openMenu, setOpenMenu] = useState<boolean>(false);
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
            <HomeHeader searchText={`Saved Videos`} />
            <SearchInput
              type={InputsTypes.search}
              value={`${searchData}`}
              inputStyle="color-white bg-slate-600"
              containerStyle="py-0 my-0"
              handelChange={({ text }: { text: string }) => {
                setSearchData(text);
              }}
            />
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Bookmark;
