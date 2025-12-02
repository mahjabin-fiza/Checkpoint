import 'dotenv/config';

import express from "express";
import cors from "cors";

import hotelPrices from "./api/hotelPrices.js";
import routes from "./api/routes.js";
import destinations from "./api/destinations.js";

import admin from "./admin/firebaseAdmin.js";
const db = admin.firestore();

async function verifyTokenMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const match = authHeader.match(/^Bearer (.+)$/);
  if (!match) return res.status(401).json({ ok: false, error: "Missing Authorization token" });
  const idToken = match[1];
  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    req.uid = decoded.uid;
    next();
  } catch (err) {
    console.error("Invalid token:", err);
    return res.status(401).json({ ok: false, error: "Invalid token" });
  }
}





const app = express();
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true
}));


app.get("/api/hotelPrices", hotelPrices);
app.get("/api/routes", routes);
app.get("/api/destinations", destinations);


app.post("/api/save-plan", verifyTokenMiddleware, async (req, res) => {
  try {
    const uid = req.uid;
    const body = req.body;
    if (!body.from || !body.to) return res.status(400).json({ ok: false, error: "Missing required fields: from / to" });

    const planId =
      body.updatePlanId ||
      body.id ||
      db.collection("users").doc(uid).collection("plans").doc().id;

    const now = new Date().toISOString();
    const planData = {
      id: planId,
      userId: uid,
      title: body.title || "Untitled Trip",
      from: body.from,
      to: body.to,
      travelers: Number(body.travelers || 0),
      start: body.start || null,
      end: body.end || null,
      budget: Number(body.budget || 0),
      totals: body.totals || {},
      perDay: Array.isArray(body.perDay) ? body.perDay : [],
      hotelCategories: body.hotelCategories || {},
      createdAt: body.createdAt || now,
      updatedAt: now,
    };

    await db.collection("users").doc(uid).collection("plans").doc(planId).set(planData, { merge: true });
    return res.json({ ok: true, plan: planData });
  } catch (err) {
    console.error("SAVE PLAN ERROR:", err);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

app.get("/api/get-plans", verifyTokenMiddleware, async (req, res) => {
  try {
    const uid = req.uid;
    const snap = await db.collection("users").doc(uid).collection("plans").orderBy("updatedAt", "desc").get();
    const plans = snap.docs.map((d) => d.data());
    return res.json({ ok: true, plans });
  } catch (err) {
    console.error("GET PLANS ERROR:", err);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

app.delete("/api/delete-plan/:id", verifyTokenMiddleware, async (req, res) => {
  try {
    const uid = req.uid;
    const id = req.params.id;

    const ref = db.collection("users").doc(uid).collection("plans").doc(id);
    const docSnap = await ref.get();

    if (!docSnap.exists) {
      return res.status(404).json({ ok: false, error: "Plan not found" });
    }

    await ref.delete();
    return res.json({ ok: true, message: "Plan deleted", id });
  } catch (err) {
    console.error("DELETE PLAN ERROR:", err);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

app.put("/api/update-plan/:id", verifyTokenMiddleware, async (req, res) => {
  try {
    const uid = req.uid;
    const id = req.params.id;
    const body = req.body;

    const ref = db.collection("users").doc(uid).collection("plans").doc(id);
    const docSnap = await ref.get();

    if (!docSnap.exists) {
      return res.status(404).json({ ok: false, error: "Plan not found" });
    }

    const now = new Date().toISOString();

    const updatedData = {
      ...body,
      id: id,
      updatedAt: now,
    };

    await ref.set(updatedData, { merge: true });

    return res.json({ ok: true, plan: updatedData });
  } catch (err) {
    console.error("UPDATE PLAN ERROR:", err);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
