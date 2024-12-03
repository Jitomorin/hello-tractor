import {
  doc,
  getDoc,
  query,
  where,
  getDocs,
  collection,
  addDoc,
  setDoc,
  updateDoc,
  orderBy,
  deleteDoc,
  arrayUnion,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "./config";
import { v4 as uuidv4 } from "uuid";
import { FirebaseError } from "firebase/app";
import { isDateInRange } from "../formatString";

// function to get documents with multiple filters:
export async function getMultipleFilteredData(
  collectionName: string,
  queries: { field: string; operator: any; value: any }[]
) {
  const q = query(
    collection(db, collectionName),
    ...queries.map(({ field, operator, value }) =>
      where(field, operator, value)
    )
  );
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc: any) => doc.data());
  return data;
}

export async function getMultipleFilteredDataOr(
  collectionName: string,
  queries: { field: string; operator: any; value: any }[]
) {
  const queriesArray = queries.map(({ field, operator, value }) => {
    return query(collection(db, collectionName), where(field, operator, value));
  });

  const querySnapshots = await Promise.all(queriesArray.map((q) => getDocs(q)));
  const data = querySnapshots.flatMap((qs) => qs.docs.map((doc) => doc.data()));
  return data;
}

// Function to fetch documents with filters
export async function getFilteredData(
  collectionName: string,
  field: string,
  operator: any,
  value: any
) {
  const q = query(
    collection(db, collectionName),
    where(field, operator, value)
  );
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc: any) => doc.data());
  return data;
}
export async function getFilteredDataWithLimit(
  collectionName: string,
  field: string,
  operator: any,
  value: any,
  NumOfDocs: any
) {
  const q = query(
    collection(db, collectionName),
    where(field, operator, value),
    limit(NumOfDocs)
  );
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc: any) => doc.data());
  return data;
}
export async function getData(collectionName: string) {
  const q = query(collection(db, collectionName));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc: any) => doc.data());
  return data;
}

// Function to fetch all documents
export async function getAllData(collectionName: string) {
  const q = query(collection(db, collectionName));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc: any) => doc.data());
  return data;
}
export async function getAllRentalSlugs() {
  const q = query(collection(db, "rentals"));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc: any) => doc.data().uid);
  console.log("slug data", data);
  return data;
}
// Function to fetch all sorted documents
export async function getAllSortedData(collectionName: string, sort: string) {
  let selectedSort = {
    name: "dateAdded",
    direction: "desc",
  };
  if (sort === "newest") {
    selectedSort = {
      name: "dateAdded",
      direction: "desc",
    };
  } else if (sort === "oldest") {
    selectedSort = {
      name: "dateAdded",
      direction: "asc",
    };
  } else if (sort === "price-low-to-high") {
    selectedSort = {
      name: "price",
      direction: "asc",
    };
  } else if (sort === "price-high-to-low") {
    selectedSort = {
      name: "price",
      direction: "desc",
    };
  }
  const q = query(
    collection(db, collectionName),
    orderBy(selectedSort.name, selectedSort.direction)
  );
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc: any) => doc.data());
  console.log("sorted data", data);
  return data;
}
// Function to get the number of documents based on the user id
export async function getDataLength(collectionName: string, userId: string) {
  const q = query(
    collection(db, collectionName),
    where("userID", "==", userId)
  );
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc: any) => doc.data());
  // console.log(data.length, "length");
  return data.length;
}

// Function to fetch a specific document
export async function getDocument(collectionName: string, docId: string) {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    return null;
    // throw new Error("No such document!");
  }
}
export async function addNewCart(userId: string) {
  await setDoc(doc(db, "carts", userId), {
    products: [],
    uid: userId,
  });
}

export async function addProductToCart(listing: any, userID: string) {
  const docRef = doc(db, "carts", userID);
  // add the product to the cart
  const cart = await getDoc(docRef);

  try {
    if (cart.exists()) {
      const cartData = cart.data();
      const cartProducts = cartData.products;
      cartProducts.push(listing);

      await updateDoc(docRef, {
        products: cartProducts,
      }).then(() => {});
    } else {
      await setDoc(docRef, {
        products: [listing],
      }).then(() => {});
    }
    return { status: "success", message: "Product added to cart." };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return { status: "error", message: firebaseError.message };
  }
}
export async function removeProductFromCart(listing: any, userID: string) {
  const docRef = doc(db, "carts", userID);
  // get the cart
  const cart = await getDoc(docRef);

  try {
    if (cart.exists()) {
      const cartData = cart.data();
      const cartProducts = cartData.products;
      const updatedCartProducts = cartProducts.filter(
        (product: any) => product.uid !== listing.uid
      );
      // console.log("updatedCartProducts", updatedCartProducts);

      await updateDoc(docRef, {
        products: updatedCartProducts,
      });
    }
    return { status: "success", message: "Product removed from wishlist." };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return { status: "error", message: firebaseError.message };
  }
}
export async function removeAllProductsFromCart(userID: string) {
  const docRef = doc(db, "carts", userID);

  try {
    await updateDoc(docRef, {
      products: [],
    });
    return { status: "success", message: "All products removed from cart." };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return { status: "error", message: firebaseError.message };
  }
}
// Function to change email
// export async function updateUserEmail(userId: string, newEmail: string) {
//   const userRef = doc(db, "users", userId);

//   await updateDoc(userRef, {
//     email: newEmail,
//   });
// }
export async function getRentalsBasedOnRating() {
  const q = query(collection(db, "rentals"));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc: any) => doc.data());
  return data.map((rental: any) => {
    const reviews = rental.reviews;
    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (sum: any, review: any) => sum + review.rating,
        0
      );
      const averageRating = totalRating / reviews.length;
      return { ...rental, averageRating };
    } else {
      return { ...rental, averageRating: 0 };
    }
  });
}

export async function checkRentalAvailability(rentals: any[]) {
  let result: any;
  let data: any = [];
  getAllData("bookings").then((bookingsData) => {
    // console.log("booking data", bookingsData);
    // console.log("rentals", rentals);
    rentals.map((item) => {
      bookingsData.map((booking: any) => {
        // check to see if the rental is in the booking list
        if (item.uid === booking.rental.uid) {
          // check if booking is paid for and if todays date falls under the selected date range
          if (
            !booking.transaction.paid ||
            !isDateInRange(
              booking.selectedDates.startDate,
              booking.selectedDates.endDate
            )
          ) {
            // console.log("we got one", item);
            data.push(item);
            return item;
          }
        } else {
          // console.log("we got one", item);
          data.push(item);
          return item;
        }
      });
    });
    // console.log("result with applied logic", data);
  });
}
export async function AddMessageToChat(docId: string, element: any) {
  const docRef = doc(db, "chats", docId);

  try {
    await updateDoc(docRef, {
      chat: arrayUnion(element),
    });
    return {
      status: "success",
      message: "Sent.",
    };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return { status: "error", message: firebaseError.message };
  }
}
export async function AddRating(docId: string, element: any) {
  const docRef = doc(db, "users", docId);

  try {
    await updateDoc(docRef, {
      reviews: arrayUnion(element),
    });
    return {
      status: "success",
      message: "Review successfully made",
    };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return { status: "error", message: firebaseError.message };
  }
}

export const startChatListener = (
  docId: string,
  callback: (data: any) => void
) => {
  const docRef = doc(db, "chats", docId);

  // Listen to changes in the chat document
  onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      const chatData = doc.data();
      callback(chatData); // Call the callback function with updated chat data
    }
  });
};
export const startCartListener = (
  docId: string,
  callback: (data: any) => void
) => {
  const docRef = doc(db, "carts", docId);

  // Listen to changes in the chat document
  onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      const chatData = doc.data();
      callback(chatData); // Call the callback function with updated chat data
    }
  });
};
export const documentListener = (
  collectionName: string,
  docId: string,
  callback: (data: any) => void
) => {
  const docRef = doc(db, collectionName, docId);

  // Listen to changes in the document
  onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      const data = doc.data();
      callback(data); // Call the callback function with updated chat data
    }
  });
};
export async function updateOrderStatus(orderId: string, status: any) {
  const orderRef = doc(db, "orders", orderId);

  try {
    await updateDoc(orderRef, {
      status,
    });
    return { status: "success", message: "Order updated successfully." };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return { status: "error", message: firebaseError.message };
  }
}
export async function updateBookingInformation(bookingID: string, data: any) {
  const orderRef = doc(db, "bookings", bookingID);
  let result;
  try {
    await updateDoc(orderRef, data);
    result = { status: "success", message: "Booking updated successfully." };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    result = { status: "error", message: firebaseError.message };
  }
  return result;
}
export async function updateOrderInformation(OrderID: string, data: any) {
  const orderRef = doc(db, "orders", OrderID);
  let result;
  try {
    await updateDoc(orderRef, data);
    result = { status: "success", message: "Order updated successfully." };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    result = { status: "error", message: firebaseError.message };
  }
  return result;
}
export async function updateRentalInformation(rentalID: string, data: any) {
  const orderRef = doc(db, "rentals", rentalID);
  let result;
  try {
    await updateDoc(orderRef, data);
    result = { status: "success", message: "Updated successfully." };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    result = { status: "error", message: firebaseError.message };
  }
  return result;
}
export async function updateTractorInformation(uuid: string, data: any) {
  const orderRef = doc(db, "listings", uuid);
  let result;
  try {
    await updateDoc(orderRef, data);
    result = { status: "success", message: "Updated successfully." };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    result = { status: "error", message: firebaseError.message };
  }
  return result;
}
export async function updateOrderTransaction(
  orderId: string,
  transaction: any
) {
  const orderRef = doc(db, "orders", orderId);

  try {
    await updateDoc(orderRef, {
      transaction,
    });
    return { status: "success", message: "Order updated successfully." };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return { status: "error", message: firebaseError.message };
  }
}

export async function updateUserProfile(
  userId: string,
  newEmail: string,
  newFullName: string,
  newPhoneNumber: string,
  newBio: string
) {
  const userRef = doc(db, "users", userId);

  try {
    await updateDoc(userRef, {
      email: newEmail,
      fullName: newFullName,
      phoneNumber: newPhoneNumber,
      bio: newBio,
    });
    return { status: "success", message: "Profile updated successfully." };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return { status: "error", message: firebaseError.message };
  }
}
export async function updateSettings(data: any) {
  const settingsRef = doc(db, "settings", "admin");

  try {
    await updateDoc(settingsRef, data);
    return { status: "success", message: "Settings updated successfully." };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return { status: "error", message: firebaseError.message };
  }
}
export async function updateUserProfileNoEmail(
  userId: string,
  newFullName: string,
  newPhoneNumber: string,
  newBio: string
) {
  const userRef = doc(db, "users", userId);

  try {
    await updateDoc(userRef, {
      fullName: newFullName,
      phoneNumber: newPhoneNumber,
      bio: newBio,
    });
    return { status: "success", message: "Profile updated successfully." };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return { status: "error", message: firebaseError.message };
  }
}
export async function updateUserEmail(userId: string, newEmail: string) {
  const userRef = doc(db, "users", userId);

  try {
    await updateDoc(userRef, {
      email: newEmail,
    });
    return { status: "success", message: "Email updated successfully." };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return { status: "error", message: firebaseError.message };
  }
}
export async function updateUserProfilePicture(
  userId: string,
  profileUrl: string
) {
  const userRef = doc(db, "users", userId);

  try {
    await updateDoc(userRef, {
      profileUrl,
    });
    return {
      status: "success",
      message: "Profile picture updated successfully.",
    };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return { status: "error", message: firebaseError.message };
  }
}
export async function updateUserCoverPicture(
  userId: string,
  coverImageURL: string
) {
  const userRef = doc(db, "users", userId);

  try {
    await updateDoc(userRef, {
      coverImageURL,
    });
    return {
      status: "success",
      message: "Cover image updated successfully.",
    };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return { status: "error", message: firebaseError.message };
  }
}
export async function updateUserRole(userId: string, role: string) {
  const userRef = doc(db, "users", userId);

  try {
    await updateDoc(userRef, {
      role,
    });
    return {
      status: "success",
      message: "Role updated successfully.",
    };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return { status: "error", message: firebaseError.message };
  }
}
export async function updateUserEmailAndPhone(
  userId: string,
  email: string,
  phoneNumber: string
) {
  const userRef = doc(db, "users", userId);

  try {
    await updateDoc(userRef, {
      email,
      phoneNumber,
    });
    return {
      status: "success",
      message: "User updated successfully.",
    };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return { status: "error", message: firebaseError.message };
  }
}

export async function updateUserEmailBioAndPhone(
  userId: string,
  email: string,
  phoneNumber: string,
  bio: string
) {
  const userRef = doc(db, "users", userId);

  try {
    await updateDoc(userRef, {
      email,
      phoneNumber,
      bio,
    });
    return {
      status: "success",
      message: "User updated successfully.",
    };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return { status: "error", message: firebaseError.message };
  }
}
export async function verifyUser(userId: string, isVerified: boolean) {
  const userRef = doc(db, "users", userId);

  try {
    await updateDoc(userRef, {
      isVerified,
    });
    return {
      status: "success",
      message: "User verification successfully changed.",
    };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return { status: "error", message: firebaseError.message };
  }
}
export async function verifyTractor(userId: string, isApproved: boolean) {
  const userRef = doc(db, "listings", userId);

  try {
    await updateDoc(userRef, {
      isApproved,
    });
    return {
      status: "success",
      message: "Approval was a success.",
    };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return { status: "error", message: firebaseError.message };
  }
}

export async function updateSellerInformation(
  userID: string,
  frontID: string,
  backID: string
) {
  const userRef = doc(db, "users", userID);
  try {
    await updateDoc(userRef, {
      sellerInformation: {
        frontID,
        backID,
      },
    });
    return {
      status: "success",
      message: "Role updated successfully.",
    };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return { status: "error", message: firebaseError.message };
  }
}
// Function to check if chat exists
export async function checkIfChatExists(recieverUID: any, senderUID: any) {
  let data: any = [];
  const q = query(
    collection(db, "chats"),
    where("users", "array-contains", recieverUID)
    // where("users", "array-contains", senderUID)
  );
  const querySnapshot = await getDocs(q);
  data = querySnapshot.docs.map((doc: any) => doc.data());
  data.filter((doc: any) => {
    const usersArray = doc.users;
    return usersArray.includes(recieverUID) && usersArray.includes(senderUID);
  });
  return data;
}
// Function to add user data
export async function addData(collectionName: string, data: any) {
  const docRef = await addDoc(collection(db, collectionName), data);
  return docRef.id;
}
// add data with a specific document name
export async function addDataWithDocName(
  collectionName: string,
  docName: string,
  data: any
) {
  const docRef = doc(db, collectionName, docName);
  await setDoc(docRef, data);
}
export async function addUser(data: any) {
  await setDoc(doc(db, "users", data.uid), data);
}
export const getApprovedListings = (listings: any) => {
  return listings.filter((listing: any) => listing.isApproved);
};
export async function addListing(data: any, collection: string) {
  try {
    await setDoc(doc(db, collection, data.uid), {
      ...data,
      availability: true,
      isApproved: false,
      dateAdded: new Date(),
      reviews: [],
    });
    console.log("listing uploaded");
    return { success: true, message: "Listing added successfully." }; // Return success message
  } catch (error) {
    console.error("Error adding listing: ", error); // Log the error for debugging
    return {
      success: false,
      message: "Failed to add listing. Please try again.",
    }; // Return error message
  }
}

export async function setPickupAndDropoffLocations(
  orderUid: string,
  productIndex: number,
  pickupLocation1: string,
  dropoffLocation1: string,
  additionalNotes1: string,
  pickupLocation2: string,
  dropoffLocation2: string,
  additionalNotes2: string
) {
  const orderRef = doc(db, "orders", orderUid);
  // add the data in the element in the product array
  // Get the current state of the document
  getDoc(orderRef).then((snapshot: any) => {
    if (snapshot.exists()) {
      // Make a copy of the products array
      const products = [...snapshot.data().products];
      // Update the specific product
      products[productIndex].locations = {
        pickup_address_1: pickupLocation1,
        dropoff_address_1: dropoffLocation1,
        pickup_notes: additionalNotes1,
        pickup_address_2: pickupLocation2,
        dropoff_address_2: dropoffLocation2,
        dropoff_notes: additionalNotes2,
      };
      try {
        setDoc(
          orderRef,
          {
            [`products`]: products,
          },
          { merge: true }
        );
        return {
          status: "success",
          message: "Locations updated successfully.",
        };
      } catch (error) {
        const firebaseError = error as FirebaseError;
        return { status: "error", message: firebaseError.message };
      }
      // Update the document
    }
  });
}
export async function checkIfRentalIsAvailable(rentalUid: string) {
  // search the table deliveries
  const rentalRef = doc(db, "deliveries", rentalUid);
  const snapshot = await getDoc(rentalRef);

  if (snapshot.exists()) {
    // check selected_dates field
    // check if today is in between the startDate and the endDate
    const today = new Date();
    today.setHours(0, 0, 0, 0); // remove time part

    let isAvailable = true;

    const startDate = new Date(
      snapshot.data().selected_dates.startDate.seconds * 1000
    );
    const endDate = new Date(
      snapshot.data().selected_dates.endDate.seconds * 1000
    );
    if (today >= startDate && today <= endDate) {
      isAvailable = false;
    }
    if (isAvailable) {
      return {
        status: "success",
        message: "Rental is available.",
      };
    } else {
      setRentalAvailability(rentalUid, false).then(() => {
        return {
          status: "error",
          message: "Rental is not available.",
        };
      });
    }
  } else {
    setRentalAvailability(rentalUid, true).then(() => {
      return {
        status: "success",
        message: "Rental is available.",
      };
    });
  }
}

// function to change availability of a rental
export async function setRentalAvailability(
  rentalUid: string,
  availability: any
) {
  const rentalRef = doc(db, "rentals", rentalUid);

  try {
    await updateDoc(rentalRef, {
      availability,
    });
    return {
      status: "success",
      message: "Availability updated successfully.",
    };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return { status: "error", message: firebaseError.message };
  }
}

export async function setProductStatus(
  orderUid: string,
  availability: boolean,
  productIndex: number
) {
  const orderRef = doc(db, "orders", orderUid);
  // add the data in the element in the product array
  // Get the current state of the document
  getDoc(orderRef).then((snapshot: any) => {
    if (snapshot.exists()) {
      // Make a copy of the products array
      const products = [...snapshot.data().products];
      // Update the specific product
      products[productIndex].item.availability = availability;
      try {
        setDoc(
          orderRef,
          {
            [`products`]: products,
          },
          { merge: true }
        );
        return {
          status: "success",
          message: "Availability updated successfully.",
        };
      } catch (error) {
        const firebaseError = error as FirebaseError;
        return { status: "error", message: firebaseError.message };
      }
      // Update the document
    }
  });
}

// Function to check if a document exists
export async function checkDocumentExists(
  collectionName: string,
  docId: string
) {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);

  return docSnap.exists();
}
// Function to delete a document
export async function deleteDocument(collectionName: string, docId: string) {
  try {
    await deleteDoc(doc(db, collectionName, docId));
    return {
      status: "success",
      message: "Successfully deleted",
    };
  } catch (error) {
    console.log("Error deleting document: ", error as FirebaseError);

    return {
      status: "error",
      message: "An error has occurred",
    };
  }
}
