import React from 'react';
import Dropdown1 from './Dropdown1.jsx';
import Card from './Card.jsx';
import Counter from './Counter.jsx';
import Budget_DD from './Budget_DD.jsx';
import { Link } from 'react-router-dom';

function SearchBar() {
  return (
    <div className="w-full max-w-4xl mx-auto shadow-md flex gap-2 bg-white/60 flex items-center px-2 py-1 relative z-10 rounded-lg">
      <div className="grid grid-cols-5 gap-2 flex-1">
        <Card defaultText="Enter" title="From" />

        <Card defaultText="Enter" title="To" />

        <Counter title="Traveler(s)" />

        <Counter title="Duration (Day)" />

        <Budget_DD defaultText="Budget" />
      </div>

      <Link to="/Search_Result">
        <button class="px-4 py-2 shadow-md border border-2 border-transparent bg-[#A88B68] font-semibold text-white w-28 h-16 rounded-lg hover:bg-[#87A87C]/10 hover:text-[#4B3A2D] hover:border-[#4B3A2D] hover:scale-105 transition duration-300 ease-in-out relative z-10">
          Search
        </button>
      </Link>
    </div>
  );
}

export default SearchBar;
