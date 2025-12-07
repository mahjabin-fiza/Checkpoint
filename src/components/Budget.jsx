import React from 'react';
import { useState, useEffect } from 'react';

const Budget_DD = ({ title = 'select', initialValue = '', onChange }) => {
  const [bValue, setBValue] = useState(initialValue);

  useEffect(() => {
    if (onChange) onChange(bValue);
  }, [bValue, onChange]);

  return (
    <>
      <div className="bg-white max-w-[120px] flex-col py-2 px-3 items-center text-sm border border-[#CCC3AF] rounded-xl text-gray-700 shadow-sm hover:border-[#A88B68] transition">
        <div>
          <p className="text-xs text-[#9C9087] font-bold mb-2">{title}</p>
        </div>
        <div className="">
          <input
            type="text"
            placeholder="Enter"
            value={bValue}
            onChange={(e) => setBValue(e.target.value)}
            className="w-full rounded-lg p-2 border border-gray-200 font-bold text-base focus:outline-none"
          />
        </div>
      </div>
    </>
  );
};

export default Budget_DD;
