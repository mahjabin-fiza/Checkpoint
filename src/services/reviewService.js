import { db } from "../firebase";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  deleteDoc,
  serverTimestamp
} from "firebase/firestore";

const reviewsRef = collection(db, "reviews");

// CREATE review
export const addReview = async (data) => {
  await addDoc(reviewsRef, { ...data, createdAt: serverTimestamp() });
};

// READ all reviews
export const getAllReviews = async () => {
  const snapshot = await getDocs(reviewsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// DELETE review
export const deleteReview = async (id) => {
  await deleteDoc(doc(db, "reviews", id));
};
