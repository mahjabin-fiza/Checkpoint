// Duration.jsx
import React, { useEffect, useState } from 'react';

const Duration2 = ({ value = '', onChange }) => {
  const [endDate, setEndDate] = useState(value || '');

  // if parent updates the value (e.g. when page loads from URL), sync it
  useEffect(() => {
    setEndDate(value || '');
  }, [value]);

  // notify parent when user changes the date
  useEffect(() => {
    if (onChange) onChange(endDate);
  }, [endDate, onChange]);

  return (
    <div>
      <div className="max-w-[200px] flex text-sm bg-white border border-[#CCC3AF] rounded-r-xl text-gray-700 shadow-sm hover:border-[#A88B68] transition">
        <div className="flex flex-col gap-2 py-1 px-2 border-[#CCC3AF]">
          <div>
            <p className="text-xs text-[#9C9087]">End</p>
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

export default Duration2;
