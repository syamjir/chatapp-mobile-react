import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

export const handleLogout = async () => {
  try {
    await signOut(auth);
    console.log("user has logged out");
  } catch (err) {
    console.log("Logout error:", err.message);
  }
};
