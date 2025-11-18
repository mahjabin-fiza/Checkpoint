import React from 'react';
import { useState, useRef, useEffect } from 'react';

const PerDayBox = ({ day, travelers }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    if (open) {
      el.style.height = el.scrollHeight + 'px';
    } else {
      el.style.height = '0px';
    }
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      const element = contentRef.current;
      if (open && element) element.style.height = element.scrollHeight + 'px';
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [open]);
  return (
    <>
      <p className="pt-2 pb-1">Day - {day}</p>
      <div className="p-3 bg-white w-full rounded-lg justify-center shadow-lg">
        <div className="flex flex-col bg-gray-200 rounded">
          <div className="w-full flex justify-between items-center">
            <div className="flex">
              <div className="px-2 rounded">Hotel</div>
              <div className="px-2 text-sm flex items-center">
                <button onClick={() => setOpen((s) => !s)} aria-expanded={open}>
                  <svg
                    className={`w-3 h-3 text-[#4B3A2D] transform transition-transform duration-300 ${
                      open ? 'rotate-180' : 'rotate-0'
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
              </div>
            </div>
            <div className="p-2 rounded">cost</div>
          </div>
          <div
            ref={contentRef}
            className="mb-2 mx-2 overflow-hidden transition-[height] duration-300 ease-in-out"
            style={{ height: '0px' }}
          >
            <div className="w-full rounded">
              <p className="p-2">expanded travel option</p>
              <div className="p-4">more</div>
            </div>
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="flex">
              <div className="pb-2 px-2 rounded">Food</div>
              <div className="pb-2 px-2 rounded">x {travelers}</div>
            </div>
            <div className="pb-2 px-2 rounded">cost</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PerDayBox;
