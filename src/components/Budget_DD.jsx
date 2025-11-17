import React from 'react';
import { useState, useRef, useEffect } from 'react';

const Budget_DD = ({ defaultText = 'select' }) => {
  const [count, setCount] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const [selectedRange, setSelectedRange] = useState('Budget Range');

  const counterRef = useRef(null);
  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    function handleClickOutside(event) {
      if (counterRef.current && !counterRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={counterRef} className="relative flex-1">
      <button
        onClick={toggleDropdown}
        className="w-full h-12 text-sm bg-white border border-[#CCC3AF] rounded-lg px-2 text-gray-700 flex items-center justify-between shadow-sm hover:border-[#A88B68] transition"
      >
        <span>{selectedRange}</span>
        <svg
          className={`w-4 h-4 transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : 'rotate-0'
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

      {isOpen && (
        <div className="absolute w-auto min-w-[220px] mt-2 bg-white border border-[#CCC3AF] rounded-lg shadow-lg z-10 p-4 flex flex-col gap-3">
          <div className="flex justify-between items-center gap-2">
            <label>minimum: </label>
            <input
              type="number"
              placeholder="Min"
              value={minValue}
              onChange={(e) => setMinValue(e.target.value)}
              className="w-2/3 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#A88B68]"
            />
          </div>
          <div className="flex justify-between items-center gap-2">
            <label>maximum: </label>
            <input
              type="number"
              placeholder="Max"
              value={maxValue}
              onChange={(e) => setMaxValue(e.target.value)}
              className="w-2/3 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#A88B68]"
            />
          </div>

          <button
            onClick={() => {
              setSelectedRange(`${minValue} - ${maxValue}`);
              setIsOpen(false);
            }}
            className="px-4 py-1 bg-[#A88B68] text-white text-sm rounded hover:bg-[#87644f] transition"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
};

export default Budget_DD;
