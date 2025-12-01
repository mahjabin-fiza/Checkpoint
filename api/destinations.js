import admin from "../admin/firebaseAdmin.js";

export default async function handler(req, res) {
  try {
    const snapshot = await admin.firestore().collection("destinations").get();
    const data = snapshot.docs.map(doc => doc.data());
    res.json(data);
  } catch (error) {
    console.error("Error fetching destinations:", error);
    res.status(500).json({ error: "Failed to fetch destinations" });
  }
}
