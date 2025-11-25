import { db } from "../firebase";
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  serverTimestamp
} from "firebase/firestore";

const questionsRef = collection(db, "questions");

// CREATE question
export const askQuestion = async (data) => {
  await addDoc(questionsRef, { ...data, createdAt: serverTimestamp() });
};

// READ all questions
export const getAllQuestions = async () => {
  const snapshot = await getDocs(questionsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// ADD answer to a question
export const addAnswer = async (questionId, answerData) => {
  const answersRef = collection(db, "questions", questionId, "answers");
  await addDoc(answersRef, { ...answerData, createdAt: serverTimestamp() });
};

// READ answers of a question
export const getAnswers = async (questionId) => {
  const answersRef = collection(db, "questions", questionId, "answers");
  const snapshot = await getDocs(answersRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
