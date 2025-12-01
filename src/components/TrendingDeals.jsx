import React from 'react';

const deals = [
  {
    title: "Dhaka → Cox's Bazar Flights",
    price: 'From 6,500 Tk',
    image: 'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg',
  },
  {
    title: 'Top Hotels in Sylhet',
    price: 'From 2,499 Tk',
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
  },
  {
    title: 'Weekend Trip to Bandarban',
    price: 'From 1,200 Tk',
    image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
  },
];

export default function TrendingDeals() {
  return (
    <section className="max-w-7xl mx-auto mt-20 px-6">
      <h2 className="text-3xl font-semibold text-[#4B3A2D] text-center mb-10">Trending Deals</h2>

      <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide">
        {deals.map((d, i) => (
          <div
            key={i}
            className="min-w-[280px] bg-white rounded-2xl shadow-lg overflow-hidden 
                       hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <img src={d.image} className="w-full h-40 object-cover" alt={d.title} />

            <div className="p-5">
              <h3 className="text-lg font-semibold text-[#4B3A2D]">{d.title}</h3>
              <p className="text-[#4B3A2D] font-bold mt-1">{d.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
