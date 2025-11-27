import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import HotelPopUp from './HotelPopUp';
import SlideDropDown from '../SlideDropDown';
import Arrow from '../Arrow';

const PerDayBox = ({
  from,
  to,
  day,
  travelers,
  hotelCost,
  foodCost,
  onValueChange,
}) => {
  const options = [
    {
      id: '3',
      mode: '3 stars',
      cost: 3000,
      count: 0,
    },
    {
      id: '4',
      mode: '4 stars',
      cost: 7000,
      count: 0,
    },
    {
      id: '5',
      mode: '5 stars',
      cost: 10000,
      count: 0,
    },
  ];

  const getInitialOption = () => {
    if (!Number.isFinite(hotelCost))
      return { ...options[0], count: Math.ceil(travelers / 2) };

    // Find the option with the closest cost to hotelCost
    let closestOption = options[0];
    let minDiff = Math.abs(hotelCost - options[0].cost);

    for (let opt of options) {
      const diff = Math.abs(hotelCost - opt.cost);
      if (diff < minDiff) {
        closestOption = opt;
        minDiff = diff;
      }
    }

    return { ...closestOption, count: Math.ceil(travelers / 2) };
  };

  const [open, setOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(() =>
    getInitialOption()
  );

  const [isCustomSelected, setCustomSelected] = useState(false);

  useEffect(() => {
    if (!isCustomSelected) {
      setSelectedOption(getInitialOption());
    }
  }, [hotelCost]);

  const hotel = useMemo(() => {
    if (!selectedOption) return 0;

    if (Array.isArray(selectedOption)) {
      return selectedOption.reduce(
        (acc, opt) => acc + (opt.cost || 0) * (opt.count || 0),
        0
      );
    } else {
      // single option: use its cost × count
      return (selectedOption.cost || 0) * (selectedOption.count || 1);
    }
  }, [selectedOption]);

  const food = useMemo(
    () => Math.ceil(foodCost * travelers),
    [foodCost, travelers]
  );

  const total = hotel + food;

  useEffect(() => {
    if (onValueChange) onValueChange(total);
  }, [total, onValueChange]);

  return (
    <>
      <p className="">Day - {day}</p>
      <div className="p-3 bg-white w-full rounded-lg justify-center shadow-lg">
        <div className="flex flex-col bg-gray-200 rounded">
          {!selectedOption ||
          (Array.isArray(selectedOption) && selectedOption.length === 0) ? (
            <div className="w-full bg-gray-300 items-center">
              <p>None</p>
            </div>
          ) : Array.isArray(selectedOption) ? (
            <>
              <div className="w-full bg-gray-300 p-2">
                {selectedOption.map((c) => (
                  <div key={c.id}>
                    <div className="w-full bg-gray-300 flex justify-between items-center">
                      <div className="flex">
                        <div className="px-1 text-sm flex items-center">
                          <div className="font-bold ml-2">{c.mode}</div>
                          <Arrow
                            onClick={() =>
                              setOpenDropdowns((prev) => ({
                                ...prev,
                                [c.id]: !prev[c.id],
                              }))
                            }
                            isOpen={openDropdowns[c.id]}
                            className="text-sm font-semibold hover:underline"
                          />
                        </div>
                      </div>
                      <dic className="">{c.cost * c.count}</dic>
                    </div>

                    <SlideDropDown room={c.count} isOpen={openDropdowns[c.id]}>
                      {/* Dropdown content (currently empty) */}
                    </SlideDropDown>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div
                className="w-full bg-gray-300 flex justify-between items-center"
                key={selectedOption.id}
              >
                <div className="flex">
                  <div className="px-1 text-sm flex items-center">
                    <p className="font-bold ml-2">{selectedOption.mode}</p>
                    <Arrow onClick={() => setOpen(!open)} isOpen={open} />
                  </div>
                </div>

                <div className="p-2 rounded">
                  {hotel.toLocaleString('en-BD')}
                </div>
              </div>

              <div>
                <SlideDropDown room={Math.ceil(travelers / 2)} isOpen={open} />
              </div>
            </>
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
                if (!selectedArray) return;
                if (Array.isArray(selectedArray)) {
                  setSelectedOption(selectedArray);
                } else {
                  setSelectedOption(selectedArray);
                }
                setCustomSelected(true);
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