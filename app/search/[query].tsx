import { View, Text, FlatList, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "@/components/HomeHeader";
import { InputsTypes, LastsCardProps } from "@/constants/Tyes";
import SearchInput from "@/components/SearchInput";
import LastsCard from "@/components/LastsCard";
import { useLocalSearchParams } from "expo-router";
import useAppWrite from "@/lib/useAppwrite";
import { getSearchPost } from "@/lib/appwrite";

const Search = () => {
  const { query } = useLocalSearchParams();
  const [searchData, setSearchData] = useState<string | string[]>(query);
  console.log(query);

  const { posts, isLoading } = useAppWrite({
    getData: () => getSearchPost(query as string),
  });

  return (
    <SafeAreaView className=" bg-black-100 h-full">
      <FlatList
        data={posts}
        className="px-4"
        renderItem={({ item }: { item: LastsCardProps }) => (
          <LastsCard item={item} />
        )}
        keyExtractor={(item: { $id: number }) => item.$id.toString()}
        ListHeaderComponent={
          <View>
            <HomeHeader headerText={"search result"} searchText={`${query}`} />
            <SearchInput
              type={InputsTypes.search}
              value={`${searchData}`}
              inputStyle="color-white bg-slate-600"
              containerStyle="py-0 my-0"
              handelChange={({ text }: { text: string }) => {
                setSearchData(text);
              }}
            />
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

export default Search;
