import React from 'react';
import { useEffect, useState } from 'react';
import Button2 from '../Button2.jsx';

function HotelPopUp({ onClose }) {
  const [options, setOptions] = useState([
    {
      id: '3',
      mode: '3 stars',
      cost: 3000,
      count: 0,
    },
    {
      id: '4',
      mode: '4 stars',
      cost: 7000,
      count: 0,
    },
    {
      id: '5',
      mode: '5 stars',
      cost: 9000,
      count: 0,
    },
  ]);
  const [selectedOption, setSelectedOption] = useState([]);

  const isSelected = (id) => selectedOption.some((s) => s.id === id);

  // toggle checkbox: add full object or remove by id
  const toggle = (opt) => {
    if (isSelected(opt.id)) {
      setSelectedOption((prev) => prev.filter((p) => p.id !== opt.id));
    } else {
      setSelectedOption((prev) => [...prev, { ...opt }]); // clone object
    }
  };

  const increment = (id) => {
    setOptions((prev) =>
      prev.map((opt) =>
        opt.id === id ? { ...opt, count: opt.count + 1 } : opt
      )
    );
  };

  const decrement = (id) => {
    setOptions((prev) =>
      prev.map((opt) =>
        opt.id === id ? { ...opt, count: Math.max(0, opt.count - 1) } : opt
      )
    );
  };

  const handleDone = () => {
    if (!selectedOption) return;

    const updatedSelected = selectedOption.map((sel) => {
      const fullOpt = options.find((o) => o.id === sel.id);
      return fullOpt ? { ...sel, count: fullOpt.count } : sel;
    });

    onClose(updatedSelected);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="w-full bg-white p-4 flex flex-col justify-between rounded-lg shadow-lg w-[50%] max-w-[450px] max-h-[700px]">
          <h2 className="text-lg font-semibold mb-2 text-center">
            Travel Options
          </h2>

          <div className="h-full flex flex-col gap-2 p-5">
            <div className="flex flex-col gap-4">
              {options.map((opt) => (
                <>
                  <div key={opt.id} className="flex">
                    <input
                      type="checkbox"
                      name="travelType"
                      value={opt.id}
                      checked={isSelected(opt.id)}
                      onChange={() => toggle(opt)}
                      className="mt-3 mx-2 w-3 h-3 appearance-none rounded-full border-2 border-[#4B3A2D]
             checked:bg-[#76916c] checked:border-transparent cursor-pointer"
                    />
                    <div
                      className={`w-full p-2 flex flex-col gap-2 rounded border border-2 border-[#4B3A2D] transition-border duration-200 ${selectedOption && selectedOption !== opt.id ? 'border-opacity-0' : 'border-opacity-100'}`}
                    >
                      <div className="flex justify-between">
                        <div>
                          <h1 className="font-bold">{opt.mode}</h1>
                        </div>

                        <div className="flex-1"></div>
                        <p>Room: </p>
                        <div className="ml-2 flex rounded bg-gray-200 gap-2">
                          <button
                            onClick={() => decrement(opt.id)}
                            className="px-2 hover:bg-gray-300 rounded-l"
                          >
                            -
                          </button>
                          <div className="">{opt.count}</div>
                          <button
                            onClick={() => increment(opt.id)}
                            className="px-2 hover:bg-gray-300 rounded-r"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <div className="flex">
                          <p className="bg-gray-100 p-1 rounded">
                            Aprox. Cost: {opt.cost} Tk
                          </p>
                          <p className="px-3 py-1">x {opt.count}</p>
                        </div>
                        <div>
                          <p className="">{opt.cost * opt.count} Tk</p>
                        </div>
                      </div>
                      <div className="w-full flex justify-center items-center"></div>
                      <div className="flex">
                        <p className="">Add Cost manually:</p>
                        <input
                          type="text"
                          className="w-[80px] text-sm ml-2 px-2 bg-gray-200 rounded focus:outline-none"
                        />
                        <p className="ml-2">Tk</p>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <div className="w-[100px] scale-90">
              <Button2 text="Done" onClick={handleDone} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HotelPopUp;
