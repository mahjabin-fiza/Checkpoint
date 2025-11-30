import 'dotenv/config';

import express from "express";
import cors from "cors";

// import both API handlers
import hotelPrices from "./api/hotelPrices.js";
import flights from "./api/flights.js";

const app = express();
app.use(cors());

// hotel prices API
app.get("/api/hotelPrices", (req, res) => hotelPrices(req, res));


app.get("/api/flights", (req, res) => flights(req, res));


const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
