import React from "react";

const destinations = [
  {
    name: "Cox's Bazar",
    image: "https://images.pexels.com/photos/163167/beach-sea-sunset-sunrise-163167.jpeg"
  },
  {
    name: "Sylhet",
    image: "https://images.pexels.com/photos/1293124/pexels-photo-1293124.jpeg"
  },
  {
    name: "Bandarban",
    image: "https://images.pexels.com/photos/1470407/pexels-photo-1470407.jpeg"
  },
  {
    name: "Chittagong",
    image: "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg"
  },
];

export default function PopularDestinations() {
  return (
    <section className="max-w-7xl mx-auto mt-16 px-6">
      <h2 className="text-3xl font-semibold text-[#4B3A2D] text-center mb-10">
        Popular Destinations
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {destinations.map((d, i) => (
          <div
            key={i}
            className="relative rounded-2xl shadow-lg overflow-hidden 
                       hover:scale-105 transition-transform duration-300 cursor-pointer bg-white"
          >
            <img
              src={d.image}
              alt={d.name}
              className="w-full h-48 object-cover"
            />

            <div className="absolute bottom-0 w-full 
                            bg-[#4B3A2D]/85 
                            text-white px-4 py-2 
                            text-lg font-medium">
              {d.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
