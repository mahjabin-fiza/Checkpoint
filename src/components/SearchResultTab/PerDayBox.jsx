import React from 'react';
import { useState, useRef, useEffect } from 'react';
import HotelPopUp from './HotelPopUp';

const PerDayBox = ({
  from,
  to,
  day,
  travelers,
  hotelCost,
  foodCost,
  duration,
}) => {
  const [open, setOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState([]);
  const contentRef = useRef(null);

  const hotel = Math.ceil(hotelCost / duration);
  const food = Math.ceil((foodCost / duration) * travelers);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    if (open) {
      el.style.height = el.scrollHeight + 'px';
    } else {
      el.style.height = '0px';
    }
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      const element = contentRef.current;
      if (open && element) element.style.height = element.scrollHeight + 'px';
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [open]);
  return (
    <>
      <p className="">Day - {day}</p>
      <div className="p-3 bg-white w-full rounded-lg justify-center shadow-lg">
        <div className="flex flex-col bg-gray-200 rounded">
          {selectedOption.length === 0 ? (
            <>
              <div className="w-full bg-gray-300 items-center">
                <p>None</p>
              </div>
            </>
          ) : (
            selectedOption.map((c) => (
              <>
                <div
                  key={c.id}
                  className="w-full bg-gray-300 flex justify-between items-center"
                >
                  <div className="flex">
                    <div className="px-1 text-sm flex items-center">
                      <p className="font-bold ml-2">{c.mode}</p>
                      <button
                        onClick={() => setOpen((s) => !s)}
                        aria-expanded={open}
                      >
                        <svg
                          className={`w-3 h-3 text-[#4B3A2D] transform transition-transform duration-300 ${
                            open ? 'rotate-180' : 'rotate-0'
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="p-2 rounded">
                    {hotel.toLocaleString('en-BD')}
                  </div>
                </div>

                <div
                  ref={contentRef}
                  className="mb-2 mx-2 overflow-hidden transition-[height] duration-300 ease-in-out"
                  style={{ height: '0px' }}
                >
                  <div className="w-full rounded">
                    <p className="p-2">expanded travel option</p>
                    <div className="p-4">more</div>
                  </div>
                </div>
              </>
            ))
          )}
          <button
            onClick={() => setPopupOpen(true)}
            className="ml-1 px-2 font-semibold text-sm hover:underline text-green-700 rounded"
          >
            change
          </button>
          {popupOpen && (
            <HotelPopUp
              onClose={(selectedArray) => {
                setPopupOpen(false);
                if (selectedArray) setSelectedOption(selectedArray);
              }}
              travelers={travelers}
              from={from}
              to={to}
            />
          )}
          <div className="w-full flex justify-between items-center">
            <div className="flex">
              <div className="pb-2 px-2 rounded">Food</div>
              <div className="pb-2 px-2 rounded">x {travelers}</div>
            </div>
            <div className="pb-2 px-2 rounded">
              {food.toLocaleString('en-BD')}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PerDayBox;
