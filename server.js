import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import hotelPrices from "./api/hotelPrices.js";
import routes from "./api/routes.js";
import destinations from "./api/destinations.js";
// import flights from "./api/flights.js";

const app = express();
app.use(cors());

// REGISTER API ROUTES
app.get("/api/hotelPrices", (req, res) => hotelPrices(req, res));
app.get("/api/routes", (req, res) => routes(req, res));
app.get("/api/destinations", (req, res) => destinations(req, res));
// app.get("/api/flights", (req, res) => flights(req, res));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

