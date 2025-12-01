import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PopularDestinations() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/destinations")
      .then((res) => {
        console.log("DESTINATIONS:", res.data);   // 👈 debug log
        setDestinations(res.data);
      })
      .catch((error) => {
        console.error("API ERROR:", error);
      });
  }, []);

  return (
    <section className="max-w-7xl mx-auto mt-16 px-6">
      <h2 className="text-3xl font-semibold text-[#4B3A2D] text-center mb-10">
        Popular Destinations
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {destinations.map((d, index) => (
          <div
            key={index}
            className="relative rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer bg-white"
          >
            <img
              src={d.pictures?.[0]}      // 👈 VERY IMPORTANT
              alt={d.name}
              className="w-full h-48 object-cover"
            />

            <div className="absolute bottom-0 w-full bg-[#4B3A2D]/85 text-white px-4 py-2 text-lg font-medium">
              {d.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
