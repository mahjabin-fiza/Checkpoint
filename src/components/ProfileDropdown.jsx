import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProfileDropdown = ({ text = 'Profile', className }) => {
  const [isOpen, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block w-full" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`bg-[#e9f5e9] flex justify-between items-center max-w-[120px] px-2 py-1 rounded text-[#4B3A2D] font-semibold transition duration-300 ease-in-out ${
          className || ''
        }`}
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-auto min-w-[115px] text-sm bg-gray-50 border border-[#CCC3AF] rounded-lg shadow-lg z-[9999] overflow-auto">
          {/* Profile */}
          <Link
            to="/user_profile"
            className="block w-full text-left px-3 py-2 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Profile
          </Link>

          {/* Saved Budget Plan */}
          <Link
            to="/user_profile"
            className="block w-full text-left px-3 py-2 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Saved Plan
          </Link>

          {/* Settings */}
          <Link
            to="/user_profile"
            className="block w-full text-left px-3 py-2 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Settings
          </Link>

          {/* SIGN OUT → goes to SignOut.jsx */}
          <Link
            to="/signout"
            className="block w-full text-left px-3 py-2 hover:bg-gray-100 text-red-700"
            onClick={() => setOpen(false)}
          >
            Sign Out
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
