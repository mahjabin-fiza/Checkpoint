import React from 'react';
import { useNavigate } from 'react-router-dom';

//brown border, white bg -hover: green bg, no border

const Button1 = ({ text = 'Button', onClick, to, className }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (to) navigate(to);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full px-5 py-1.5 rounded text-[#4B3A2D] bg-white font-semibold border border-[#4B3A2D] border-2 shadow-md scale-100 hover:text-[#FFFFFF] hover:bg-[#9BB98F] hover:scale-105 hover:border-transparent transition duration-300 ease-in-out ${className || ''}`}
    >
      {text}
    </button>
  );
};

export default Button1;