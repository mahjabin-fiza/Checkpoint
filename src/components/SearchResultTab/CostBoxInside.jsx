import React from 'react';
import { useState, useRef, useEffect } from 'react';
import TravelType from './TravelType';

function CostBoxInside({ travelers, from, to, Total, onTravelChange }) {
  const [open, setOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  const options = [
    {
      id: 'bus',
      mode: 'Bus',
      link: 'shohoz.com',
      cost: 500,
    },
    {
      id: 'train',
      mode: 'Train',
      link: 'Bangladesh Railway',
      cost: 1000,
    },
    {
      id: 'air',
      mode: 'Air',
      link: 'Biman Bangladesh',
      cost: 3000,
    },
    {
      id: 'manual',
      mode: 'Others',
      link: '',
      cost: 0,
    },
  ];

  const initialOption = () => {
    if (
      Total > options.find((o) => o.id === 'bus').cost &&
      Total < options.find((o) => o.id === 'air').cost
    )
      return options.find((o) => o.id === 'train');
    if (Total <= options.find((o) => o.id === 'bus').cost)
      return options.find((o) => o.id === 'bus');
    if (Total >= options.find((o) => o.id === 'air').cost)
      return options.find((o) => o.id === 'air');
    return options.find((o) => o.id === 'bus');
  };

  const [selectedTravel, setSelectedTravel] = useState(initialOption());

  useEffect(() => {
    setSelectedTravel(initialOption());
  }, [Total]);

  const contentRef = useRef(null);

  const travel = Number(selectedTravel.cost) * travelers;

  useEffect(() => {
    if (onTravelChange) onTravelChange(travel);
  }, [travel, onTravelChange]);

  useEffect(() => {
    const element = contentRef.current;
    if (!element) return;
    if (open) {
      element.style.height = element.scrollHeight + 'px';
    } else {
      element.style.height = '0px';
    }
  }, [open]);

  return (
    <>
      <div className="flex flex-col bg-gray-200 rounded">
        <div className="px-2 pt-2 flex items-center">
          <div className="flex bg-gray-50 px-2 rounded">
            <p>Mode: </p>
            <p className="font-bold ml-2">{selectedTravel.mode}</p>

            <button
              onClick={() => setOpen((s) => !s)}
              aria-expanded={open}
              className="ml-1"
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

          <button
            onClick={() => setPopupOpen(true)}
            className="ml-1 px-2 font-semibold text-sm hover:underline text-green-700 rounded"
          >
            change
          </button>

          {popupOpen && (
            <TravelType
              travelers={travelers}
              from={from}
              to={to}
              Total={Total}
              initialOption={selectedTravel}
              onClose={(value) => {
                setPopupOpen(false);
                if (value) setSelectedTravel(value);
              }}
            />
          )}
        </div>

        <div
          ref={contentRef}
          className="mx-2 overflow-hidden transition-[height] duration-300 ease-in-out"
          style={{ height: '0px' }}
        >
          <div className="w-full rounded">
            <p className="p-2">Details will be shown here</p>
          </div>
        </div>

        <div className="w-full flex justify-between items-center p-2">
          <div className="flex">
            <div className="ml-1">Cost: </div>
            <div className="ml-3">
              {selectedTravel.cost} x {travelers}
            </div>
          </div>
          <div className="px-2">{travel.toLocaleString('en-BD')}</div>
        </div>
      </div>
    </>
  );
}

export default CostBoxInside;