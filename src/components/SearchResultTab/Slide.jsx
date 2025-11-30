import React, { useState, useEffect, useRef } from 'react';
import SlideDropDown from '../SlideDropDown';
import Arrow from '../Arrow';

function Slide() {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const el = dropdownRef.current;
    if (!el) return;

    const updateHeight = () => {
      if (open) {
        el.style.maxHeight = el.scrollHeight + 'px';
      } else {
        el.style.maxHeight = '0px';
      }
    };

    updateHeight();

    // Watch for content changes
    const observer = new ResizeObserver(() => {
      if (open) {
        el.style.maxHeight = el.scrollHeight + 'px';
      }
    });

    observer.observe(el);

    return () => observer.disconnect();
  }, [open]);
  return (
    <>
      <div className="w-full bg-gray-300 flex justify-between items-center">
        <div className="flex">
          <div className="px-1 text-sm flex items-center">
            <Arrow onClick={() => setOpen(!open)} isOpen={open} />
          </div>
        </div>
      </div>

      <div
        ref={dropdownRef}
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
        style={{ maxHeight: '0px' }}
      >
        <div className="p-3 flex flex-col text-sm gap-2">
          <div>Rooms: (maximum 2 people per room)</div>
          <div>Available Hotel within this range:</div>
        </div>
      </div>
    </>
  );
}

export default Slide;
