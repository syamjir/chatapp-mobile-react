import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const fetchContactsFromDb = async (currentUserId) => {
  const contactsRef = collection(db, "users", currentUserId, "contacts");
  const querySnapshot = await getDocs(contactsRef);

  const contacts = [];
  querySnapshot.forEach((doc) => {
    contacts.push(doc.data());
  });

  return contacts;
};
