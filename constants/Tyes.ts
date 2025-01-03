import React, { Dispatch, SetStateAction } from "react";
import { Image, ImageSourcePropType } from "react-native";

/// types for my app

/// enums for my app
export type TabIconProp = {
  focused: boolean;
  name: string;
  icon: ImageSourcePropType;
  color: string;
};

export type TabBarIconProps = {
  focused: boolean;
  color: string;
};

export type CustomButtonProps = {
  text: string;
  containerStyle?: string;
  isLoading?: boolean;
  onPress: () => void;
};

export type CustomInputProps = {
  type: string;
  value: string;
  inputStyle?: string;
  label?: string;
  containerStyle?: string;
  placeholderValue?: string;
  icon?: ImageSourcePropType;
  handelChange: ({ text }: { text: string }) => void;
};

export type AppWriteProps = {
  endPoint?: string | undefined;
  Platform?: string | undefined;
  projectId?: string | undefined;
  databaseId?: string | undefined;
  usersCollectionId?: string | undefined;
  postsCollectionId?: string | undefined;
  storageId?: string | undefined;
};

export type HomeHeaderProps = {
  headerText?: string;
  searchText?: string;
  icon?: ImageSourcePropType;
};

export type CreateUserProps = {
  userName: string;
  userEmail?: string;
  userPass?: string;
};
export type CreatePostProps = {
  postTitle: string;
  postVideoUrl: string;
  postImageUrl: string;
  postDescription: string;
  userId: string;
};

type user = {};

export type LastsCardProps = {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: number;
  $permissions: [];
  $updatedAt: string;
  desc: string;
  thumbnail: string;
  title: string;
  user: user[];
  video: string;
};

/// enums for my app

/// enums for my custom input
export enum InputsTypes {
  name = "none",
  email = "email",
  password = "password",
  search = "search",
}
