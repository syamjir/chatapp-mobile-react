import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

export const handleSignIn = async (userEmail, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      userEmail,
      password
    );

    console.log("Logged in as:", userCredential.user);
    const {
      photoURL: photo,
      displayName: userName,
      uid,
      email,
    } = userCredential.user;
    return { photo, userName, uid, email };
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw new Error("Error logging in");
  }
};
