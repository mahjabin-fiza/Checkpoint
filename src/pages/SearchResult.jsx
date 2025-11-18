import React from 'react';
import Card from '../components/Card.jsx';
import Header from '../components/Header.jsx';
import Dropdown1 from '../components/Dropdown1.jsx';
import Counter from '../components/Counter.jsx';
import Budget_DD from '../components/Budget_DD.jsx';
import Search from '../components/Search.jsx';
import CostBox1 from '../components/costBox1.jsx';
import PerDayBox from '../components/PerDayBox.jsx';
import SearchBar from '../components/SearchBar.jsx';
import { useLocation } from 'react-router-dom';

function SearchResult() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const from = query.get('from') || '';
  const to = query.get('to') || '';
  const travelers = query.get('travelers') || '';
  const duration = query.get('duration') || '';
  const budget = query.get('budget') || '';

  return (
    <>
      <Header />
      <div className="py-2"></div>
      <SearchBar
        initialFrom={from}
        initialTo={to}
        initialTravelers={Number(travelers)}
        initialDuration={Number(duration)}
        initialBudget={Number(budget)}
      />

      <div class="w-full h-full relative flex flex-col items-center py-4 px-16">
        <div class="bg-white w-[50%] h-[15%] p-3 flex flex-col rounded-lg mb-4 shadow-lg">
          <h1 className="font-semibold">Cost Summery:</h1>
          <div className="w-full flex justify-between items-center">
            <h1>Travel Cost:</h1>
            <h1>Hotel:</h1>
            <h1>Recreation:</h1>
          </div>
        </div>

        <div class="w-full flex gap-4">
          <div class="p-2 bg-white w-[40%] h-[100vh] rounded-lg flex flex-col items-center justify-center shadow-lg">
            <div className="mb-2 bg-gray-200 w-full h-[60%] rounded-lg flex items-center justify-center">
              Pictures of destination
            </div>
            <div className="mb-2 bg-gray-200 w-full h-[25%] rounded-lg flex">
              <div>
                <h1 className="m-2 text-xl font-semibold">{to}</h1>
                <p className="m-2">discription</p>
              </div>
            </div>
            <div className="bg-gray-200 w-full h-[15%] rounded-lg flex items-center justify-center">
              Q&A
            </div>
          </div>

          <div class="w-[60%] h-[100vh] rounded-lg flex flex-col">
            <CostBox1 travelers={Number(travelers)} />
            {Array.from({ length: duration }).map((_, index) => (
              <PerDayBox
                key={index}
                day={index + 1}
                travelers={Number(travelers)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchResult;
