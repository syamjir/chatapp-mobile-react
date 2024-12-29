import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

// Add a contact to the current user's contact list
export const addContact = async (currentUserId, contactId, contactData) => {
  try {
    await setDoc(
      doc(db, "users", currentUserId, "contacts", contactId),
      contactData
    );

    console.log("Contact added successfully");
  } catch (error) {
    console.error("Error adding contact: ", error);
  }
};
