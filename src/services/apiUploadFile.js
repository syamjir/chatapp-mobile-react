import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase/firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";

export const uploadFileToFirebase = async (file, chatId, senderId) => {
  const fileRef = ref(
    storage,
    `${file.type.split("/")[0]}/${Date.now()}_${file.name}`
  );

  try {
    const snapshot = await uploadBytes(fileRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);

    await addDoc(collection(db, "chats", chatId, "messages"), {
      type: file.type.split("/")[0], // e.g., "audio", "video", "application" (for PDF)
      url: downloadUrl,
      timestamp: Timestamp.now(),
      senderId, // Sender's ID
    });

    console.log(`${file.type.split("/")[0]} uploaded and message sent`);
  } catch (error) {
    console.error("Upload failed:", error);
  }
};
