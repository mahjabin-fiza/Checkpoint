import React from 'react'
import { useState, useRef, useEffect } from 'react'

const Counter = ({defaultText="select"}) => {
    const [count, setCount] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCount, setSelectedCount] = useState(count);

    const increment = () => setCount(count+1);
    const decrement = () => setCount(count > 1 ? count - 1 : 1);
    
    const counterRef = useRef(null);
    const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    function handleClickOutside(event) {
        if(counterRef.current && !counterRef.current.contains(event.target)){
            setIsOpen(false);
        }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={counterRef} className="relative flex-1">
      <button
        onClick={toggleDropdown}
        className="w-full h-12 text-sm bg-white border border-[#CCC3AF] rounded-lg px-2 text-gray-700 flex items-center justify-between shadow-sm hover:border-[#A88B68] transition">
            <span>{defaultText} - {selectedCount}</span>
            <svg
            className={`w-4 h-4 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>


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
    );
};

export default Counter
