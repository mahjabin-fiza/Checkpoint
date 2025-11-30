import { db } from '../firebase';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';

const recommendationsRef = collection(db, 'recommendations');

// CREATE recommendation entry
export const createRecommendation = async (data) => {
  await addDoc(recommendationsRef, { ...data, createdAt: serverTimestamp() });
};

// READ all recommendations
export const getAllRecommendations = async () => {
  const snapshot = await getDocs(recommendationsRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
