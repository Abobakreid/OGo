import {
  AppWriteProps,
  CreatePostProps,
  CreateUserProps,
} from "@/constants/Tyes";
import { Alert } from "react-native";
import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Models,
  Query,
  Storage,
  ImageGravity,
} from "react-native-appwrite";

const appWriteConfig: AppWriteProps = {
  endPoint: process.env.ENDPOINT,
  Platform: process.env.PLATFORM,
  projectId: process.env.PROJECTID,
  databaseId: "676b4ad10023bd411b12",
  usersCollectionId: "676b4b200016c311c3b0",
  postsCollectionId: "676b4e9d000221ebf454",
  storageId: process.env.STORAGEID,
};

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("676b3ea4002044a0b8f9")
  .setPlatform("com.abobakr.ogo");

const account = new Account(client);
const avatar = new Avatars(client);
const database = new Databases(client);
const storage = new Storage(client);

export const createUser = async ({
  userName,
  userEmail,
  userPass,
}: CreateUserProps) => {
  // Register User
  if (userEmail && userName && userPass) {
    try {
      const createAccount = await account.create(
        ID.unique(),
        userEmail,
        userPass,
        userName
      );

      if (!createAccount) new Error("something went wrong");

      const userAvatar = await avatar.getInitials(userName);

      await Log_in(userEmail, userPass);

      if (appWriteConfig?.databaseId && appWriteConfig.usersCollectionId) {
        const newUser = await database.createDocument<Models.Document>(
          appWriteConfig?.databaseId,
          appWriteConfig.usersCollectionId,
          ID.unique(),
          {
            accountId: createAccount.$id,
            username: userName,
            email: userEmail,
            avatar: userAvatar,
            password: userPass,
          }
        );

        if (newUser) {
          return newUser;
        }
      }
    } catch (error) {
      Alert.alert("Error", error as string);
    }
  }
};

export const Log_in = async (email: string, password: string) => {
  try {
    const createSession = await account.createEmailPasswordSession(
      email,
      password
    );
    // console.log(createSession, "createSession");
    return createSession;
  } catch (error) {
    Alert.alert("Error", error as string);
  }
};

export const getCurrentUser = async () => {
  try {
    const getUserAccount = await account.get();
    if (!getUserAccount) return getUserAccount;
    if (appWriteConfig.databaseId && appWriteConfig.usersCollectionId) {
      const userData = await database.listDocuments<Models.Document>(
        appWriteConfig.databaseId,
        appWriteConfig.usersCollectionId,
        [Query.equal(`accountId`, getUserAccount.$id)]
      );
      return userData.documents[0];
    }
  } catch (error) {
    Alert.alert("Error", error as string);
  }
};

export const getAllPosts = async () => {
  try {
    if (appWriteConfig.databaseId && appWriteConfig.postsCollectionId) {
      const getPosts = await database.listDocuments<Models.Document>(
        appWriteConfig.databaseId,
        appWriteConfig.postsCollectionId
      );
      return getPosts.documents;
    }
  } catch (error) {
    Alert.alert("Error", error as string);
  }
};

export const getLastsPosts = async () => {
  try {
    if (appWriteConfig.databaseId && appWriteConfig.postsCollectionId) {
      const getPosts = await database.listDocuments<Models.Document>(
        appWriteConfig.databaseId,
        appWriteConfig.postsCollectionId,
        [Query.orderDesc("$createdAt"), Query.limit(7)]
      );
      return getPosts.documents;
    }
  } catch (error) {
    Alert.alert("Error", error as string);
  }
};

export const getSearchPost = async (query: string) => {
  try {
    if (appWriteConfig.databaseId && appWriteConfig.postsCollectionId) {
      const getPosts = await database.listDocuments<Models.Document>(
        appWriteConfig.databaseId,
        appWriteConfig.postsCollectionId,
        [Query.search("title", query)]
      );
      return getPosts.documents;
    }
  } catch (error) {
    Alert.alert("Error", error as string);
  }
};

export const userPosts = async (userId: string) => {
  try {
    if (appWriteConfig.databaseId && appWriteConfig.postsCollectionId) {
      const getPosts = await database.listDocuments<Models.Document>(
        appWriteConfig.databaseId,
        appWriteConfig.postsCollectionId,
        [Query.search("user", userId)]
      );
      return getPosts.documents;
    }
  } catch (error) {
    Alert.alert("Error", error as string);
  }
};

export const LogOut = async () => {
  try {
    const deleteSession = await account.deleteSession("current");
    return deleteSession;
  } catch (error) {
    Alert.alert("Error", error as string);
  }
};

const getFileUrl = async (fileId: string, type: string) => {
  let fileUrl;
  try {
    if (type === "video") {
      fileUrl = await storage.getFileView("676b659f0025f62dd4da", fileId);
    } else {
      fileUrl = storage.getFilePreview(
        "676b659f0025f62dd4da",
        fileId,
        2000,
        2000,
        ImageGravity.Top,
        100
      );
    }
    return fileUrl;
  } catch (error) {
    Alert.alert("Error", error as string);
  }
};

const upLoadFile = async (data: any, type: string) => {
  if (!data) return;

  const { mimeType, ...rest } = data;
  const asset = { type: mimeType, ...rest };
  try {
    const file = await storage.createFile(
      "676b4e9d000221ebf454",
      ID.unique(),
      asset
    );

    const fileUrl = await getFileUrl(file.$id, type);
    return fileUrl;
  } catch (error) {
    Alert.alert("Error", error as string);
  }
};

export const createPost = async (data: CreatePostProps) => {
  try {
    const [imageUrl, video] = await Promise.all([
      upLoadFile(data.postImageUrl, "image"),
      upLoadFile(data.postVideoUrl, "video"),
    ]);

    const postData = await database.createDocument<Models.Document>(
      "676b4ad10023bd411b12",
      "676b4e9d000221ebf454",
      ID.unique(),
      {
        title: data.postTitle,
        desc: data.postDescription,
        thumbnail: imageUrl,
        video: video,
        user: data.userId,
      }
    );
  } catch (error) {
    Alert.alert("Error", error as string);
  }
};
