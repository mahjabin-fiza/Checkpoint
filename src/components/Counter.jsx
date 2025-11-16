import React from 'react';
import { useState, useRef, useEffect } from 'react';

const Counter = ({ tittle = 'tittle' }) => {
  const [count, setCount] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCount, setSelectedCount] = useState(count);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count > 1 ? count - 1 : 1);

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
    <div>
      <div className="flex items-center w-full px-2 py-2 text-sm bg-white border border-[#CCC3AF] rounded-xl text-gray-700 shadow-sm hover:border-[#A88B68] transition">
        <div className="flex-1">
          <p className="text-xs text-[#9C9087]">{tittle}</p>
          <div className="w-full inline-block text-[#4B3A2D] mt-1 rounded-lg text-black">
            {selectedCount}
          </div>
        </div>

        <div
          ref={counterRef}
          onClick={toggleDropdown}
          className="ml-4 flex-shrink-0"
        >
          <div className="inline-flex items-center justify-center h-10 w-10">
            <button type="button" className="p-3">
              <svg
                className={`w-4 h-4 text-[#4B3A2D] transform transition-transform duration-300 ${
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
          </div>
        </div>

        {isOpen && (
          <div className="absolute w-full mt-2 bg-white border border-[#CCC3AF] rounded-lg shadow-lg z-10 p-3 flex flex-col">
            <div className="flex items-center justify-between w-full mb-2">
              <button
                onClick={decrement}
                className="px-3 py-1 text-lg hover:bg-gray-200 rounded"
              >
                -
              </button>

              <div className="px-4">{count}</div>

              <button
                onClick={increment}
                className="px-3 py-1 text-lg hover:bg-gray-200 rounded"
              >
                +
              </button>
            </div>

            <button
              onClick={() => {
                setSelectedCount(count);
                setIsOpen(false);
              }}
              className="px-4 py-1 bg-[#A88B68] text-white text-sm rounded hover:bg-[#87644f] transition"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Counter;
