import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

// Add a contact to the current user's contact list
export const addContact = async (currentUserId, contactId, contactData) => {
  try {
    // Create a document in the "contacts" sub-collection of the current user
    console.log(typeof currentUserId, typeof contactId);
    await setDoc(
      doc(db, "users", currentUserId, "contacts", contactId),
      contactData
    );

    console.log("Contact added successfully");
  } catch (error) {
    console.error("Error adding contact: ", error);
  }
};
