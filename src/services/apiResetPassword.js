import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export async function sendPasswordResetMail(email) {
  const auth = getAuth();
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent successfully");
  } catch (err) {
    console.log("Error send in password reset email:", err);
  }
}
