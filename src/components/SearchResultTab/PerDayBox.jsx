import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import HotelPopUp from './HotelPopUp';
import SlideDropDown from '../SlideDropDown';
import Arrow from '../Arrow';

const PerDayBox = ({
  from,
  to,
  day,
  perDate,
  travelers,
  hotelCost,
  foodCost,
  onValueChange,
  date,
}) => {
  const options = [
    {
      id: '3',
      mode: 'Low Range',
      cost: 3000,
      count: 0,
    },
    {
      id: '4',
      mode: 'Medium Range',
      cost: 7000,
      count: 0,
    },
    {
      id: '0',
      mode: 'Manually Added',
      cost: 0,
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
const [selectedOption, setSelectedOption] = useState(() => {
  const initial = getInitialOption();
  return Array.isArray(initial) ? initial : [initial];
});


  const [isCustomSelected, setCustomSelected] = useState(false);

useEffect(() => {
  if (!isCustomSelected) {
    const initial = getInitialOption();
    setSelectedOption(Array.isArray(initial) ? initial : [initial]);
  }
}, [hotelCost]);


const hotel = useMemo(() => {
  if (!selectedOption || selectedOption.length === 0) return 0;

  return selectedOption.reduce((acc, opt) => {
    const cost = opt.cost ?? 0;
    const count = opt.count ?? 1;
    return acc + cost * count;
  }, 0);
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
      <p className="">Day - {day} - {perDate}</p>
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
            <div className="font-bold ml-2">{c.mode ?? 'Unknown'}</div>
            {c.id !== '0' && (
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
            )}
          </div>
        </div>
        <div className="px-2">{c.id === '0'
            ? Number(c.cost ?? 0).toLocaleString('en-BD') // manual option
            : ((c.cost ?? 0) * (c.count ?? 1)).toLocaleString('en-BD')}
        </div>
      </div>

      {c.id !== '0' && (
        <SlideDropDown room={c.count ?? 1} isOpen={openDropdowns[c.id]} />
      )}
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
              initialSelected={selectedOption}
            />
          )}
          <div className="w-full flex justify-between items-center">
            <div className="flex">
              <div className="pb-2 px-4 rounded">Food</div>
              <div className="pb-2 px-2 rounded">x {travelers}</div>
            </div>
            <div className="pb-2 px-4 rounded">
              {food.toLocaleString('en-BD')}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PerDayBox;