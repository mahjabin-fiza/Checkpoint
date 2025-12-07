import React from 'react';
import { useState, useEffect } from 'react';

const Budget = ({ title = 'select', initialValue = '', onChange }) => {
  const [bValue, setBValue] = useState(initialValue);
  const [rawValue, setRawValue] = useState(initialValue);

  const formatBD = (value) => {
    const num = value.replace(/\D/g, '');

    if (!num) return '';

    const last3 = num.slice(-3);
    const rest = num.slice(0, -3);

    if (!rest) return last3;

    return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last3;
  };

  useEffect(() => {
    if (onChange) onChange(rawValue);
  }, [rawValue, onChange]);

  const handleChange = (e) => {
    const input = e.target.value;
    const digitsOnly = input.replace(/\D/g, '');

    setRawValue(digitsOnly);
    setBValue(formatBD(digitsOnly));
  };

  
  return (
    <>
      <div className="bg-white max-w-[110px] flex-col py-2 px-3 items-center text-sm border border-[#CCC3AF] rounded-xl text-gray-700 shadow-sm hover:border-[#A88B68] transition">
        <div>
          <p className="text-sm text-[#9C9087] font-bold mb-2">{title}</p>
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="Enter"
            value={bValue}
            onChange={handleChange}
            className="w-full p-1 font-bold text-base focus:outline-none"
          />
        </div>
      </div>
    </>
  );
};

export default Budget;
