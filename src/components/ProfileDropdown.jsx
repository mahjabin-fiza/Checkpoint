import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProfileDropdown = ({ text = 'profile', className }) => {
  const [isOpen, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  const toggleDropdown = () => setOpen(!isOpen);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <>
      <div className="relative inline-block w-full">
        <button
          ref={dropdownRef}
          onClick={toggleDropdown}
          className={`bg-white flex justify-between items-center max-w-[120px] px-2 py-1 rounded text-[#4B3A2D] bg-white font-semibold border border-[#4B3A2D] border-2 shadow-md scale-100 hover:text-[#4B3A2D] hover:bg-white transition duration-300 ease-in-out ${className || ''}`}
        >
          <div className="text-center flex-1 px-2 py-1">{text}</div>
          <svg
            className={`w-3 h-3 text-[#4B3A2D] transform transition-transform duration-300 ${
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
          <div className="absolute right-0 top-full mt-2 w-auto min-w-[150px] text-sm bg-gray-50 border border-[#CCC3AF] rounded-lg shadow-lg z-[9999] overflow-auto">
            {/* Example dropdown items */}
            <Link
              to="/user_profile"
              className="block w-full text-left px-3 py-2 hover:bg-gray-200"
            >
              profile
            </Link>
            <Link
              to="/user_profile"
              className="block w-full text-left px-3 py-2 hover:bg-gray-200"
            >
              Saved Budget Plan
            </Link>
            <Link
              to="/user_profile"
              className="block w-full text-left px-3 py-2 hover:bg-gray-200"
            >
              Wishlist
            </Link>
            <button className="w-full text-left px-3 py-2 hover:bg-gray-200">
              settings
            </button>
            <button className="w-full text-left px-3 py-2 hover:bg-gray-200">
              sign out
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileDropdown;