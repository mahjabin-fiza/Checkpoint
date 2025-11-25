console.log("RAPIDAPI_KEY LOADED =", process.env.RAPIDAPI_KEY);
console.log("AIRSCRAPER_HOST =", process.env.AIRSCRAPER_HOST);

import fetch from "node-fetch";

// Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAe-TSXAAGfU6KfKTyKmAbXADSJLSOpTSs",
  authDomain: "checkpoint-a3f4a.firebaseapp.com",
  projectId: "checkpoint-a3f4a",
  storageBucket: "checkpoint-a3f4a.firebasestorage.app",
  messagingSenderId: "755990588093",
  appId: "1:755990588093:web:6ea45fa97efa3bf10d65d4"
};

const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);

export default async function flights(req, res) {
  try {
    const { from, to, date } = req.query;

    if (!from || !to || !date) {
      return res.status(400).json({
        error: "from, to, date are required"
      });
    }

    const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
    const HOST = process.env.AIRSCRAPER_HOST;

  const url = `https://${HOST}/v1/flights/search-browse?origin=${from}&destination=${to}&date=${date}`;

console.log("SkyScrapper URL:", url);

const response = await fetch(url, {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": RAPIDAPI_KEY,
    "X-RapidAPI-Host": HOST
  }
});

const text = await response.text();
let data;
try {
  data = JSON.parse(text);
} catch (e) {
  console.log("RAW RESPONSE:", text);
  return res.status(500).json({ error: "Invalid JSON from SkyScrapper", raw: text });
}

const flights =
  data?.itineraries?.map((i) => ({
    price: i.price?.amount,
    currency: i.price?.currency,
    departure: i.legs?.[0]?.departure,
    arrival: i.legs?.[0]?.arrival,
    airline: i.legs?.[0]?.airlineName,
    airlineCode: i.legs?.[0]?.airlineCode,
    duration: i.legs?.[0]?.duration,
    bookingUrl: i.bookingUrl
  })) || [];

    const result = {
      from,
      to,
      date,
      flights,
      count: flights.length,
      timestamp: Date.now()
    };

    // Save to Firestore
    await addDoc(collection(db, "flightSearches"), result);

    return res.json(result);
  } catch (err) {
    console.error("FLIGHT PRICE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
}
