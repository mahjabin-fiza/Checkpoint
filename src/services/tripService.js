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

const tripsRef = collection(db, "trips");

// CREATE a trip
export const createTrip = async (tripData) => {
  await addDoc(tripsRef, {
    ...tripData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

// READ all trips (optionally filter by user)
export const getAllTrips = async () => {
  const snapshot = await getDocs(tripsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// READ single trip
export const getTripById = async (id) => {
  const tripDoc = await getDoc(doc(db, "trips", id));
  return tripDoc.exists() ? { id: tripDoc.id, ...tripDoc.data() } : null;
};

// UPDATE trip
export const updateTrip = async (id, updatedData) => {
  const tripDoc = doc(db, "trips", id);
  await updateDoc(tripDoc, { ...updatedData, updatedAt: serverTimestamp() });
};

// DELETE trip
export const deleteTrip = async (id) => {
  await deleteDoc(doc(db, "trips", id));
};
