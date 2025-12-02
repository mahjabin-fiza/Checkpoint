import fetch from "node-fetch";

import admin from "../admin/firebaseAdmin.js";

const firebaseConfig = {
  apiKey: "AIzaSyAe-TSXAAGfU6KfKTyKmAbXADSJLSOpTSs",
  authDomain: "checkpoint-a3f4a.firebaseapp.com",
  projectId: "checkpoint-a3f4a",
  storageBucket: "checkpoint-a3f4a.firebasestorage.app",
  messagingSenderId: "755990588093",
  appId: "1:755990588093:web:6ea45fa97efa3bf10d65d4"
};

const db = admin.firestore();

export default async function handler(req, res) {
  try {
    const { location, checkin, checkout } = req.query;

    const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
    const BOOKING_HOST = process.env.BOOKING_HOST;

   
    const locUrl = `https://${BOOKING_HOST}/locations/auto-complete?text=${encodeURIComponent(
      location
    )}&languagecode=en-us`;

    const locRes = await fetch(locUrl, {
      headers: {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": BOOKING_HOST,
      },
    });

    const locData = await locRes.json();
    console.log("Location data:", locData);

    if (!locData || locData.length === 0) {
      return res.status(200).json({
        hotels: [],
        count: 0,
        averagePrice: 0,
        message: "No matching city found."
      });
    }

    const destId = locData[0].dest_id;

    // 2) Search Hotels using destination ID
    const searchUrl = `https://${BOOKING_HOST}/properties/list?offset=0&arrival_date=${checkin}&departure_date=${checkout}&dest_ids=${destId}&guest_qty=1&room_qty=1&search_type=city&children_qty=0&adults_number=1&languagecode=en-us`;

    const hotelRes = await fetch(searchUrl, {
      headers: {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": BOOKING_HOST,
      },
    });

    const hotelData = await hotelRes.json();
    console.log("Hotel search result:", hotelData);

    const hotels =
      hotelData?.result?.map((h) => ({
        id: h.hotel_id,
        name: h.hotel_name,
        price: h.min_total_price,
        image: h.main_photo_url,
        rating: h.review_score,
        address: h.address,
      })) || [];

    const validPrices = hotels
      .filter((h) => h.price)
      .map((h) => Number(h.price));

    const averagePrice = validPrices.length
      ? validPrices.reduce((a, b) => a + b, 0) / validPrices.length
      : 0;

    const responseResult = {
      hotels,
      count: hotels.length,
      averagePrice,
      location,
      checkin,
      checkout,
      timestamp: Date.now(),
    };

    await db.collection("hotelSearches").add(responseResult);

    return res.status(200).json(responseResult);
  } catch (error) {
    console.error("API ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
}
