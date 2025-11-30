const functions = require("firebase-functions");
const fetch = require("node-fetch");


async function safeFetch(url, host, apiKey) {
  try {
    const response = await fetch(url, {
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": host
      }
    });
    return await response.json();
  } catch (err) {
    console.error(`Error fetching ${host}:`, err);
    return null;
  }
}

exports.hotelPrices = functions.https.onRequest(async (req, res) => {
  try {
    const { location, checkin, checkout } = req.query;

    if (!location || !checkin || !checkout) {
      return res.status(400).send({ error: "Missing location, checkin, or checkout" });
    }

    const RAPIDAPI_KEY = functions.config().rapidapi.key;
    const BOOKING_HOST = functions.config().rapidapi.booking_host;
    const TRIPADVISOR_HOST = functions.config().rapidapi.tripadvisor_host;
    const AIR_SCRAPER_HOST = functions.config().rapidapi.airscraper_host;

    // API URLs
    const bookingUrl = `https://${BOOKING_HOST}/properties/list?city_name=${encodeURIComponent(location)}&checkin_date=${checkin}&checkout_date=${checkout}&guest_qty=1&room_qty=1&order_by=popularity&locale=en-us`;
    const tripUrl = `https://${TRIPADVISOR_HOST}/hotels/search?location=${encodeURIComponent(location)}&checkin=${checkin}&checkout=${checkout}`;
    const airUrl = `https://${AIR_SCRAPER_HOST}/search?city=${encodeURIComponent(location)}&checkin=${checkin}&checkout=${checkout}`;

    // Fetch all APIs in parallel
    const [bookingData, tripData, airData] = await Promise.all([
      safeFetch(bookingUrl, BOOKING_HOST, RAPIDAPI_KEY),
      safeFetch(tripUrl, TRIPADVISOR_HOST, RAPIDAPI_KEY),
      safeFetch(airUrl, AIR_SCRAPER_HOST, RAPIDAPI_KEY)
    ]);

    // Extract prices (fallback to 0)
    const p1 = bookingData?.result?.[0]?.min_total_price || 0;
    const p2 = tripData?.data?.[0]?.price || 0;
    const p3 = airData?.hotels?.[0]?.price || 0;

    // Average calculation
    const prices = [p1, p2, p3].filter(p => p > 0);
    const averagePrice = prices.length > 0 ? prices.reduce((a,b)=>a+b,0)/prices.length : 0;

    res.status(200).send({
      location,
      checkin,
      checkout,
      averagePrice,
      sources: { booking: p1, tripadvisor: p2, airScraper: p3 }
    });

  } catch (err) {
    console.error("Error in hotelPrices function:", err);
    res.status(500).send({ error: err.message });
  }
});
