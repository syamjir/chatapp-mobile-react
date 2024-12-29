import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const searchUsers = async (searchTerm) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", searchTerm));
  const querySnapshot = await getDocs(q);

  const users = [];
  querySnapshot.forEach((doc) => {
    const userData = doc.data();
    console.log("User Data:", userData);
    users.push(doc.data());
  });
  console.log(users);
  return users;
};
