import React, { useState, useEffect, useMemo } from 'react';
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
  hotelCategories,
}) => {
  // Options template
  const optionsTemplate = [
    { id: '3', mode: 'Low Range', cost: hotelCategories?.low?.avg ?? 2000, count: 1 },
    { id: '4', mode: 'Medium Range', cost: hotelCategories?.medium?.avg ?? 5000, count: 1 },
    { id: '5', mode: 'High Range', cost: hotelCategories?.high?.avg ?? 10000, count: 1 },
    { id: '0', mode: 'Manually Added', cost: 0, count: 0, manualCost: 0 },
  ];

  const getInitialOption = () => {
    if (!Number.isFinite(hotelCost)) return { ...optionsTemplate[0], count: Math.ceil(travelers / 2) };

    let closestOption = optionsTemplate[0];
    let minDiff = Math.abs(hotelCost - optionsTemplate[0].cost);

    for (let opt of optionsTemplate) {
      const diff = Math.abs(hotelCost - opt.cost);
      if (diff < minDiff) {
        closestOption = opt;
        minDiff = diff;
      }
    }

    return { ...closestOption, count: Math.ceil(travelers / 2) };
  };

  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState([getInitialOption()]);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [isCustomSelected, setCustomSelected] = useState(false);

  // Reset if hotelCost/hotelCategories change and not custom
  useEffect(() => {
    if (!isCustomSelected) setSelectedOption([getInitialOption()]);
  }, [hotelCost, hotelCategories]);

  // Hotel cost total
  const hotel = useMemo(() => {
    return selectedOption.reduce((acc, opt) => {
      const costPerRoom = opt.id === '0' ? opt.manualCost ?? 0 : opt.cost ?? 0;
      return acc + costPerRoom * (opt.count ?? 1);
    }, 0);
  }, [selectedOption]);

  const food = useMemo(() => Math.ceil(foodCost * travelers), [foodCost, travelers]);
  const total = hotel + food;

  useEffect(() => {
    if (onValueChange) onValueChange(total);
  }, [total, onValueChange]);

  return (
    <>
      <p>Day - {day}</p>
      <div className="p-3 bg-white w-full rounded-lg shadow-lg">
        <div className="flex flex-col bg-gray-200 rounded">
          {selectedOption.length === 0 ? (
            <div className="w-full bg-gray-300 items-center">
              <p>None</p>
            </div>
          ) : (
            <div className="w-full bg-gray-300 rounded">
              {selectedOption.map((c) => (
                <div key={c.id}>
                  <div className="w-full bg-gray-300 p-1 flex justify-between items-center rounded">
                    <div className="flex">
                      <div className="px-1 text-sm flex items-center">
                        <div className="font-bold ml-2">{c.mode}</div>
                        {c.id !== '0' && (
                          <Arrow
                            onClick={() =>
                              setOpenDropdowns((prev) => ({ ...prev, [c.id]: !prev[c.id] }))
                            }
                            isOpen={openDropdowns[c.id]}
                          />
                        )}
                      </div>
                    </div>
                    <div className="px-2">
                      {c.id === '0'
                        ? Number(c.manualCost ?? 0).toLocaleString('en-BD')
                        : ((c.cost ?? 0) * (c.count ?? 1)).toLocaleString('en-BD')}
                    </div>
                  </div>
                  {c.id !== '0' && <SlideDropDown room={c.count ?? 1} isOpen={openDropdowns[c.id]} />}
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => setPopupOpen(true)}
            className="px-2 font-semibold text-sm hover:underline text-green-700"
          >
            change
          </button>

          {popupOpen && (
            <HotelPopUp
              initialSelected={selectedOption}
              travelers={travelers}
              hotelCategories={hotelCategories}
              onClose={(newSelection) => {
                setPopupOpen(false);
                if (!newSelection) return;
                setSelectedOption(newSelection);
                setCustomSelected(true);
              }}
            />
          )}

          <div className="w-full flex justify-between items-center mt-2">
            <div className="flex">
              <div className="pb-2 px-4 rounded">Food</div>
              <div className="pb-2 px-2 rounded">x {travelers}</div>
            </div>
            <div className="pb-2 px-4 rounded">{food.toLocaleString('en-BD')}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PerDayBox;
