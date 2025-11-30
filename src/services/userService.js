import { db } from '../firebase';
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';

const usersRef = collection(db, 'users');

// CREATE
export const createUser = async (userData) => {
  await addDoc(usersRef, {
    ...userData,
    createdAt: serverTimestamp(),
  });
};

export const getAllUsers = async () => {
  const snapshot = await getDocs(usersRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getUserById = async (id) => {
  const userDoc = await getDoc(doc(db, 'users', id));
  return userDoc.exists() ? { id: userDoc.id, ...userDoc.data() } : null;
};

export const updateUser = async (id, updatedData) => {
  const userDoc = doc(db, 'users', id);
  await updateDoc(userDoc, updatedData);
};

export const deleteUser = async (id) => {
  await deleteDoc(doc(db, 'users', id));
};
