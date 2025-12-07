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
    <div className="flex text-sm bg-white border border-gray-300 rounded-xl">
      <div className="rounded-l-lg py-2 px-1 pl-1">
        <div className="flex flex-col gap-2">
          <div>
            <p className="text-xs text-[#9C9087] font-bold">{title}</p>
          </div>
          <div className="text-[#4B3A2D] text-center text-base p-2 text-[#4B3A2D] font-bold">
            {count}
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex flex-col">
          <div>
            <button onClick={increment} className='w-full hover:bg-[#CCC3AF] p-1.5 hover:text-white bg-gray-200 rounded-tr-xl text-lg transition duration-200 ease-in-out'>
              +
            </button>
          </div>
          <div>
            <button onClick={decrement} className="w-full hover:bg-[#CCC3AF] p-1.5 hover:text-white bg-gray-200 rounded-br-xl text-lg transition duration-200 ease-in-out">
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;
