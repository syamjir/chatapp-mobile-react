import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

// Send message to Firestore
export const handleSendMessage = async (chatId, senderId, text) => {
  try {
    await addDoc(collection(db, "chats", chatId, "messages"), {
      senderId,
      text,
      timestamp: serverTimestamp(),
    });
    console.log("send message successfully");
  } catch (error) {
    console.error("Error sending message:", error);
  }
};
