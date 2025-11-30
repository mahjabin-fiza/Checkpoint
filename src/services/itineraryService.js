import { db } from '../firebase';
import { collection, doc, addDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';

// CREATE itinerary day
export const addItineraryDay = async (tripId, dayData) => {
  const itineraryRef = collection(db, 'trips', tripId, 'itinerary');
  await addDoc(itineraryRef, dayData);
};

// READ all days for a trip
export const getItinerary = async (tripId) => {
  const itineraryRef = collection(db, 'trips', tripId, 'itinerary');
  const snapshot = await getDocs(itineraryRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// UPDATE a day's activities
export const updateItineraryDay = async (tripId, dayId, updatedData) => {
  const dayDoc = doc(db, 'trips', tripId, 'itinerary', dayId);
  await updateDoc(dayDoc, updatedData);
};

// DELETE a day
export const deleteItineraryDay = async (tripId, dayId) => {
  await deleteDoc(doc(db, 'trips', tripId, 'itinerary', dayId));
};
