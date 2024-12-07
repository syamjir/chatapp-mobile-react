import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../firebase/firebase"; // Assume firebase is initialized in another file
import { doc, setDoc } from "firebase/firestore";
export const handleSignUp = async (email, password, userName, photo) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log(photo, userName);

    // Upload the user photo to Firebase Storage (optional)
    if (photo) {
      const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
      await uploadBytes(storageRef, photo);

      // Get the uploaded photo URL
      const photoURL = await getDownloadURL(storageRef);
      // Add user info to Firestore
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
    // Refresh the user object after updating the profile
    await user.reload();

    // Reload the user to get the updated profile information
    console.log("User signed up successfully:", user);
    // Access the created user information
    // Log all profile information
    console.log("User Profile Information:");
    console.log("Display Name:", user.displayName);
    console.log("Email:", user.email);
    console.log("UID:", user.uid);
    console.log("Photo URL:", user.photoURL);

    return {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      displayName: user.displayName,
    };
  } catch (error) {
    console.error("An error occurred during user creation: ", error.message);
    throw new Error(error.message); // Rethrow the error for further handling if necessary
  }
};
