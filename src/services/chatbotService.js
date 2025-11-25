import { db } from "../firebase";
import {
  collection,
  doc,
  addDoc,
  getDoc,
  updateDoc,
  serverTimestamp
} from "firebase/firestore";


export const startChatSession = async (userId) => {
  const chatRef = await addDoc(collection(db, "chatbot"), {
    userId,
    messages: [],
    createdAt: serverTimestamp()
  });
  return chatRef.id;
};

export const addMessageToChat = async (sessionId, message) => {
  const chatDoc = doc(db, "chatbot", sessionId);
  const chatSnap = await getDoc(chatDoc);
  const currentMessages = chatSnap.exists() ? chatSnap.data().messages || [] : [];
  await updateDoc(chatDoc, {
    messages: [...currentMessages, { ...message, timestamp: serverTimestamp() }]
  });
};
