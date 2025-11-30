// src/context/HotelContext.js
import React, { createContext, useContext, useRef, useState, useCallback } from 'react';

const HotelContext = createContext();

function computeHotelStats(raw) {
  if (!raw?.hotels?.length) {
    return {
      low: { hotels: [], stats: null },
      medium: { hotels: [], stats: null },
      high: { hotels: [], stats: null },
    };
  }

  const low = [];
  const medium = [];
  const high = [];

  raw.hotels.forEach((h) => {
    // convert to BDT and round up like you were doing elsewhere
    const priceBDT = Math.ceil((h.price ?? 0) * 122);
    const item = { name: h.name, priceBDT };

    if (priceBDT < 3000) low.push(item);
    else if (priceBDT > 10000) high.push(item);
    else medium.push(item);
  });

  const calcStats = (arr) => {
    if (!arr.length) return null;
    const prices = arr.map((x) => x.priceBDT);
    const lowest = Math.min(...prices);
    const highest = Math.max(...prices);
    const avg = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
    return { lowest, highest, avg, count: arr.length };
  };

  return {
    low: { hotels: low, stats: calcStats(low) },
    medium: { hotels: medium, stats: calcStats(medium) },
    high: { hotels: high, stats: calcStats(high) },
  };
}

export function HotelProvider({ children, cacheTTL = 1000 * 60 * 5 /* 5 minutes */ }) {
  const [hotelData, setHotelData] = useState(null);
  const [hotelStats, setHotelStats] = useState(null); // NEW
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // cache and inflight maps stored in refs so they persist across renders
  const cacheRef = useRef(new Map()); // key -> { timestamp, data }
  const inflightRef = useRef(new Map()); // key -> promise
  const abortRef = useRef(null);

  const buildKey = (location, checkin, checkout) => `${location}::${checkin}::${checkout}`;

  const fetchHotels = useCallback(
    async (location, checkin, checkout, { force = false } = {}) => {
      if (!location || !checkin || !checkout) {
        throw new Error('location, checkin and checkout are required');
      }

      const key = buildKey(location, checkin, checkout);

      // Return cached if available and not forced
      if (!force) {
        const cached = cacheRef.current.get(key);
        if (cached) {
          const age = Date.now() - cached.timestamp;
          if (age < cacheTTL) {
            setHotelData(cached.data);
            // compute + set stats from cached data
            setHotelStats(computeHotelStats(cached.data));
            setError(null);
            setLoading(false);
            return { fromCache: true, data: cached.data };
          } else {
            cacheRef.current.delete(key); // expired
          }
        }
      }

      // Deduplicate inflight requests
      const inflight = inflightRef.current.get(key);
      if (inflight) {
        const result = await inflight;
        setHotelData(result);
        setHotelStats(computeHotelStats(result));
        setError(null);
        setLoading(false);
        return { fromCache: false, data: result };
      }

      // Abort previous request if desired (keeps only latest)
      if (abortRef.current) {
        try {
          abortRef.current.abort();
        } catch (e) {}
      }
      const controller = new AbortController();
      abortRef.current = controller;

      setLoading(true);
      setError(null);

      const API_URL = 'http://localhost:5001/api/hotelPrices';
      const url = `${API_URL}?location=${encodeURIComponent(location)}&checkin=${checkin}&checkout=${checkout}`;

      const promise = (async () => {
        try {
          const res = await fetch(url, { signal: controller.signal });
          if (!res.ok) throw new Error(`API Error: ${res.status}`);
          const json = await res.json();

          // cache the result
          cacheRef.current.set(key, { timestamp: Date.now(), data: json });

          return json;
        } catch (err) {
          // rethrow to be handled below
          throw err;
        }
      })();

      inflightRef.current.set(key, promise);

      try {
        const result = await promise;
        inflightRef.current.delete(key);
        abortRef.current = null;

        setHotelData(result);
        setHotelStats(computeHotelStats(result)); // NEW: compute + set stats
        setLoading(false);
        setError(null);
        return { fromCache: false, data: result };
      } catch (err) {
        inflightRef.current.delete(key);
        abortRef.current = null;
        const msg = err?.message || String(err);
        setError(msg);
        setLoading(false);
        throw err;
      }
    },
    [cacheTTL]
  );

  const clearCache = useCallback((location, checkin, checkout) => {
    if (!location) {
      cacheRef.current.clear();
      return;
    }
    const key = buildKey(location, checkin, checkout);
    cacheRef.current.delete(key);
  }, []);

  const value = {
    hotelData,
    hotelStats, // EXPOSED
    loading,
    error,
    fetchHotels,
    clearCache,
    _debug: { cacheRef, inflightRef }, // optional for debugging
  };

  return <HotelContext.Provider value={value}>{children}</HotelContext.Provider>;
}

export function useHotelContext() {
  const ctx = useContext(HotelContext);
  if (!ctx) throw new Error('useHotelContext must be used inside HotelProvider');
  return ctx;
}
