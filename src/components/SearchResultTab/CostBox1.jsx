import React from 'react';
import TravelType from './TravelType';
import CostBoxInside from './CostBoxInside';
import { useState, useEffect } from 'react';

const CostBox1 = ({ travelers, from, to, Total, duration, onValueChange }) => {
  const [travel1, setTravel1] = useState(0);
  const [travel2, setTravel2] = useState(0);

  const total = travel1 + travel2;

  useEffect(() => {
    if (onValueChange) onValueChange(total);
  }, [total, onValueChange]);

  return (
    <>
      <p className="">Travel Cost:</p>
      <div className="p-3 bg-white w-full rounded-lg shadow-lg">
        <div className="w-full flex flex-col">
          <div className="flex">
            <p>{from} →</p>
            <p className="pb-1 px-1 font-semibold">{to}:</p>
          </div>
          <CostBoxInside
            to={to}
            from={from}
            travelers={travelers}
            duration={duration}
            Total={Total / (travelers * 2)}
            onTravelChange={setTravel1}
          />

          <div className="flex pt-2">
            <p>{to} →</p>
            <p className="pb-1 px-1 font-semibold">{from}:</p>
          </div>
          <CostBoxInside
            to={to}
            from={from}
            travelers={travelers}
            duration={duration}
            Total={Total / (travelers * 2)}
            onTravelChange={setTravel2}
          />
        </div>
        <div class="w-full flex px-2 pt-2">
          <p class="ml-auto">{total.toLocaleString('en-BD')}</p>
        </div>
      </div>
    </>
  );
};

export default CostBox1;