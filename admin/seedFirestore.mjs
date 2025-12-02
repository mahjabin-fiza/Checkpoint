/**
 * SEED FIRESTORE (ADMIN SDK)
 * ------------------------------------
 * Run with:
 *    node admin/seedFirestore.mjs
 * ------------------------------------
 */

import 'dotenv/config';
import admin from "./firebaseAdmin.js";

const db = admin.firestore();

console.log("🔥 Firebase Admin initialized");

// -----------------------------------------------------------
//  DATASET (ROUTES + DESTINATIONS)
// -----------------------------------------------------------

const routes = [
  {
    id: "DAC-CXB",
    from: "Dhaka",
    fromCode: "DAC",
    to: "Cox's Bazar",
    toCode: "CXB",
    flightPriceMin: 6500,
    flightPriceMax: 9000,
    busPriceMin: 800,
    busPriceMax: 1400,
    trainPriceMin: 0,
    trainPriceMax: 0,
    carPricePerDayMin: 40,
    carPricePerDayMax: 60,
    averageDuration: "1h 10m",
    destinationPictures: [
      "https://images.unsplash.com/photo-1506629082955-511b1f7b4b00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80"
    ],
    destinationDetails:
      "Cox's Bazar is the world's longest natural sea beach, stretching over 120 km along the Bay of Bengal. Famous for its golden sand, beautiful sunsets, and vibrant local markets, it attracts thousands of tourists each year for leisure, adventure, and cultural experiences.",
    popularAttractions: [
      "Longest Beach",
      "Himchari National Park",
      "Inani Beach",
      "Ramu Buddhist Temples",
      "Fishing Harbor"
    ],
    airport: "Cox's Bazar Airport"
  },

  {
    id: "DAC-CGP",
    from: "Dhaka",
    fromCode: "DAC",
    to: "Chittagong",
    toCode: "CGP",
    flightPriceMin: 3800,
    flightPriceMax: 6500,
    busPriceMin: 700,
    busPriceMax: 1600,
    trainPriceMin: 350,
    trainPriceMax: 900,
    carPricePerDayMin: 35,
    carPricePerDayMax: 55,
    averageDuration: "1h 5m",
    destinationPictures: [
      "https://images.unsplash.com/photo-1546571500-3c9b5f7d2d0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1546607605-4d3d6b1e8830?auto=format&fit=crop&w=1200&q=80"
    ],
    destinationDetails:
      "Chittagong is the major port city of Bangladesh, known for its bustling trade, scenic hills, and rich cultural heritage. It offers a mix of natural beauty and urban energy, making it a key hub for travelers exploring the southeastern region.",
    popularAttractions: [
      "Patenga Beach",
      "Foy's Lake",
      "Karnaphuli River",
      "Chittagong Hill Tracts",
      "Ethnological Museum"
    ],
    airport: "Shah Amanat International Airport"
  },

  {
    id: "DAC-ZYL",
    from: "Dhaka",
    fromCode: "DAC",
    to: "Sylhet",
    toCode: "ZYL",
    flightPriceMin: 4200,
    flightPriceMax: 7600,
    busPriceMin: 900,
    busPriceMax: 1800,
    trainPriceMin: 450,
    trainPriceMax: 1100,
    carPricePerDayMin: 45,
    carPricePerDayMax: 70,
    averageDuration: "1h 10m",
    destinationPictures: [
      "https://images.unsplash.com/photo-1549187774-b4a13515b1b3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505765051673-8a2a7a8f4f1b?auto=format&fit=crop&w=1200&q=80"
    ],
    destinationDetails:
      "Sylhet is a picturesque region in northeastern Bangladesh, famous for its lush tea gardens, rolling green hills, and serene waterfalls. Known as the 'Land of Two Leaves and a Bud', Sylhet offers a tranquil escape for nature lovers and cultural enthusiasts alike.",
    popularAttractions: [
      "Tea Gardens",
      "Jaflong",
      "Ratargul Swamp Forest",
      "Lawachara National Park",
      "Shrine of Hazrat Shah Jalal"
    ],
    airport: "Osmani International Airport"
  },

  {
    id: "DAC-RJH",
    from: "Dhaka",
    fromCode: "DAC",
    to: "Rajshahi",
    toCode: "RJH",
    flightPriceMin: 4200,
    flightPriceMax: 7000,
    busPriceMin: 1200,
    busPriceMax: 2000,
    trainPriceMin: 400,
    trainPriceMax: 950,
    carPricePerDayMin: 35,
    carPricePerDayMax: 55,
    averageDuration: "1h 15m",
    destinationPictures: [
      "https://images.unsplash.com/photo-1546195643-0e2b2ff2b7f6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1200&q=80"
    ],
    destinationDetails:
      "Rajshahi, located in western Bangladesh, is renowned for its mango orchards, silk industries, and historical landmarks. It is an educational and cultural hub with scenic river views and vibrant markets, attracting visitors seeking both leisure and heritage.",
    popularAttractions: [
      "Puthia Temples",
      "Varendra Museum",
      "Padma River View",
      "Bagha Mosque",
      "Mahasthangarh Ruins"
    ],
    airport: "Shah Makhdum Airport"
  },

  {
    id: "DAC-JSR",
    from: "Dhaka",
    fromCode: "DAC",
    to: "Jessore",
    toCode: "JSR",
    flightPriceMin: 4500,
    flightPriceMax: 7600,
    busPriceMin: 800,
    busPriceMax: 1600,
    trainPriceMin: 360,
    trainPriceMax: 900,
    carPricePerDayMin: 30,
    carPricePerDayMax: 50,
    averageDuration: "1h 20m",
    destinationPictures: [
      "https://images.unsplash.com/photo-1543352634-1e05b3d8c4f3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1526483360413-1c1dbe9b8dc4?auto=format&w=1200&q=80"
    ],
    destinationDetails:
      "Jessore is an important hub in southwestern Bangladesh, known for its agricultural and cultural significance. It is a gateway to the Khulna region and offers visitors access to historical sites and local traditions.",
    popularAttractions: [
      "Local Markets",
      "Cultural Sites",
      "Jessore Museum",
      "Shrine of Khan Bahadur",
      "Rupsha River Views"
    ],
    airport: "Jessore Airport"
  },

  {
    id: "DAC-SPD",
    from: "Dhaka",
    fromCode: "DAC",
    to: "Saidpur",
    toCode: "SPD",
    flightPriceMin: 3500,
    flightPriceMax: 6400,
    busPriceMin: 1100,
    busPriceMax: 1900,
    trainPriceMin: 300,
    trainPriceMax: 850,
    carPricePerDayMin: 30,
    carPricePerDayMax: 50,
    averageDuration: "1h 10m",
    destinationPictures: [
      "https://images.unsplash.com/photo-1519817650390-64a93db511d2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524169358660-7a25e9adf4f9?auto=format&w=1200&q=80"
    ],
    destinationDetails:
      "Saidpur, in northern Bangladesh, is a regional transport hub connecting Rangpur and surrounding areas. Known for its railway junction and small-scale industries, it provides a gateway for northern travelers.",
    popularAttractions: [
      "Rail Junction",
      "Local Markets",
      "Saidpur Airfield",
      "Nearby Rural Villages"
    ],
    airport: null
  }
];

// -----------------------------------------------------------
//  WRITE DATA TO FIRESTORE
// -----------------------------------------------------------

async function seed() {
  console.log("🌱 Seeding Firestore...");

  for (const route of routes) {
    await db.collection("routes").doc(route.id).set(route);
    console.log("✔ Seeded route:", route.id);
  }

  console.log("🌱 Seeding only destination fields in 'destinations' collection...");

  for (const route of routes) {
    const { id, destinationPictures, destinationDetails, popularAttractions, airport } = route;
    await db.collection("destinations").doc(id).set({
      destinationPictures,
      destinationDetails,
      popularAttractions,
      airport
    });
    console.log("✔ Seeded destination:", id);
  }

  console.log("🌳 All data written successfully!");
  process.exit(0);
}

seed();
