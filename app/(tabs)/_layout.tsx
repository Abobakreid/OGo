import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { TabBarIconProps } from "@/constants/Tyes";
import { icons } from "@/constants";
import TabIcon from "@/components/TabIcon";

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ focused, color }: TabBarIconProps) => {
              return (
                <TabIcon
                  icon={icons.home}
                  focused={focused}
                  name="Home"
                  color={color}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            tabBarIcon: ({ focused, color }: TabBarIconProps) => {
              return (
                <TabIcon
                  icon={icons.upload}
                  focused={focused}
                  name="Create"
                  color={color}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ focused, color }: TabBarIconProps) => {
              return (
                <TabIcon
                  icon={icons.profile}
                  focused={focused}
                  name="Profile"
                  color={color}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            tabBarIcon: ({ focused, color }: TabBarIconProps) => {
              return (
                <TabIcon
                  icon={icons.bookmark}
                  focused={focused}
                  name="Bookmark"
                  color={color}
                />
              );
            },
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
