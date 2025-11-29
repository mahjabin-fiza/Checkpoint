import React from 'react';
import { useState, useRef, useEffect } from 'react';

const Dropdown1 = ({ options, title = 'tittle', defaultText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultText);

  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
          <p className="text-xs text-[#9C9087]">{title}</p>

          <div className="w-full inline-block text-[#4B3A2D] mt-1 rounded-lg text-black">
            {selected}
          </div>
        </div>

        <div ref={dropdownRef} onClick={toggleDropdown} className="flex-shrink-0">
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
      </div>

      {isOpen ? (
        <div className="absolute w-full mt-2 bg-white border border-[#CCC3AF] rounded-lg shadow-lg z-10">
          {[defaultText, ...options].map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 hover:bg-[#F5F3EE] cursor-pointer text-gray-700 transition"
            >
              {option}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Dropdown1;
