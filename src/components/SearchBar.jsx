import React from 'react';
import Dropdown1 from './Dropdown1.jsx';
import Card from './Card.jsx';
import Counter from './Counter.jsx';
import Budget_DD from './Budget_DD.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Duration from './Duration.jsx';
import Duration2 from './Duration2.jsx';

function SearchBar({
  initialFrom = '',
  initialTo = '',
  initialTravelers = 1,
  initialStart = '',
  initialEnd = '',
  initialBudget = '',
}) {
  const navigate = useNavigate();

  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [travelers, setTravelers] = useState(initialTravelers);
  const [dateStart, setDateStart] = useState(initialStart);
  const [dateEnd, setDateEnd] = useState(initialEnd);
  const [budget, setBudget] = useState(initialBudget);

  const handleSearch = () => {
    const query = new URLSearchParams({
      from,
      to,
      travelers,
      dateStart,
      dateEnd,
      budget,
    }).toString();

    navigate(`/Search_Result?${query}`);
  };

  return (
    <div className="max-w-4xl gap-2 mx-auto shadow-md bg-white/60 flex flex-wrap items-center px-2 py-1 relative z-10 rounded-lg">
      <Card
        defaultText="Enter"
        title="From"
        value={from}
        onChange={setFrom}
        initialValue={from}
      />

      <Card
        defaultText="Enter"
        title="To"
        value={to}
        onChange={setTo}
        initialValue={to}
      />

      <Counter title="Traveler(s)" value={travelers} onChange={setTravelers} />

      <Duration title="Duration" value={dateStart} onChange={setDateStart} />

      <Duration2 title="Duration" value={dateEnd} onChange={setDateEnd} />

      <Budget_DD
        title="Budget"
        value={budget}
        onChange={setBudget}
        initialValue={budget}
      />
      <button
        onClick={handleSearch}
        className="shadow-md border border-2 border-transparent bg-[#A88B68] font-semibold text-white w-28 h-16 rounded-lg hover:bg-[#87A87C]/10 hover:text-[#4B3A2D] hover:border-[#4B3A2D] hover:scale-105 transition duration-300 ease-in-out relative z-10"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;