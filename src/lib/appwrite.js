// ---------------------
// 1 - donor 0
// 0 - organisation
// ---------------------

import {
  Account,
  Avatars,
  Client,
  ID,
  Databases,
  Query,
  Storage,
} from "appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID;
const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const USERS = process.env.NEXT_PUBLIC_USERS_COLLECTION;
const ORGANIZATIONS = process.env.NEXT_PUBLIC_ORGANIZATIONS_COLLECTION;
const DONORS = process.env.NEXT_PUBLIC_DONARS_COLLECTION;
const NEEDS = process.env.NEXT_PUBLIC_NEEDS_COLLECTION;

export const Config = {
  endpoint: BASE_URL,
  projectId: PROJECT_ID,
  databaseId: DATABASE_ID,
};

const { endpoint, projectId, databaseId } = Config;
const client = new Client();
client
  .setEndpoint(endpoint) // Your Appwrite Endpoint
  .setProject(projectId); // Your project ID

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const today = new Date().toISOString();

export const createUser = async (email, password, username, isDonor) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) {
      throw new Error("Account creation failed");
    }
    const avatarUrl = avatars.getInitials(username);
    const newUser = await databases.createDocument(
      databaseId,
      USERS,
      ID.unique(),
      {
        appwrite_id: newAccount.$id,
        is_donor: isDonor === "Donor",
      }
    );
    if (!newUser) {
      throw new Error("User creation failed");
    }
    if (isDonor == "Donor") {
      const newDonor = await databases.createDocument(
        DATABASE_ID, //databaseId
        DONORS, //collectionId
        ID.unique(), //documentId
        {
          user_id: newAccount.$id,
          email,
          name: username,
          avatar_url: avatarUrl,
        }
      );
      await signIn(email, password);
      return newDonor;
    } else {
      const newOrganization = await databases.createDocument(
        DATABASE_ID, //databaseId
        ORGANIZATIONS, //collectionId
        ID.unique(), //documentId
        {
          organisation_id: newAccount.$id,
          organisation_name: username,
          email,
          avatar_url: avatarUrl,
        }
      );
      await signIn(email, password);
      return newOrganization;
    }
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    const is_donor = await databases.listDocuments(
      databaseId,
      USERS,
      // appwrite_id equal to session.account.$id and is_donor equal to 1
      [
        Query.equal("appwrite_id", session.userId), //this userId is in the users table
        Query.equal("is_donor", true),
      ]
    );
    return { session, is_donor: is_donor.documents.length > 0 };
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) {
      throw Error;
    }
    const CurrentUser = await databases.listDocuments(databaseId, USERS, [
      Query.equal("appwrite_id", currentAccount.$id),
    ]);
    if (!CurrentUser) {
      throw Error;
    }
    return CurrentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const getHistory = async () => {
  try {
    
    const data = await databases.listDocuments(databaseId, NEEDS,
      [ Query.equal('completed', true)]
);

    return data.documents;
  } catch (e) {
    throw new Error(e);
  }
};

export const getAllPosts = async () => {
  try {
    const post = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.orderDesc("$createdAt"),
    ]);
    return post.documents;
  } catch (e) {
    throw new Error(e);
  }
};

export const getLatestPost = async () => {
  try {
    const post = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.orderDesc("$createdAt", Query.limit(7)),
    ]);
    return post.documents;
  } catch (e) {
    throw new Error(e);
  }
};

export const searchPost = async (query) => {
  try {
    const post = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.search("title", query),
    ]);
    return post.documents;
  } catch (e) {
    throw new Error(e);
  }
};

export const getUserPosts = async (userId) => {
  try {
    const post = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.equal("creator", userId),
    ]);
    return post.documents;
  } catch (e) {
    throw new Error(e);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (e) {
    throw new Error(e);
  }
};

export const getFilePreview = async (fileId, type) => {
  let fileUrl;
  try {
    if (type == "video") {
      fileUrl = storage.getfileView(storageId, fileId);
    } else if (type == "image") {
      fileUrl = storage.getFilePreview(
        storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }
    if (!fileUrl) {
      throw Error;
    }
    return fileUrl;
  } catch (e) {
    throw new Error(e);
  }
};

export const uploadFile = async (file, type) => {
  if (!file) return;

  const assest = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  };
  try {
    const uploadedFile = await storageId.createFile(
      storageId,
      ID.unique(),
      assest
    );
    const fileUrl = await getFilePreview(uploadedFile.$id, type);
  } catch (e) {
    throw new Error(e);
  }
};

export const createVideo = async (form) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);
    const newPost = await databases.createDocument(
      databaseId,
      videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnailUrl: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );
    return newPost;
  } catch (e) {
    throw new Error(e);
  }
};

export const getUserLikedVideos = async (userId) => {
  try {
    if (!userId) {
      return;
    }
    const post = await databases.listDocuments(
      databaseId,
      likedVideoCollectionId,
      [Query.equal("userId", userId)]
    );
    const videoIds = post.documents.map((doc) => doc.videoId);
    if (videoIds.length === 0) {
      return;
    }
    const data = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.equal("$id", videoIds),
    ]);
    return data.documents;
  } catch (e) {
    throw new Error(e);
  }
};

export const likeVideo = async (userId, videoId) => {
  try {
    const newLike = await databases.createDocument(
      databaseId, //databaseId
      likedVideoCollectionId, //collectionId
      ID.unique(), //documentId
      //data
      {
        userId: userId,
        videoId: videoId,
      }
    );
    return newLike;
  } catch (e) {
    throw new Error(e);
  }
};

export const unlikeVideo = async (userId, videoId) => {
  try {
    if (!userId || !videoId) {
      throw new Error("Invalid userId or videoId");
    }
    const post = await databases.listDocuments(
      databaseId,
      likedVideoCollectionId,
      [Query.equal("userId", userId), Query.equal("videoId", videoId)]
    );

    const documentId = post.documents[0].$id;

    await databases.deleteDocument(
      databaseId,
      likedVideoCollectionId,
      documentId
    );
  } catch (e) {
    throw new Error(e.message);
  }
};
