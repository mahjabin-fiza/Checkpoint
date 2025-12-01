import admin from "../admin/firebaseAdmin.js";

export default async function handler(req, res) {
  try {
    const snapshot = await admin.firestore().collection("routes").get();
    const data = snapshot.docs.map(doc => doc.data());
    res.json(data);
  } catch (error) {
    console.error("Error fetching routes:", error);
    res.status(500).json({ error: "Failed to fetch routes" });
  }
}
