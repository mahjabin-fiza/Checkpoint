// src/services/travelService.js
// React-side Firestore Client SDK

import { db } from '../firebase';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

/**
 * ----------------------------
 *  ROUTES COLLECTION FUNCTIONS
 * ----------------------------
 */

// ✓ Fetch all routes (DAC → all cities)
export async function getAllRoutes() {
  const snapshot = await getDocs(collection(db, 'routes'));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// ✓ Fetch route by ID (ex: "DAC-CXB")
export async function getRouteById(routeId) {
  const ref = doc(db, 'routes', routeId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

// ✓ Find route from → to dynamically
// Example: getRoute("Dhaka", "Sylhet")
export async function getRoute(fromCity, toCity) {
  const q = query(
    collection(db, 'routes'),
    where('from', '==', fromCity),
    where('to', '==', toCity)
  );

  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
}

// ✓ Filter routes by price range (for budgeting)
export function filterRoutesByBudget(routes, maxBudget) {
  return routes.filter((route) => {
    const minCost =
      route.flightPriceMin || route.busPriceMin || route.trainPriceMin || route.carPricePerDayMin;

    return minCost <= maxBudget;
  });
}

/**
 * ----------------------------
 *  DESTINATIONS COLLECTION
 * ----------------------------
 */

export async function getAllDestinations() {
  const snapshot = await getDocs(collection(db, 'destinations'));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// ✓ Fetch destination info by airport code (ex: "CXB")
export async function getDestinationByCode(code) {
  const q = query(collection(db, 'destinations'), where('code', '==', code));
  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
}

// ✓ Fetch destination by name (ex: "Cox's Bazar")
export async function getDestinationByName(name) {
  const q = query(collection(db, 'destinations'), where('name', '==', name));
  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
}

/**
 * ----------------------------
 *  COMBINED UTILITIES
 * ----------------------------
 */

// ✓ Fully combined travel info for itinerary creation
export async function getFullTravelPlan(from, to) {
  const route = await getRoute(from, to);
  if (!route) return null;

  const destination = await getDestinationByCode(route.toCode);

  return {
    ...route,
    destination,
  };
}
