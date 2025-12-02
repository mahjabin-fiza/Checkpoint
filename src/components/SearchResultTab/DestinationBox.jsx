import React, { useState, useEffect } from 'react';
import LocationDetails from './LocationDetails';
import { Link } from 'react-router-dom';
import districtsData from '../../data/districtsData';

function DestinationBox({ to }) {
  const [popupOpen, setPopupOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const destination = districtsData.find((dest) => dest.name === to);

  // Auto-slide every 3 seconds
  useEffect(() => {
    if (!destination?.destinationPictures || destination.destinationPictures.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === destination.destinationPictures.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [destination]);

  // Manual navigation
  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? destination.destinationPictures.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev === destination.destinationPictures.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full h-full bg-white p-2 rounded-lg flex flex-col gap-2 shadow-lg">
      {/* Picture Box with slideshow */}
      <div className="relative w-full h-[65%] rounded-lg bg-gray-200 flex items-center justify-center">
        {destination?.destinationPictures?.map((pic, idx) => (
          <div
            key={idx}
            className={`absolute w-full h-full bg-center bg-cover rounded-lg transition-opacity duration-700 ease-in-out`}
            style={{
              backgroundImage: `url(${pic})`,
              opacity: idx === currentImage ? 1 : 0,
            }}
          />
        ))}

        {!destination?.destinationPictures && 'Pictures of destination'}

        {/* Arrows */}
        {destination?.destinationPictures?.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-white/70 px-1 py-1 rounded"
            >
              &#10094;
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 px-1 py-1 rounded"
            >
              &#10095;
            </button>
          </>
        )}
      </div>

      {/* Details Box */}
      <div className="bg-gray-200 w-full rounded-lg flex flex-col justify-center p-3 gap-2">
        {destination ? (
          <>
            <div>
              <p className="text-sm">{destination.destinationDetails}</p>
            </div>
            <div className="flex">
              <button onClick={() => setPopupOpen(true)} className="font-bold">
                details
              </button>
            </div>
          </>
        ) : (
          <p>Details not available</p>
        )}
        {popupOpen && <LocationDetails to={to} onClose={() => setPopupOpen(false)} />}
      </div>

      <div className="bg-gray-100 w-full rounded-lg flex flex-col justify-center p-2">
        {destination ? (
          <div className="flex flex-col gap-1">
            <p className="font-semibold">Popular Attractions:</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {destination.popularAttractions.map((attr, idx) => (
                <span key={idx} className="bg-blue-200 text-blue-900 px-2 py-1 rounded text-xs">
                  {attr}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <p>Popular attractions not available</p>
        )}
      </div>
    </div>
  );
}

export default DestinationBox;
