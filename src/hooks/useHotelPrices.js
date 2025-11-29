import { useState, useCallback } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export const useHotelPrices = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchAndSaveHotelPrices = useCallback(async (location, checkin, checkout) => {
    setLoading(true);
    setError(null);

    try {
      const API_URL = 'http://localhost:5001/api/hotelPrices';

      const response = await fetch(
        `${API_URL}?location=${encodeURIComponent(location)}&checkin=${checkin}&checkout=${checkout}`
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const hotelData = await response.json();
      setData(hotelData);

      // Save to Firestore
      const docRef = await addDoc(collection(db, 'hotelSearches'), {
        ...hotelData,
        createdAt: serverTimestamp(),
      });

      console.log('Saved to Firebase with ID:', docRef.id);

      setLoading(false);
      return { success: true, hotels: hotelData.hotels, docId: docRef.id };
    } catch (err) {
      console.error('Error fetching hotel prices:', err);
      setError(err.message);
      setLoading(false);
      return { success: false, error: err.message };
    }
  }, []); // memoized, empty dependency array

  return {
    fetchAndSaveHotelPrices,
    loading,
    error,
    data,
  };
};
