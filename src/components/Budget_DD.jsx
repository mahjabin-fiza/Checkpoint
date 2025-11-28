import React from 'react';
import { useState, useEffect } from 'react';

const Budget_DD = ({ title = 'select', initialValue = '', onChange }) => {
  const [bValue, setBValue] = useState(initialValue);

  useEffect(() => {
    if (onChange) onChange(bValue);
  }, [bValue, onChange]);

  return (
    <>
      <div className="max-w-[100px] flex items-center px-2 py-1 text-sm bg-white border border-[#CCC3AF] rounded-xl text-gray-700 shadow-sm hover:border-[#A88B68] transition">
        <div className="flex-1">
          <p className="text-xs text-[#9C9087]">{title}</p>
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Enter"
              value={bValue}
              onChange={(e) => setBValue(e.target.value)}
              className="w-full rounded px-2 py-1 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Budget_DD;