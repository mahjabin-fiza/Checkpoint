import React from "react";
import { createUser, getAllUsers } from "./services/userService";
import { createTrip, getAllTrips } from "./services/tripService";
import { auth } from "./firebase";
import { signInAnonymously } from "firebase/auth";

function TestPage() {
  // Ensure user is authenticated before any operation
  const ensureAuth = async () => {
    if (!auth.currentUser) {
      console.log("🔄 Signing in...");
      await signInAnonymously(auth);
      console.log("✅ Signed in!");
    }
  };

  const handleAddUser = async () => {
    try {
      await ensureAuth();
      await createUser({
        name: "Zahna Medha",
        email: "zahna@example.com",
        photoURL: "https://example.com/photo.jpg",
        preferences: {
          theme: "dark",
          language: "en",
          currency: "USD",
        },
      });
      alert("✅ User added to Firestore!");
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error: " + error.message);
    }
  };

  const handleAddTrip = async () => {
    try {
      await ensureAuth();
      await createTrip({
        userId: "12345",
        title: "Summer in Japan",
        destination: "Tokyo, Kyoto",
        startDate: "2025-07-05",
        endDate: "2025-07-20",
        budget: 1800,
        notes: "Booked via Expedia",
      });
      alert("✈️ Trip added to Firestore!");
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error: " + error.message);
    }
  };

  const handleShowTrips = async () => {
    try {
      await ensureAuth();
      const trips = await getAllTrips();
      console.log("Trips:", trips);
      alert(`Found ${trips.length} trips — check console!`);
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error: " + error.message);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>🔥 Firestore Test Page</h2>
      <button onClick={handleAddUser}>Add Test User</button>
      <button onClick={handleAddTrip}>Add Test Trip</button>
      <button onClick={handleShowTrips}>Show Trips</button>
    </div>
  );
}

export default TestPage;