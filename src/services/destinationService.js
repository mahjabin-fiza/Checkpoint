import { db } from "../firebase";
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

const destinationsRef = collection(db, "destinations");

export const createDestination = async (data) => {
  await addDoc(destinationsRef, data);
};

export const getAllDestinations = async () => {
  const snapshot = await getDocs(destinationsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getDestinationById = async (id) => {
  const destDoc = await getDoc(doc(db, "destinations", id));
  return destDoc.exists() ? { id: destDoc.id, ...destDoc.data() } : null;
};

export const updateDestination = async (id, data) => {
  const destDoc = doc(db, "destinations", id);
  await updateDoc(destDoc, data);
};

export const deleteDestination = async (id) => {
  await deleteDoc(doc(db, "destinations", id));
};
