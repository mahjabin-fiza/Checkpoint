import { db } from '../firebase';
import { doc, setDoc, getDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';

// CREATE USER using UID from Firebase Auth
export const createUser = async (uid, userData) => {
  await setDoc(doc(db, 'users', uid), {
    ...userData,
    createdAt: serverTimestamp(),
  });
};

// READ USER
export const getUserById = async (uid) => {
  const userDoc = await getDoc(doc(db, 'users', uid));
  return userDoc.exists() ? { id: uid, ...userDoc.data() } : null;
};

// UPDATE USER
export const updateUser = async (uid, updatedData) => {
  await updateDoc(doc(db, 'users', uid), updatedData);
};

// DELETE USER
export const deleteUser = async (uid) => {
  await deleteDoc(doc(db, 'users', uid));
};
