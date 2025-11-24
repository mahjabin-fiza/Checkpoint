import React from 'react';
import { useState, useRef, useEffect } from 'react';

function RecreationBox() {
  const [plan, setPlan] = useState('');
  const [budget, setBudget] = useState('');
  const [saved, setSaved] = useState([]);

  const numericBudget = Number(budget);

  const handleAdd = () => {
    if (!plan && !budget) return;
    setSaved((prev) => [
      ...prev,
      { id: Date.now(), plan, budget: numericBudget },
    ]);
    setPlan('');
    setBudget('');
  };

  const handleRemove = (id) => {
    setSaved((prev) => prev.filter((item) => item.id !== id));
  };

  const totalBudget = saved.reduce((sum, item) => sum + item.budget, 0);

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
  }, [open, saved]);

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
      <p>Others</p>
      <div className="p-1 bg-white w-full rounded-lg justify-center shadow-lg">
        <div className="w-full flex justify-between items-center">
          <div className="flex">
            <div className="px-2 rounded text-xs py-2 font-semibold">
              Add your plans for the trip
            </div>
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
        </div>
        <div
          ref={contentRef}
          className="mb-2 mx-2 overflow-hidden transition-[height] duration-300 ease-in-out"
          style={{ height: '0px' }}
        >
          <div className="w-full rounded">
            <div className="flex flex-col gap-3">
              <div class="flex w-full gap-2 items-center">
                <div className="">Plan: </div>
                <input
                  type="text"
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  className="w-[25%] py-1 px-2 bg-gray-200 rounded focus:outline-none"
                />
                <div className="">Budget: </div>
                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-[12%] py-1 px-2 bg-gray-200 rounded focus:outline-none"
                />
                <button
                  onClick={handleAdd}
                  className="px-4 py-1 rounded text-sm text-green-400 rounded border border-green-400 border-2 items-center hover:bg-green-400 hover:text-white transition duration-300 ease-in-out"
                >
                  Add
                </button>
              </div>

              {saved.length === 0
                ? null
                : saved.map((item) => (
                    <div key={item.id} className="flex">
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-xs px-1 py-1"
                      >
                        <div className="h-6 w-6 text-red-400 rounded border border-red-400 border-2 items-center hover:bg-red-400 hover:text-white">
                          -
                        </div>
                      </button>
                      <div className="flex justify-between bg-gray-200 p-2 rounded-lg w-full items-center">
                        <div>{item.plan}</div>
                        <div>{item.budget}</div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
        {saved.length !== 0 ? (
          <p className="flex justify-end">
            <p className="px-3">Total -</p>
            <div className="px-4">{totalBudget}</div>
          </p>
        ) : null}
      </div>
    </>
  );
}

export default RecreationBox;
