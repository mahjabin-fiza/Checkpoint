import React, { useState } from 'react';
import districtsData from '../data/districtsData';
import LocationDetails from './SearchResultTab/LocationDetails';

export default function PopularDestinations() {
  // show first 5 (or fewer if dataset smaller)
  const topFive = Array.isArray(districtsData) ? districtsData.slice(0, 5) : [];

  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const handleOpenAt = (index) => {
    setStartIndex(index);
    setOpen(true);
  };

  return (
    <section className="max-w-7xl mx-auto mt-16 px-6">
      <h2 className="text-3xl font-semibold text-[#4B3A2D] text-center mb-10">
        Popular Destinations
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {topFive.map((dest, idx) => {
          const name = dest?.name ?? 'Unknown';
          const img = dest?.destinationPictures?.[0] ?? null;

          return (
            <button
              key={dest.id || name}
              onClick={() => handleOpenAt(idx)}
              className="block rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-1 transition text-left duration-300 ease-in-out"
              aria-label={`Open details for ${name}`}
            >
              <div
                className="w-full h-44 bg-gray-200 flex items-end"
                style={{
                  backgroundImage: img ? `url(${img})` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <div className="w-full bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
                  <h3 className="text-white text-lg font-semibold truncate">
                    {name}
                  </h3>
                </div>
              </div>

              <div className="px-3 py-2 bg-white">
                <p className="text-sm text-gray-600">
                  {dest.destinationDetails
                    ? dest.destinationDetails.slice(0, 90) + (dest.destinationDetails.length > 90 ? '…' : '')
                    : 'No description available.'}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Modal for details (pass topFive as list and the initial index) */}
      {open && (
        <LocationDetails
          onClose={() => setOpen(false)}
          list={topFive}
          initialIndex={startIndex}
        />
      )}
    </section>
  );
}
