import React from 'react';
import { useState, useEffect } from 'react';

const Counter = ({ title = 'title', value = 1, onChange }) => {
  const [count, setCount] = useState(value);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count > 1 ? count - 1 : 1);

  useEffect(() => {
    if (onChange) onChange(count);
  }, [count, onChange]);

  return (
    <div>
      <div className="flex justify-between items-center px-2 py-2 text-sm bg-white border border-[#CCC3AF] rounded-xl text-gray-700 shadow-sm hover:border-[#A88B68] transition">
        <div className="flex flex-col">
          <p className="text-xs text-[#9C9087]">{title}</p>
          <div className="w-full inline-block text-[#4B3A2D] mt-1 rounded-lg text-black">
            {count}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center h-10 w-4">
          <button onClick={increment} className="text-lg rounded">
            +
          </button>
          <button onClick={decrement} className="text-lg rounded">
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;