import dotenv from "dotenv";
dotenv.config();   

console.log("ENV CHECK:");
console.log("RAPIDAPI_KEY =", process.env.RAPIDAPI_KEY);
console.log("AIRSCRAPER_HOST =", process.env.AIRSCRAPER_HOST);

import express from "express";
import cors from "cors";

import hotelPrices from "./api/hotelPrices.js";
import flights from "./api/flights.js";

const app = express();
app.use(cors());

app.get("/api/hotelPrices", (req, res) => hotelPrices(req, res));
app.get("/api/flights", (req, res) => flights(req, res));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
