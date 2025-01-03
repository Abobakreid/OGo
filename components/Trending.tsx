import { View, Text, FlatList, Image, ViewToken } from "react-native";
import React, { act, useState } from "react";
import { images } from "@/constants";
import TrendingCard from "./TrendingCard";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LastsCardProps } from "@/constants/Tyes";

const Trending = ({ data }: { data: LastsCardProps[] }) => {
  const [activeItem, setActiveItem] = useState<string | undefined>("1");

  const handelViewItem = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems?.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
    // console.log(activeItem);
  };

  return (
    <>
      <GestureHandlerRootView>
        <FlatList
          data={data}
          keyExtractor={(item) => item.$id.toString()}
          horizontal
          onViewableItemsChanged={handelViewItem}
          showsHorizontalScrollIndicator={false}
          contentOffset={{ x: 170, y: 0 }}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 70,
          }}
          style={{
            marginBottom: 20,
          }}
          renderItem={({ item }) => (
            <TrendingCard item={item} activeItem={activeItem} />
          )}
        />
      </GestureHandlerRootView>
    </>
  );
};

export default Trending;
