import React from 'react';
import { useState, useRef, useEffect } from 'react';
import districtsName from '.././data/districtsName';
import SearchResult from '../pages/SearchResult';

const Card = ({
  title = 'title',
  defaultText,
  onChange,
  initialValue = '',
  className,
}) => {
  const [query, setQuery] = useState(initialValue);
  const [isOpen, setOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (onChange) onChange(query);
  }, [query, onChange]);

  const filtered = showAll
    ? districtsName
    : districtsName.filter((d) =>
        d.toLowerCase().includes(query.toLowerCase())
      );

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
      <div>
        <div
          ref={dropdownRef}
          className={`max-w-[130px] flex items-center px-2 py-2 text-sm bg-white border border-[#CCC3AF] rounded-xl text-gray-700 shadow-sm hover:border-[#A88B68] transition ${className || ''}`}
        >
          <div className="flex-1">
            <p className="text-xs text-[#9C9087]">{title}</p>

            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
                setShowAll(false);
              }}
              onFocus={() => setOpen(true)}
              onClick={() => setShowAll(true)}
              placeholder={defaultText}
              className="w-full inline-block text-[#4B3A2D] mt-1 text-black focus:outline-none"
            />
          </div>

          <div
            ref={dropdownRef}
            onClick={toggleDropdown}
            className="flex-shrink-0"
          ></div>
        </div>

        {isOpen ? (
          <div className="absolute w-auto min-w-[200px] max-h-60 overflow-y-auto mt-2 bg-gray-50 border border-[#CCC3AF] rounded-lg shadow-lg z-10">
            {filtered.length === 0 ? (
              <div className="p-2 text-gray-500 bg-gray-50">
                No results found
              </div>
            ) : (
              filtered.map((districtsName) => (
                <div
                  key={districtsName}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onMouseDown={() => {
                    setQuery(districtsName);
                    setOpen(false);
                    setShowAll(false);
                  }}
                >
                  {districtsName}
                </div>
              ))
            )}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Card;
