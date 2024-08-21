// ---------------------
// 1 - donor
// 0 - organisation
// in needs table
// 1 - cash
// 2 - in-kind
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
const DONATIONS = process.env.NEXT_PUBLIC_DONATIONS_COLLECTION;
const STORAGE_ID = process.env.NEXT_PUBLIC_STORAGE_ID;
const POST = process.env.NEXT_PUBLIC_POST_COLLECTION;
const LIKES = process.env.NEXT_PUBLIC_LIKES_COLLECTION;

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
const storage = new Storage(client);

export const createPost = async (image_url, isDonor, description) => {
  try {
    let poster_id, poster_url, poster_name;
    if (isDonor) {
      const donor = await getCurrentUser(true);
      poster_id = donor.user_id;
      poster_url = donor.avatar_url;
      poster_name = donor.name;
    } else {
      const organisation = await getCurrentUser(false);
      poster_id = organisation.organisation_id;
      poster_url = organisation.avatar;
      poster_name = organisation.organisation_name;
    }
    if (!image_url) {
      const post = await databases.createDocument(
        databaseId,
        POST,
        ID.unique(),
        {
          poster_name,
          poster_id,
          poster_url,
          description,
        }
      );
    } else {
      const post = await databases.createDocument(
        databaseId,
        POST,
        ID.unique(),
        {
          poster_name,
          poster_id,
          poster_url,
          description,
          image_url,
        }
      );
    }
    return "successfully posted";
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const getAllPost = async () => {
  try {
    // get post in descending order
    const posts = await databases.listDocuments(databaseId, POST, [
      Query.orderDesc("$createdAt"),
    ]);
    return posts.documents;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

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

export const getCurrentUser = async (is_donor) => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) {
      throw Error;
    }
    let CurrentUser;
    if (is_donor) {
      CurrentUser = await databases.listDocuments(databaseId, DONORS, [
        Query.equal("user_id", currentAccount.$id),
      ]);
      if (!CurrentUser) {
        throw Error;
      }
    } else {
      CurrentUser = await databases.listDocuments(databaseId, ORGANIZATIONS, [
        Query.equal("organisation_id", currentAccount.$id),
      ]);
      if (!CurrentUser) {
        throw Error;
      }
    }
    console.log("cu", CurrentUser);
    return CurrentUser.documents[0];
  } catch (error) {
    console.log("this came here");
    console.log(error);
  }
};

export const getOrganisationUser = async (organisation_id) => {
  try {
    const organisation = await databases.listDocuments(
      databaseId,
      ORGANIZATIONS,
      [Query.equal("organisation_id", organisation_id)]
    );
    return organisation.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const getHistory = async () => {
  try {
    const data = await databases.listDocuments(databaseId, NEEDS, [
      Query.equal("completed", true),
    ]);

    return data.documents;
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

export const getNeeds = async () => {
  try {
    const organisation = await getCurrentUser(false);
    const needs = await databases.listDocuments(databaseId, NEEDS, [
      // the completed column should be false
      Query.and([
        Query.equal("completed", false),
        Query.equal("organisation_id", organisation.organisation_id),
      ]),
    ]);
    return needs.documents;
  } catch (e) {
    throw new Error(e);
  }
};

export const getAllNeeds = async () => {
  try {
    const allNeeds = await databases.listDocuments(databaseId, NEEDS, [
      Query.and([
        Query.equal("completed", false),
        Query.greaterThan("total_amt", 0),
      ]),
    ]);
    return allNeeds.documents;
  } catch (e) {
    throw new Error(e);
  }
};

export const getNeedswithNeedsId = async (needsId) => {
  try {
    const needs = await databases.listDocuments(databaseId, NEEDS, [
      Query.equal("$id", needsId),
    ]);
    return needs.documents;
  } catch (e) {
    throw new Error(e);
  }
};

export const getAllNeedsOrganisation = async (userId) => {
  try {
    const allNeeds = await databases.listDocuments(databaseId, NEEDS, [
      Query.and([
        Query.equal("completed", false),
        Query.equal("organisation_id", userId),
      ]),
    ]);

    // Log the response to verify structure (for debugging)

    return allNeeds.documents; // Ensure this matches your data structure
  } catch (e) {
    // Handle and log the error more explicitly
    console.error("Error fetching needs:", e.message || e);
    throw e; // Rethrow to propagate error
  }
};

export const getAllPastDonationsForStatic = async (userId) => {
  try {
    const allNeeds = await databases.listDocuments(databaseId, NEEDS, [
      Query.and([
        Query.equal("completed", true),
        Query.equal("organisation_id", userId),
      ]),
    ]);

    // Log the response to verify structure (for debugging)

    return allNeeds.documents; // Ensure this matches your data structure
  } catch (e) {
    // Handle and log the error more explicitly
    console.error("Error fetching needs:", e.message || e);
    throw e; // Rethrow to propagate error
  }
};

export const organisationDetailsForNeeds = async () => {
  try {
    const details = await databases.listDocuments(databaseId, ORGANIZATIONS);

    return details.documents;
  } catch (e) {
    throw new Error(e);
  }
};

export const getPastDonations = async () => {
  try {
    const organisation = await getCurrentUser(false);
    const donations = await databases.listDocuments(databaseId, NEEDS, [
      Query.and([
        Query.equal("completed", true),
        Query.equal("organisation_id", organisation.organisation_id),
      ]),
    ]);

    return donations.documents;
  } catch (e) {
    throw new Error(e);
  }
};

export const postOrganisationDetails = async (form) => {
  try {
    const organisation = await getCurrentUser(false);
    const updateOrganisation = await databases.updateDocument(
      databaseId,
      ORGANIZATIONS,
      organisation.$id,
      {
        description: form.desc,
        license_id: form.license,
        location: form.location,
        address: form.address,
        ph_no: form.phno,
        photos: form.fileURL,
        type: form.type,
        impact: form.impact,
      }
    );
  } catch (e) {
    throw new Error(e);
  }
};

export const postNeeds = async (form) => {
  try {
    const organisation = await getCurrentUser(false);
    const insertNeeds = await databases.createDocument(
      databaseId,
      NEEDS,
      ID.unique(),
      {
        organisation_id: organisation.organisation_id,
        total_amt: form.amount,
        type: form.iscash,
        kind: form.kindtype,
        description: form.purpose,
        date: form.tillDate["$d"],
        completed: false,
        organisation_name: organisation.organisation_name,
        quantity: form.quantity,
      }
    );
  } catch (e) {
    throw new Error(e);
  }
};
export const postBankDetails = async (form) => {
  try {
    const organisation = await getCurrentUser(false);
    const updateOrganisation = await databases.updateDocument(
      databaseId,
      ORGANIZATIONS,
      organisation.$id,
      {
        account_no: form.number,
        ifsc_code: form.code,
        branch: form.branch,
        account_name: form.name,
        bank_name: form.bankname,
      }
    );
  } catch (e) {
    throw new Error(e);
  }
};
export const getFilePreview = async (fileId, type) => {
  let fileUrl;
  try {
    if (type === "video") {
      fileUrl = storage.getFileView(STORAGE_ID, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        STORAGE_ID,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }
    return fileUrl.href;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const uploadFile = async (file, type) => {
  if (!file) return;

  try {
    const uploadedFile = await storage.createFile(
      STORAGE_ID,
      ID.unique(),
      file
    );
    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const completeNeeds = async (needid) => {
  try {
    const updatedDocument = await databases.updateDocument(
      databaseId,
      NEEDS,
      needid,
      {
        completed: true,
      }
    );
  } catch (error) {
    console.error("Error updating document:", error);
  }
};

export const updateNeeds = async (needid, amount, is_donor, isAnonymous) => {
  try {
    const currentDocument = await databases.getDocument(
      databaseId,
      NEEDS,
      needid
    );

    const currentTotalAmt = currentDocument.total_amt;
    const currentCollectedAmt = currentDocument.collected_amt;

    const newTotalAmt = currentTotalAmt - amount;
    const newCollectedAmt = currentCollectedAmt + amount;
    const updatedDocument = await databases.updateDocument(
      databaseId,
      NEEDS,
      needid,
      {
        total_amt: newTotalAmt,
        collected_amt: newCollectedAmt,
      }
    );
    if (!isAnonymous) {
      const current_user = await getCurrentUser(is_donor);
      const addDonation = await databases.createDocument(
        databaseId,
        DONATIONS,
        ID.unique(),
        {
          organisation_id: currentDocument.organisation_id,
          donor_id: current_user.user_id,
          donation_amt: amount,
        }
      );
      if (is_donor) {
        // update at donar table
        const getData = await databases.listDocuments(databaseId, DONORS, [
          Query.equal("user_id", current_user.user_id),
        ]);
        const updateDonar = await databases.updateDocument(
          databaseId,
          DONORS,
          getData.documents[0].$id,
          {
            total_amount: getData.documents[0].total_amount + amount,
          }
        );
      }
    }
  } catch (error) {
    console.error("Error updating document:", error);
  }
};

export const getLeaderBoard = async () => {
  try {
    // sort the donars based on total_amount in descending order
    const donors = await databases.listDocuments(databaseId, DONORS, [
      // Query.sort("total_amount", "desc"),
      Query.orderDesc("total_amount"),
    ]);
    return donors.documents;
  } catch (e) {
    throw new Error(e);
  }
};

export const getPastContributions = async () => {
  try {
    const user = await getCurrentUser(true);
    const donations = await databases.listDocuments(databaseId, DONATIONS, [
      Query.equal("donor_id", user.user_id),
    ]);

    const contributionsWithOrgNames = await Promise.all(
      donations.documents.map(async (donation) => {
        const organisation = await databases.listDocuments(
          databaseId,
          ORGANIZATIONS,
          [Query.equal("organisation_id", donation.organisation_id)]
        );
        return {
          ...donation,
          organisation_name: organisation.documents[0].organisation_name,
        };
      })
    );

    return contributionsWithOrgNames;
  } catch (e) {
    throw new Error(e);
  }
};

export const likeVideo = async (is_donar, postId, likesCount) => {
  try {
    const user = await getCurrentUser(is_donar);

    if (!user) {
      return;
    }

    const user_id = user.user_id;
    // Add a like to the likes table

    const newLike = await databases.createDocument(
      databaseId, // databaseId
      LIKES, // collectionId
      ID.unique(), // documentId
      {
        user_id,
        post_id: postId,
      }
    );

    const updatedPost = await databases.updateDocument(
      databaseId, // databaseId
      POST, // collectionId
      postId, // documentId
      {
        like: likesCount + 1,
      }
    );

    return { newLike, updatedPost };
  } catch (e) {
    throw new Error(e);
  }
};

export const unlikeVideo = async (is_donar, postid, likesCount) => {
  const user = await getCurrentUser(is_donar);
  if (!user) {
    return;
  }
  const userId = user.user_id;
  try {
    if (!userId || !postid) {
      throw new Error("Invalid userId or videoId");
    }
    const post = await databases.listDocuments(databaseId, LIKES, [
      Query.equal("user_id", userId),
      Query.equal("post_id", postid),
    ]);
    const updatedPost = await databases.updateDocument(
      databaseId, // databaseId
      POST, // collectionId
      postid, // documentId
      {
        like: likesCount - 1,
      }
    );

    const documentId = post.documents[0].$id;

    await databases.deleteDocument(databaseId, LIKES, documentId);
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getUserLikedVideos = async (is_donar) => {
  console.log("donor i got", is_donar);
  const user = await getCurrentUser(is_donar);
  if (!user) {
    return;
  }
  const user_id = user.user_id;
  console.log("sadfs", user, user_id);
  if (!user_id) {
    return;
  }
  try {
    const post = await databases.listDocuments(databaseId, LIKES, [
      Query.equal("user_id", user_id),
    ]);
    console.log("post", post);
    const postIDs = post.documents.map((doc) => doc.post_id);
    if (postIDs.length === 0) {
      return;
    }
    const data = await databases.listDocuments(databaseId, POST, [
      Query.equal("$id", postIDs),
    ]);
    console.log("DATA", data);
    return data.documents;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
