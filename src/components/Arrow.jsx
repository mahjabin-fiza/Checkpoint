import React from 'react';

function Arrow({ isOpen, onClick }) {
  const handleClick = (e) => {
    if (onClick) onClick(e);
  };
  return (
    <button aria-expanded={isOpen} onClick={handleClick}>
      <svg
        className={`ml-2 w-3 h-3 text-[#4B3A2D] transform transition-transform duration-300 ${
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
  );
}

export default Arrow;
