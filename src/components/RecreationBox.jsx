import React from 'react';
import { useState, useRef, useEffect } from 'react';

function RecreationBox({ cost, onValueChange, onPlansChange }) {
  const [plan, setPlan] = useState('');
  const [budget, setBudget] = useState('');
  const [saved, setSaved] = useState([]);

  const numericBudget = Number(budget);

  const handleAdd = () => {
    if (!plan && !numericBudget) return;
    const newItem = { id: Date.now(), title: plan, budget: numericBudget }; // title instead of plan
    setSaved((prev) => [...prev, newItem]);
    setPlan('');
    setBudget('');
  };

  const handleRemove = (id) => {
    setSaved((prev) => prev.filter((item) => item.id !== id));
  };

  const totalBudget = saved.reduce((sum, item) => sum + item.budget, 0);
  const remaining = Number(cost) - totalBudget;

  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (onPlansChange) onPlansChange(saved);
  }, [saved, onPlansChange]);

  useEffect(() => {
    if (onValueChange) onValueChange(totalBudget);
  }, [totalBudget, onValueChange]);

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
      <div className="mt-5 flex items-center">
        <p className={`mr-1 font-bold ${remaining < 0 ? 'text-red-700' : 'text-green-700'}`}>
          {remaining.toLocaleString('en-BD')} Tk -{' '}
        </p>
        <p className="text-sm">budget left for others</p>
      </div>
      <div className="p-1 bg-white w-full rounded-lg justify-center shadow-lg">
        <div className="w-full flex justify-between items-center">
          <button
            onClick={() => setOpen((s) => !s)}
            aria-expanded={open}
            className="font-semibold flex items-center gap-2 py-1 px-2"
          >
            Add your plans for the trip
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
          className="pt-1 mb-2 mx-2 overflow-hidden transition-[height] duration-300 ease-in-out"
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
                      <button onClick={() => handleRemove(item.id)} className="text-xs px-1 py-1">
                        <div className="h-6 w-6 text-red-400 rounded border border-red-400 border-2 items-center hover:bg-red-400 hover:text-white">
                          -
                        </div>
                      </button>
                      <div className="flex justify-between bg-gray-200 p-2 rounded-lg w-full items-center">
                        <div><div>{item.title}</div></div>
                        <div>{item.budget.toLocaleString('en-BD')}</div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
        {saved.length !== 0 ? (
          <div className="flex justify-end">
            <p className="px-3">Total -</p>
            <div className="px-4">{totalBudget.toLocaleString('en-BD')}</div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default RecreationBox;
