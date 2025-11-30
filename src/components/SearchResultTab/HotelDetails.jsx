// // src/components/HotelStore.jsx
// import React, { useEffect, useMemo } from 'react';
// import { useHotelContext } from '../context/HotelContext';

// /**
//  * HotelStore
//  *
//  * Props:
//  *  - to: string (location)
//  *  - start: string (YYYY-MM-DD)
//  *  - end: string (YYYY-MM-DD)
//  *  - children: function that receives an object { loading, error, data, checkin, checkout, categorized, priceStats }
//  *
//  * Usage:
//  * <HotelStore to={to} start={start} end={end}>
//  *   {(store) => <MyComponent {...store} />}
//  * </HotelStore>
//  */
// export default function HotelDetails({ to, start, end, children }) {
//   const { fetchHotels, hotelData, loading: ctxLoading, error: ctxError } = useHotelContext();

//   // calculate middle date -> checkin, checkout = checkin + 1 day
//   const { checkin, checkout } = useMemo(() => {
//     if (!start || !end) return { checkin: null, checkout: null };
//     const s = new Date(start);
//     const e = new Date(end);
//     const mid = new Date(s.getTime() + (e.getTime() - s.getTime()) / 2);
//     const ch = new Date(mid);
//     const co = new Date(mid);
//     co.setDate(co.getDate() + 1);
//     const format = (d) => d.toISOString().split('T')[0];
//     return { checkin: format(ch), checkout: format(co) };
//   }, [start, end]);

//   // trigger fetch when to/checkin/checkout change
//   useEffect(() => {
//     if (!to || !checkin || !checkout) return;
//     // fetchHotels handles caching/dedupe in your context
//     // We don't await here (UI will react to context state)
//     fetchHotels(to, checkin, checkout).catch((err) => {
//       // fetchHotels already sets context error; optionally log
//       console.error('HotelStore fetchHotels error', err);
//     });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [to, checkin, checkout]); // fetchHotels stable via useCallback in your context

//   // compute derived data from context hotelData (cheap, memoized)
//   const computed = useMemo(() => {
//     const data = hotelData?.hotels?.length ? hotelData : null;
//     if (!data) {
//       return { categorized: null, priceStats: null };
//     }

//     const hotels = (data.hotels || []).map((h) => ({
//       name: h.name ?? 'Unknown',
//       priceBDT: Math.ceil((h.price || 0) * 122), // convert to BDT
//       raw: h,
//     }));

//     // categories according to your rules
//     const low = hotels.filter((p) => p.priceBDT < 3000);
//     const medium = hotels.filter((p) => p.priceBDT >= 3000 && p.priceBDT <= 10000);
//     const high = hotels.filter((p) => p.priceBDT > 10000);

//     const calcStats = (arr) => {
//       if (!arr.length) return null;
//       const prices = arr.map((x) => x.priceBDT);
//       const lowest = Math.min(...prices);
//       const highest = Math.max(...prices);
//       const avg = Math.round(prices.reduce((s, v) => s + v, 0) / prices.length);
//       return { lowest, highest, avg };
//     };

//     const categorized = {
//       low: { hotels: low, stats: calcStats(low) },
//       medium: { hotels: medium, stats: calcStats(medium) },
//       high: { hotels: high, stats: calcStats(high) },
//     };

//     const allPrices = hotels.map((h) => h.priceBDT);
//     const priceStats =
//       allPrices.length === 0
//         ? null
//         : {
//             overallLowest: Math.min(...allPrices),
//             overallHighest: Math.max(...allPrices),
//             overallAvg: Math.round(allPrices.reduce((s, v) => s + v, 0) / allPrices.length),
//             count: hotels.length,
//           };

//     return { categorized, priceStats, hotels };
//   }, [hotelData]);

//   const out = {
//     loading: ctxLoading,
//     error: ctxError,
//     data: hotelData,
//     checkin,
//     checkout,
//     categorized: computed.categorized,
//     priceStats: computed.priceStats,
//     hotels: computed.hotels,
//   };

//   // render-prop children pattern
//   if (typeof children === 'function') {
//     return children(out) || null;
//   }

//   // alternative: if children not provided, render nothing (this component is a store)
//   return null;
// }
