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
    <div className="flex text-sm h-[79px] bg-white border border-[#CCC3AF] rounded-xl">
      <div className="rounded-l-lg py-3">
        <div className="flex flex-col gap-2">
          <div>
            <p className="text-sm text-[#9C9087] font-bold px-2">{title}</p>
          </div>
          <div className="text-[#4B3A2D] text-center text-base text-[#4B3A2D] font-bold">
            {count}
          </div>
        </div>
      </div>
        <div className="flex flex-col h-full w-full items-end justify-between bg-[#CCC3AF] rounded-xl">
          <div>
            <button onClick={increment} className='hover:bg-[#CCC3AF] px-1 h-[38.5px] hover:text-white bg-gray-100 rounded-tr-xl text-lg transition duration-200 ease-in-out'>
              +
            </button>
          </div>
          <div>
            <button onClick={decrement} className="hover:bg-[#CCC3AF] w-[18.5px] h-[38.5px] hover:text-white bg-gray-100 rounded-br-xl text-lg transition duration-200 ease-in-out">
              -
            </button>
          </div>
      </div>
    </div>
  );
};

export default Counter;
