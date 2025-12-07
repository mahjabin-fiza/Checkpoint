import React from 'react';
import Dropdown1 from './Dropdown1.jsx';
import Card from './Card.jsx';
import Counter from './Counter.jsx';
import Budget from './Budget.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Duration from './Duration.jsx';
import Duration2 from './Duration2.jsx';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

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
    if (dateStart && dateEnd) {
      const start = new Date(dateStart);
      const end = new Date(dateEnd);
      if (start > end) {
        Swal.fire({
          title: '<span style="font-size:18px;">Invalid Dates</span>',
          text: 'Enter correct date.',
          confirmButtonColor: '#A88B68',
          width: 300,
        });
        return;
      }
    }
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
    <div className="max-w-4xl gap-2 mx-auto shadow-md bg-white/70 flex items-center px-2 py-2 relative z-10 rounded-lg">
      <div className="flex">
        <Card
          defaultText="Enter"
          title="From"
          value={from}
          onChange={setFrom}
          initialValue={from}
          className={'rounded-l-xl'}
        />
        <Card
          defaultText="Enter"
          title="To"
          value={to}
          onChange={setTo}
          initialValue={to}
          className={'rounded-r-xl'}
        />
      </div>

      <div className="flex items-center justify-center">
        <Duration title="Start" value={dateStart} onChange={setDateStart} />
        <Duration2 title="End" value={dateEnd} onChange={setDateEnd} />
      </div>

      <Counter title="Traveler(s)" value={travelers} onChange={setTravelers} />

      <Budget title="Budget" value={budget} onChange={setBudget} initialValue={budget} />
      <button
        onClick={handleSearch}
        className="text-base border border-2 border-transparent bg-[#A88B68] font-semibold text-white py-6 px-5 rounded-xl hover:bg-[#87A87C]/10 hover:text-[#4B3A2D] hover:border-[#4B3A2D] hover:scale-105 transition duration-300 ease-in-out relative z-10"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
