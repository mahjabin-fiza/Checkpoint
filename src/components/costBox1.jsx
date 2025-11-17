import React from 'react';
import { useState, useRef, useEffect } from 'react';

const CostBox1 = () => {
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
    <div className="p-3 bg-white w-full rounded-lg justify-center">
      <div className="w-full flex flex-col">
        <p className="pb-1">To destination:</p>
        <div className="flex flex-col bg-gray-200 rounded">
          <div className="w-full flex justify-between items-center">
            <div className="flex">
              <div className="p-2 rounded">Per person</div>
              <div className="p-2 rounded">x num of people</div>
            </div>
            <div className="p-2 rounded">cost</div>
          </div>
          <div>
            <div className="px-2 text-sm flex items-center">
              <p className="px-2">by *Train</p>
              <button onClick={() => setOpen((s) => !s)} aria-expanded={open}>
                {open ? 'Collapse' : 'Expand'}
              </button>
            </div>
            <div
              ref={contentRef}
              className="m-2 overflow-hidden transition-[height] duration-300 ease-in-out"
              style={{ height: '0px' }}
            >
              <div className="w-full rounded bg-blue-200">
                <p className="p-2">expanded travel option</p>
                <div className="p-4">more</div>
              </div>
            </div>
          </div>
        </div>

        <p className="pt-2 pb-1">go back:</p>
        <div className="flex flex-col bg-gray-200 rounded">
          <div className="w-full flex justify-between items-center">
            <div className="flex">
              <div className="p-2 rounded">Per person</div>
              <div className="p-2 rounded">x num of people</div>
            </div>
            <div className="p-2 rounded">cost</div>
          </div>
          <div>
            <div className="px-2 text-sm flex items-center">
              <p className="px-2">by *Train</p>
              <button onClick={() => setOpen((s) => !s)} aria-expanded={open}>
                {open ? 'Collapse' : 'Expand'}
              </button>
            </div>
            <div
              ref={contentRef}
              className="m-2 overflow-hidden transition-[height] duration-300 ease-in-out"
              style={{ height: '0px' }}
            >
              <div className="w-full rounded bg-blue-200">
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
  );
};

export default CostBox1;
