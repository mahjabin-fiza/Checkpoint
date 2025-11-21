import React from 'react';
import { useState, useRef, useEffect } from 'react';

const CostBox1 = ({ travelers, from, to, Total, duration }) => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const contentRef = useRef(null);
  const content1Ref = useRef(null);

  const travel = Total * 0.15 * duration;

  useEffect(() => {
    const element = contentRef.current;
    if (!element) return;
    if (open) {
      element.style.height = element.scrollHeight + 'px';
    } else {
      element.style.height = '0px';
    }
  }, [open]);

  useEffect(() => {
    const element1 = content1Ref.current;
    if (!element1) return;
    if (open1) {
      element1.style.height = element1.scrollHeight + 'px';
    } else {
      element1.style.height = '0px';
    }
  }, [open1]);

  useEffect(() => {
    const onResize = () => {
      const element1 = content1Ref.current;
      if (open1 && element1)
        element1.style.height = element1.scrollHeight + 'px';
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [open1]);

  return (
    <>
      <p className="">Teavel Cost:</p>
      <div className="p-3 bg-white w-full rounded-lg justify-center shadow-lg">
        <div className="w-full flex flex-col">
          <div className="flex">
            <p>To</p>
            <p className="pb-1 px-1 font-semibold">{to}:</p>
          </div>
          <div className="flex flex-col bg-gray-200 rounded">
            <div className="w-full flex justify-between items-center">
              <div className="flex">
                <div className="p-2 rounded">Per person</div>
                <div className="p-2 rounded">x {travelers}</div>
              </div>
              <div className="p-2 rounded">
                {travel.toLocaleString('en-BD')}
              </div>
            </div>
            <div>
              <div className="px-2 text-sm flex items-center">
                <p className="px-2">by *Train</p>
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
              <div
                ref={contentRef}
                className="m-2 overflow-hidden transition-[height] duration-300 ease-in-out"
                style={{ height: '0px' }}
              >
                <div className="w-full rounded">
                  <p className="p-2">expanded travel option</p>
                  <div className="p-4">more</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex pt-2">
            <p>To</p>
            <p className="pb-1 px-1 font-semibold">{from}:</p>
          </div>
          <div className="flex flex-col bg-gray-200 rounded">
            <div className="w-full flex justify-between items-center">
              <div className="flex">
                <div className="p-2 rounded">Per person</div>
                <div className="p-2 rounded">x {travelers}</div>
              </div>
              <div className="p-2 rounded">
                {travel.toLocaleString('en-BD')}
              </div>
            </div>
            <div>
              <div className="px-2 text-sm flex items-center">
                <p className="px-2">by *Train</p>
                <button
                  onClick={() => setOpen1((s) => !s)}
                  aria-expanded={open1}
                >
                  <svg
                    className={`w-3 h-3 text-[#4B3A2D] transform transition-transform duration-300 ${
                      open1 ? 'rotate-180' : 'rotate-0'
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
              <div
                ref={content1Ref}
                className="m-2 overflow-hidden transition-[height] duration-300 ease-in-out"
                style={{ height: '0px' }}
              >
                <div className="w-full rounded">
                  <p className="p-2">expanded travel option</p>
                  <div className="ml-auto">more</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full flex px-2 pt-2">
          <p class="ml-auto">total</p>
        </div>
      </div>
    </>
  );
};

export default CostBox1;
