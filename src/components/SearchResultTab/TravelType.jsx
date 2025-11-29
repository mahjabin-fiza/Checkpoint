import React from 'react';
import { useEffect, useState } from 'react';
import Button2 from '../Button2.jsx';

function TravelType({ onClose, travelers, from, to, initialOption }) {
  const options = [
    {
      id: 'bus',
      mode: 'Bus',
      link: 'shohoz.com',
      cost: 500,
    },
    {
      id: 'train',
      mode: 'Train',
      link: 'Bangladesh Railway',
      cost: 1000,
    },
    {
      id: 'air',
      mode: 'Air',
      link: 'Biman Bangladesh',
      cost: 3000,
    },
    {
      id: 'manual',
      mode: 'Others',
      link: '',
      cost: 0,
    },
  ];

  const [selectedOption, setSelectedOption] = useState(initialOption.id);
  const [manualCost, setManualCost] = useState('');

  const handleDone = () => {
    const selected = options.find((t) => t.id === selectedOption);
    if (!selected) return onClose(null);

    const result =
      selected.id === 'manual'
        ? { ...selected, cost: manualCost ? Number(manualCost) : null }
        : { ...selected, cost: selected.cost };

    onClose(result);
  };

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev || 'auto';
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="w-full bg-white p-4 flex flex-col justify-between rounded-lg shadow-lg w-[50%] max-w-[520px] max-h-[700px]">
          <h2 className="text-lg font-semibold mb-2 text-center">Travel Options</h2>

          <div className="h-full flex flex-col gap-2 p-5">
            <div className="flex flex-col gap-4">
              {options.map((opt) => (
                <div key={opt.id} className="flex">
                  <input
                    type="radio"
                    name="travelType"
                    value={opt.id}
                    checked={selectedOption === opt.id}
                    onChange={() => setSelectedOption(opt.id)}
                    className="mt-3 mx-2 w-3 h-3 appearance-none rounded-full border-2 border-[#4B3A2D] checked:bg-[#76916c] checked:border-transparent cursor-pointer"
                  />

                  <div
                    className={`w-full py-1 px-2 flex flex-col gap-1 items-start rounded border border-2 border-[#4B3A2D] transition duration-200
        ${selectedOption && selectedOption !== opt.id ? 'border-opacity-0' : 'border-opacity-100'}`}
                  >
                    <label className="font-bold">By {opt.mode}</label>

                    {opt.id !== 'manual' ? (
                      <>
                        <p>
                          {from} → {to}
                        </p>

                        <div className="w-full flex justify-between">
                          <div className="rounded p-1 flex bg-gray-200">
                            <p>Aprox. Cost: {opt.cost} Tk</p>
                            <p className="ml-5">
                              x {travelers} - {opt.cost * travelers} Tk
                            </p>
                          </div>
                          <button className="text-xs mt-2 text-[#76916c] underline hover:text-[#9BB98F]">
                            {opt.link}
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center gap-2">
                        <p>Add Cost manually:</p>
                        <input
                          type="number"
                          value={manualCost}
                          onChange={(e) => setManualCost(e.target.value)}
                          className="w-[80px] text-sm ml-2 px-2 bg-gray-200 rounded focus:outline-none"
                        />
                        <p className="ml-2">Tk</p>
                      </div>
                    )}
                  </div>
                </div>
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

export default TravelType;
