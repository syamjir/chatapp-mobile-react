import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

// Listen for new messages in real-time and update state or pass to callback
export const handleListenForMessages = (chatId, onMessagesUpdate) => {
  const q = query(
    collection(db, "chats", chatId, "messages"),
    orderBy("timestamp", "asc")
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const messages = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,

        timestamp: data.timestamp ? data.timestamp.toDate() : null,
      };
    });

    onMessagesUpdate(messages);
  });

  return unsubscribe;
};
