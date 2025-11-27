import React from 'react';
import { useState, useEffect } from 'react';

const Duration = ({ onChange }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const totalDays =
    startDate && endDate
      ? Math.ceil(
          (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
        )
      : 0;

  useEffect(() => {
    if (totalDays > 0) {
      if (onChange) onChange(totalDays);
    }
  }, [totalDays, onChange]);

  return (
    <div>
      <div className="max-w-[200px] flex text-sm bg-white border border-[#CCC3AF] rounded-xl text-gray-700 shadow-sm hover:border-[#A88B68] transition">
        <div className="flex flex-col gap-2 py-1 px-2 border-r border-[#CCC3AF]">
          <div className="">
            <p className="text-xs text-[#9C9087]">Start</p>
          </div>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full rounded focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-2 py-1 px-2 border-[#CCC3AF]">
          <div className="flex justify-between">
            <p className="text-xs text-[#9C9087]">End</p>
            <p className="text-xs text-[#9C9087] scale-90 ml-4">
              ({totalDays} Days)
            </p>
          </div>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full rounded focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Duration;