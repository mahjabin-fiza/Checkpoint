import React, { useState, useEffect } from 'react';
import districtsData from '../../data/districtsData';

function LocationDetails({ onClose, to, list, initialIndex = 0 }) {
  const [currentDestIndex, setCurrentDestIndex] = useState(initialIndex);
  const [currentImage, setCurrentImage] = useState(0);

  const activeDestination = list
    ? list[currentDestIndex]
    : districtsData.find((d) => d.name === to);

  useEffect(() => {
    setCurrentImage(0);
  }, [activeDestination?.name]);

  useEffect(() => {
    if (!activeDestination?.destinationPictures?.length) return;
    if (activeDestination.destinationPictures.length === 1) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev + 1 < activeDestination.destinationPictures.length ? prev + 1 : 0
      );
    }, 7000);

    return () => clearInterval(interval);
  }, [activeDestination]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!activeDestination) return null;

  const hasListNav = Array.isArray(list) && list.length > 1;
  const prevDest = () => {
    if (!hasListNav) return;
    setCurrentDestIndex((prev) => (prev === 0 ? list.length - 1 : prev - 1));
  };
  const nextDest = () => {
    if (!hasListNav) return;
    setCurrentDestIndex((prev) => (prev + 1 === list.length ? 0 : prev + 1));
  };

  const prevImage = () => {
    const pics = activeDestination.destinationPictures || [];
    setCurrentImage((prev) => (prev === 0 ? pics.length - 1 : prev - 1));
  };
  const nextImage = () => {
    const pics = activeDestination.destinationPictures || [];
    setCurrentImage((prev) => (prev + 1 === pics.length ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {hasListNav && (
        <>
          <button
            type="button"
            onClick={prevDest}
            className="fixed left-4 top-1/2 -translate-y-1/2 z-[60] text-white/80 text-4xl p-3 rounded-full"
            aria-label="Previous destination"
          >
            &#10094;
          </button>

          <button
            type="button"
            onClick={nextDest}
            className="fixed right-4 top-1/2 -translate-y-1/2 z-[60] text-white/80 text-4xl p-3 rounded-full"
            aria-label="Next destination"
          >
            &#10095;
          </button>
        </>
      )}

      <div className="max-w-[900px] w-full h-[90vh] bg-white rounded-lg shadow-lg flex overflow-hidden mx-4">
        <div className="w-1/2 h-full relative bg-gray-200">
          {(activeDestination.destinationPictures || []).map((pic, idx) => (
            <div
              key={idx}
              className="absolute w-full h-full bg-center bg-cover transition-opacity duration-700 ease-in-out"
              style={{
                backgroundImage: `url(${pic})`,
                opacity: idx === currentImage ? 1 : 0,
              }}
            />
          ))}

          {(activeDestination.destinationPictures || []).length > 1 && (
            <>
              <button
                type="button"
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white/70 px-2 py-1 rounded"
                aria-label="Previous image"
              >
                &#10094;
              </button>
              <button
                type="button"
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 px-2 py-1 rounded"
                aria-label="Next image"
              >
                &#10095;
              </button>
            </>
          )}
        </div>

        <div className="w-1/2 h-full p-6 flex flex-col gap-5 overflow-y-auto relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-2xl font-bold text-gray-600 hover:text-gray-900"
            aria-label="Close details"
          >
            &times;
          </button>

          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{activeDestination.name}</h2>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            {activeDestination.destinationDetails && (
              <p>
                <span className="font-semibold">Description: </span>
                {activeDestination.destinationDetails}
              </p>
            )}

            <p>
              <span className="font-semibold">Airport: </span>
              {activeDestination.airport ?? 'N/A'}
            </p>

            {activeDestination.popularAttractions?.length > 0 && (
              <div>
                <span className="font-semibold">Popular Attractions:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {activeDestination.popularAttractions.map((attr, idx) => (
                    <span key={idx} className="bg-blue-100 px-2 py-1 rounded text-xs">
                      {attr}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-gray-100 p-3 rounded-lg mt-2">
            <h3 className="font-semibold mb-2">Explore {activeDestination.name}</h3>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                className="text-[#729e6a] text-left px-3 py-2 font-semibold bg-white rounded hover:bg-gray-50 hover:text-[#455e41] transition duration-200 ease-in-out"
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/search/restaurants+in+${encodeURIComponent(
                      activeDestination.name
                    )}`,
                    '_blank'
                  )
                }
              >
                Restaurants in {activeDestination.name} &nbsp; ⇒
              </button>

              <button
                type="button"
                className="text-[#729e6a] text-left px-3 py-2 font-semibold bg-white rounded hover:bg-gray-50 hover:text-[#455e41] transition duration-200 ease-in-out"
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/search/hotels+in+${encodeURIComponent(
                      activeDestination.name
                    )}`,
                    '_blank'
                  )
                }
              >
                Hotels in {activeDestination.name} &nbsp; ⇒
              </button>

              <button
                type="button"
                className="text-[#729e6a] text-left px-3 py-2 font-semibold bg-white rounded hover:bg-gray-50 hover:text-[#455e41] transition duration-200 ease-in-out"
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/search/tourist+places+in+${encodeURIComponent(
                      activeDestination.name
                    )}`,
                    '_blank'
                  )
                }
              >
                Tourist places in {activeDestination.name} &nbsp; ⇒
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationDetails;
