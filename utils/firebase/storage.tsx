import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "./config";
import { v4 as uuidv4 } from "uuid";
import {
  addListing,
  updateUserCoverPicture,
  updateUserProfilePicture,
} from "./firestore";

export const uploadListingImage = async (
  userID: any,
  file: any[],
  uuid: any,
  data: any,
  collection: any
) => {
  const storageUID = uuidv4();

  if (file.length > 0) {
    console.log("File: ", file);
    const storage = getStorage();
    // const storageRef = ref(storage, `rentals/${rentalUid}/`);
    let UrlList: any = [];
    for (const doc of file) {
      // console.log("file galore", doc);
      const storageRef = ref(
        storage,
        `users/${uuid}/listings/${doc.file.name}`
      );
      const uploadTask = await uploadBytesResumable(storageRef, doc.file);
      const downloadURL = await getDownloadURL(uploadTask.ref);
      UrlList.push(downloadURL);
      console.log("File available at", downloadURL);
    }
    const printdata = {};
    console.log("UrlList: ", {});
    const newData = {
      ...data,
      userID,
      uid: uuid,
      images: UrlList,
    };
    await addListing(newData, collection);

    return true;
  }
  return false;

  // ... existing code ...
};
export const uploadProfileImage = async (file: any, userID: any) => {
  const storage = getStorage();
  const storageRef = ref(storage, `${userID}/profile/${file.name}`);
  try {
    const uploadTask = await uploadBytesResumable(storageRef, file);
    const downloadURL = await getDownloadURL(uploadTask.ref);
    console.log("File available at", downloadURL);
    return downloadURL;
  } catch (error: any) {
    return error;
  }
  // return await updateUserProfilePicture(userID, downloadURL);
};

export const uploadCoverImage = async (file: any, userID: any) => {
  const storage = getStorage();
  const storageRef = ref(storage, `${userID}/cover/${file.name}`);
  const uploadTask = await uploadBytesResumable(storageRef, file);
  const downloadURL = await getDownloadURL(uploadTask.ref);
  // console.log("File available at", downloadURL);

  return await updateUserCoverPicture(userID, downloadURL);
};
export const uploadID = async (files: any[], userID: any) => {
  const storage = getStorage();
  const downloadURLs: any = {};

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const storageRef = ref(storage, `${userID}/NationalID/${file.name}`);
    const uploadTask = await uploadBytesResumable(storageRef, file);
    const downloadURL = await getDownloadURL(uploadTask.ref);

    // Identify front or back based on index
    const label = i === 0 ? "front" : "back";
    downloadURLs[label] = downloadURL;

    // console.log(`File (${label}) available at`, downloadURL);
  }

  return downloadURLs;
};
export const deleteProfileDirectory = async (userID: any) => {
  const storage = getStorage();
  const directoryRef = ref(storage, `${userID}/profile`);

  try {
    const res = await listAll(directoryRef);
    res.items.forEach((fileRef) => {
      deleteObject(fileRef);
    });
    updateUserProfilePicture(userID, "");
    console.log("Profile picture deleted successfully");
    return {
      status: "success",
      message: "Profile picture deleted successfully.",
    };
  } catch (error) {
    console.error("Error deleting profile directory: ", error);
    return {
      status: "error",
      message: "Error deleting profile directory.",
    };
  }
};
export const deleteCoverImageDirectory = async (userID: any) => {
  const storage = getStorage();
  const directoryRef = ref(storage, `${userID}/cover`);

  try {
    const res = await listAll(directoryRef);
    res.items.forEach((fileRef) => {
      deleteObject(fileRef);
    });
    updateUserProfilePicture(userID, "");
    console.log("Cover picture deleted successfully");
    return {
      status: "success",
      message: "Cover picture deleted successfully.",
    };
  } catch (error) {
    console.error("Error deleting cover directory: ", error);
    return {
      status: "error",
      message: "Error deleting cover directory.",
    };
  }
};
