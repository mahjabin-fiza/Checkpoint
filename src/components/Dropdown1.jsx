import React from 'react'
import { useState, useRef, useEffect } from 'react'

const Dropdown1 = ({options, defaultText}) => {
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
        if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
            setIsOpen(false);
        }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative flex-1">
      <button
        onClick={toggleDropdown}
        className="w-full h-12 text-sm bg-white border border-[#CCC3AF] rounded-lg px-2 text-gray-700 flex items-center justify-between shadow-sm hover:border-[#A88B68] transition">
        <span>{selected}</span>
        <svg
          className={`w-4 h-4 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen ? (
        <div className="absolute w-full mt-2 bg-white border border-[#CCC3AF] rounded-lg shadow-lg z-10">
          {[defaultText, ...options].map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 hover:bg-[#F5F3EE] cursor-pointer text-gray-700 transition">
              {option}
            </div>
            ))}
        </div>
        ) : null}
    </div>
    );
};

export default Dropdown1
