import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
export const handleSignUp = async (email, password, userName, photo) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    if (photo) {
      const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
      await uploadBytes(storageRef, photo);

      const photoURL = await getDownloadURL(storageRef);

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: userName,
        email: user.email,
        photoURL: photoURL,
      });

      // Update the user's profile with username and photoURL
      await updateProfile(user, {
        displayName: userName,
        photoURL: photoURL,
      });
    }

    await user.reload();

    return {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      displayName: user.displayName,
    };
  } catch (error) {
    console.error("An error occurred during user creation: ", error.message);
    throw new Error(error.message);
  }
};
