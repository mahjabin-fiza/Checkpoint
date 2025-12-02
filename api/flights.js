import fetch from "node-fetch";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

console.log(">>> USING flights.js FROM THIS EXACT FILE:", import.meta.url);


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
        error: "from, to, date required"
      });
    }

    const KEY = process.env.RAPIDAPI_KEY;
    const HOST = process.env.AIRSCRAPER_HOST;

    // 🔍 STEP 1 — Convert FROM (IATA → SkyId + EntityId)
    const fromUrl = `https://${HOST}/api/v1/flights/searchAirport?query=${from}`;
    const fromRes = await fetch(fromUrl, {
      headers: {
        "X-RapidAPI-Key": KEY,
        "X-RapidAPI-Host": HOST
      }
    });
    const fromData = await fromRes.json();
    console.log("FROM AIRPORT LOOKUP RAW:", fromData);
    const fromInfo = fromData.data?.[0];

    // 🔍 STEP 2 — Convert TO (IATA → SkyId + EntityId)
    const toUrl = `https://${HOST}/api/v1/flights/searchAirport?query=${to}`;
    const toRes = await fetch(toUrl, {
      headers: {
        "X-RapidAPI-Key": KEY,
        "X-RapidAPI-Host": HOST
      }
    });
    const toData = await toRes.json();
    console.log("TO AIRPORT LOOKUP RAW:", toData);  // <-- ADD THIS
    const toInfo = toData.data?.[0];

    if (!fromInfo || !toInfo) {
      return res.json({ flights: [], error: "Invalid airport code" });
    }

    // ✈️ STEP 3 — Fetch actual flight prices
    const priceUrl = `https://${HOST}/api/v1/flights/searchFlights?originSkyId=${fromInfo.skyId}-sky&destinationSkyId=${toInfo.skyId}-sky&originEntityId=${fromInfo.entityId}&destinationEntityId=${toInfo.entityId}&date=${date}`;
    const priceRes = await fetch(priceUrl, {
      headers: {
        "X-RapidAPI-Key": KEY,
        "X-RapidAPI-Host": HOST
      }
    });
    const priceData = await priceRes.json();
    console.log("RAW PRICE RESPONSE:", priceData);


    const flights = priceData.flights?.map(f => ({
      airline: f.airlineName,
      flightNumber: f.flightNumber,
      price: f.price?.amount,
      currency: f.price?.currency,
      departure: f.departure,
      arrival: f.arrival,
      duration: f.duration,
      bookingUrl: f.bookingUrl
    })) || [];

    const result = {
      from,
      to,
      date,
      flights,
      count: flights.length,
      timestamp: Date.now()
    };

    await addDoc(collection(db, "flightSearches"), result);

    res.json(result);

  } catch (err) {
    console.error("FLIGHT API ERROR:", err);
    res.status(500).json({ error: err.message });
  }
}
