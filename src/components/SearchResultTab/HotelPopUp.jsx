import React, { useEffect, useState } from 'react';
import Button2 from '../Button2.jsx';

function HotelPopUp({ onClose, initialSelected = [], travelers, hotelCategories }) {
  const [options, setOptions] = useState([
    { id: '3', mode: 'Low Range', cost: 2000, lowest: 0, highest: 2000, count: 1 },
    { id: '4', mode: 'Medium Range', cost: 5000, lowest: 5000, highest: 10000, count: 1 },
    { id: '5', mode: 'High Range', cost: 10000, lowest: 10000, highest: 30000, count: 1 },
    { id: '0', mode: 'Manually Added', cost: 0, count: 0, manualCost: 0 },
  ]);

  const [selectedOption, setSelectedOption] = useState([]);
  const [isManualSelected, setIsManualSelected] = useState(false);

  // Initialize from initialSelected once
  useEffect(() => {
    if (!initialSelected || selectedOption.length > 0) return;

    const preset = Array.isArray(initialSelected) ? initialSelected : [initialSelected];

    const normalizedPreset = preset.map((p) => ({
      id: p.id,
      mode: p.mode,
      count: p.count ?? (p.id === '0' ? 0 : Math.ceil(travelers / 2)),
      cost: p.cost ?? 0,
      manualCost: p.manualCost ?? (p.id === '0' ? p.cost ?? 0 : undefined),
    }));

    setOptions((prev) =>
      prev.map((opt) => {
        const match = normalizedPreset.find((p) => p.id === opt.id);
        return match ? { ...opt, ...match } : opt;
      })
    );

    setSelectedOption(normalizedPreset);
    setIsManualSelected(normalizedPreset.some((p) => p.id === '0'));
  }, []);

  const isSelected = (id) => selectedOption.some((s) => s.id === id);

  const toggle = (opt) => {
    if (opt.id === '0') {
      setIsManualSelected(!isManualSelected);
      if (!isManualSelected) setSelectedOption([{ ...opt, manualCost: opt.manualCost ?? 0 }]);
      else setSelectedOption([]);
    } else {
      if (isManualSelected) return;

      if (isSelected(opt.id)) {
        setSelectedOption((prev) => prev.filter((p) => p.id !== opt.id));
      } else {
        let avgCost = opt.cost;
        if (hotelCategories) {
          if (opt.mode === 'Low Range') avgCost = hotelCategories?.low?.avg || 2000;
          else if (opt.mode === 'Medium Range') avgCost = hotelCategories?.medium?.avg || 5000;
          else if (opt.mode === 'High Range') avgCost = hotelCategories?.high?.avg || 10000;

        }
        setSelectedOption((prev) => [...prev, { ...opt, count: opt.count, cost: avgCost }]);
      }
    }
  };

  const increment = (id) => {
    setOptions((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, count: opt.count + 1 } : opt))
    );
    setSelectedOption((prev) =>
      prev.map((sel) => (sel.id === id ? { ...sel, count: sel.count + 1 } : sel))
    );
  };

  const decrement = (id) => {
    setOptions((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, count: Math.max(1, opt.count - 1) } : opt))
    );
    setSelectedOption((prev) =>
      prev.map((sel) => (sel.id === id ? { ...sel, count: Math.max(1, sel.count - 1) } : sel))
    );
  };


  useEffect(() => {
    setSelectedOption((prevSelected) =>
      prevSelected.map((sel) => {
        const match = options.find((o) => o.id === sel.id);
        if (!match) return sel;

        let avgCost = match.cost ?? 0;
        if (hotelCategories) {
  if (sel.mode === 'Low Range') avgCost = hotelCategories.low?.avg || 2000;
  else if (sel.mode === 'Medium Range') avgCost = hotelCategories.medium?.avg || 5000;
  else if (sel.mode === 'High Range') avgCost = hotelCategories.high?.avg || 10000;
}

        return {
          ...sel,
          count: match.count,
          cost: sel.id === '0' ? sel.manualCost ?? 0 : avgCost,
          manualCost: sel.manualCost,
        };
      })
    );
  }, [options, hotelCategories]);

  const handleDone = () => {
    const finalSelected = selectedOption.map((s) => ({
      id: s.id,
      mode: s.mode,
      count: s.count,
      cost: s.id === '0' ? Number(s.manualCost ?? 0) : s.cost,
      manualCost: s.manualCost,
    }));
    onClose(finalSelected);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="w-full h-full bg-white p-5 flex flex-col justify-between rounded-lg shadow-lg w-[50%] max-w-[600px] max-h-[650px]">
        <h2 className="text-lg font-semibold text-center">Hotel Options</h2>
        {options.map((opt) => {
          let avgCost = opt.cost;
          let lowest = opt.lowest;
          let highest = opt.highest;
          let hotelsInCategory = [];

          if (hotelCategories) {
            if (opt.mode === 'Low Range') {
              hotelsInCategory = hotelCategories.low?.hotels || [];
              avgCost = hotelCategories.low?.avg || 2000;
              lowest = hotelCategories.low?.range?.[0] || 0;
              highest = hotelCategories.low?.range?.[1] || 2000;
            } else if (opt.mode === 'Medium Range') {
              hotelsInCategory = hotelCategories.medium?.hotels || [];
              avgCost = hotelCategories.medium?.avg || 5000;
              lowest = hotelCategories.medium?.range?.[0] || 5000;
              highest = hotelCategories.medium?.range?.[1] || 10000;
            } else if (opt.mode === 'High Range') {
              hotelsInCategory = hotelCategories.high?.hotels || [];
              avgCost = hotelCategories.high?.avg || 10000;
              lowest = hotelCategories.high?.range?.[0] || 10000;
              highest = hotelCategories.high?.range?.[1] || 30000;
            }
          }

          return (
            <div key={opt.id} className="">
              <div className="w-full h-full flex flex-col gap-2">
                {opt.id !== '0' ? (
                  <div className="flex">
                    <input
                      type="checkbox"
                      checked={isSelected(opt.id)}
                      onChange={() => toggle(opt)}
                      className={`mt-3 mx-2 w-3 h-3 appearance-none rounded-full border-2 border-[#4B3A2D] checked:bg-[#76916c] checked:border-transparent cursor-pointer ${isManualSelected && opt.id !== '0' ? 'opacity-40' : ''}`}/>
                    <div className="w-full flex flex-col border border-gray-300 rounded p-1">
                      <div className="flex justify-between">
                        <div>
                          <h1 className="font-bold">{opt.mode}</h1>
                        </div>
                        <div className="flex">
                          <p>Room: </p>
                          <div className="ml-2 flex rounded bg-gray-200 gap-2">
                            <button onClick={() => decrement(opt.id)} className="px-2 hover:bg-gray-300 rounded-l">-</button>
                            <div className="">{opt.count}</div>
                            <button onClick={() => increment(opt.id)} className="px-2 hover:bg-gray-300 rounded-r">+</button>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between p-1">
                        <div className="flex">
                          <p className="bg-gray-200 p-1 rounded text-sm">
                            aprox. cost range: {lowest} Tk - {highest} Tk
                          </p>
                        </div>
                        <div>
                          <p className="bg-gray-200 p-1 px-4 rounded text-sm">
                            avg- {avgCost * opt.count} Tk
                          </p>
                        </div>
                      </div>
                      <div className="text-xs px-1 mt-3">
                        <p>Available hotels in this range:</p>
                        <div className="p-0.5">
                          {hotelsInCategory.length ? (
                            <div className="flex flex-wrap gap-1.5">
                              {hotelsInCategory.map((h) => (
                                <p key={h.name} className="text-xs bg-blue-100 rounded">{h.name}</p>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm italic">No data available</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <input
                      type="checkbox"
                      checked={isSelected(opt.id)}
                      onChange={() => toggle(opt)}
                      className={`mt-3 mx-2 w-3 h-3 appearance-none rounded-full border-2 border-[#4B3A2D] checked:bg-red-900 checked:border-transparent cursor-pointer ${isManualSelected && opt.id !== '0' ? 'opacity-40' : ''}`}/>
                    <div className="w-full flex border border-gray-300 rounded p-3">
                      <p className="font-semibold">Add Cost manually:</p>
                      <input type="number" value={opt.manualCost ?? ''} onChange={(e) => { const val = parseInt(e.target.value) || 0; setOptions((prev) => prev.map((o) => (o.id === '0' ? { ...o, manualCost: val } : o)) ); }} className="w-[80px] text-sm ml-2 px-2 bg-gray-200 rounded focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-number-field]:appearance-textfield" />
                      <p className="ml-2">Tk</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div className="flex justify-between mt-3">
          <div className="ml-7 flex gap-3">
            <button className="text-xs underline">GoZayaan.com</button>
            <button className="text-xs underline">sharetrip.com</button>
            <button className="text-xs underline">booking.com</button>
          </div>
          <div className="w-[100px] scale-90">
            <Button2 text="Done" onClick={handleDone} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelPopUp;
