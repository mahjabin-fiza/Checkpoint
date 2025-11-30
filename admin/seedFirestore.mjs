/**
 * SEED FIRESTORE (ADMIN SDK)
 * ------------------------------------
 * Run with:
 *    node admin/seedFirestore.js
 * ------------------------------------
 */

import dotenv from "dotenv";
dotenv.config();


import admin from "./firebaseAdmin.js";
import fs from "fs";
import path from "path";





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
      "/mnt/data/a648d0fb-a1c7-4643-99e9-7430d7598985.jpeg",
      "https://images.unsplash.com/photo-1506629082955-511b1f7b4b00"
    ],
    destinationDetails: "Cox's Bazar: the world's longest natural sea beach.",
    popularAttractions: ["Longest Beach", "Himchari", "Inani Beach"]
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
      "https://images.unsplash.com/photo-1546571500-3c9b5f7d2d0c",
      "https://images.unsplash.com/photo-1546607605-4d3d6b1e8830"
    ],
    destinationDetails: "Chittagong is the main port city of Bangladesh.",
    popularAttractions: ["Patenga Beach", "Foy's Lake", "Karnaphuli River"]
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
      "https://images.unsplash.com/photo-1549187774-b4a13515b1b3",
      "https://images.unsplash.com/photo-1505765051673-8a2a7a8f4f1b"
    ],
    destinationDetails: "Sylhet: land of tea gardens and green hills.",
    popularAttractions: ["Tea Gardens", "Jaflong", "Ratargul"]
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
      "https://images.unsplash.com/photo-1546195643-0e2b2ff2b7f6",
      "https://images.unsplash.com/photo-1504215680853-026ed2a45def"
    ],
    destinationDetails: "Rajshahi: famous for mango orchards and historic temples.",
    popularAttractions: ["Puthia Temples", "Varendra Museum"]
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
      "https://images.unsplash.com/photo-1543352634-1e05b3d8c4f3",
      "https://images.unsplash.com/photo-1526483360413-1c1dbe9b8dc4"
    ],
    destinationDetails: "Jessore is a key hub for southwest Bangladesh.",
    popularAttractions: ["Local Markets", "Cultural Sites"]
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
      "https://images.unsplash.com/photo-1519817650390-64a93db511d2",
      "https://images.unsplash.com/photo-1524169358660-7a25e9adf4f9"
    ],
    destinationDetails: "Saidpur connects Rangpur and northern Bangladesh.",
    popularAttractions: ["Rail Junction", "Local Bazaars"]
  }
];

const destinations = [
  {
    id: "Cox's Bazar",
    name: "Cox's Bazar",
    code: "CXB",
    pictures: [
      "/mnt/data/a648d0fb-a1c7-4643-99e9-7430d7598985.jpeg",
      "https://images.unsplash.com/photo-1506629082955-511b1f7b4b00"
    ],
    description: "Cox's Bazar: the world's longest natural sea beach.",
    popularAttractions: ["Longest Beach", "Himchari", "Inani Beach"]
  },

  {
    id: "Chittagong",
    name: "Chittagong",
    code: "CGP",
    pictures: ["https://images.unsplash.com/photo-1546571500-3c9b5f7d2d0c"],
    description: "Chittagong is the main port city of Bangladesh.",
    popularAttractions: ["Patenga Beach", "Foy's Lake", "Karnaphuli River"]
  },

  {
    id: "Sylhet",
    name: "Sylhet",
    code: "ZYL",
    pictures: ["https://images.unsplash.com/photo-1549187774-b4a13515b1b3"],
    description: "Sylhet: tea gardens, hills, and natural beauty.",
    popularAttractions: ["Tea Gardens", "Jaflong", "Ratargul"]
  },

  {
    id: "Rajshahi",
    name: "Rajshahi",
    code: "RJH",
    pictures: ["https://images.unsplash.com/photo-1546195643-0e2b2ff2b7f6"],
    description: "Rajshahi: mango orchards and archaeology.",
    popularAttractions: ["Puthia Temples", "Varendra Museum"]
  },

  {
    id: "Dhaka",
    name: "Dhaka",
    code: "DAC",
    pictures: ["https://images.unsplash.com/photo-1508057198894-247b23fe5ade"],
    description: "Dhaka is the fast-paced capital city.",
    popularAttractions: ["Lalbagh Fort", "Ahsan Manzil"]
  },

  {
    id: "Jessore",
    name: "Jessore",
    code: "JSR",
    pictures: ["https://images.unsplash.com/photo-1543352634-1e05b3d8c4f3"],
    description: "Jessore: gateway to Khulna region.",
    popularAttractions: ["Markets", "Cultural Sites"]
  },

  {
    id: "Saidpur",
    name: "Saidpur",
    code: "SPD",
    pictures: ["https://images.unsplash.com/photo-1519817650390-64a93db511d2"],
    description: "Saidpur: northern travel hub.",
    popularAttractions: ["Rail Junction", "Local Markets"]
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

  for (const dest of destinations) {
    await db.collection("destinations").doc(dest.id).set(dest);
    console.log("✔ Seeded destination:", dest.id);
  }

  console.log("🌳 All data written successfully!");
  process.exit(0);
}

seed();