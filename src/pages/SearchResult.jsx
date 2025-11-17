import React from 'react';
import Card from '../components/Card.jsx';
import Header from '../components/Header.jsx';
import Dropdown1 from '../components/Dropdown1.jsx';
import Counter from '../components/Counter.jsx';
import Budget_DD from '../components/Budget_DD.jsx';
import Search from '../components/Search.jsx';
import CostBox1 from '../components/costBox1.jsx';

function SearchResult() {
  return (
    <>
      <Header />

      <div className="w-full max-w-4xl mx-auto shadow-md flex gap-2 bg-white/80 flex items-center mt-4 px-2 py-1 relative z-10 rounded-lg">
        <div className="grid grid-cols-5 gap-2 flex-1">
          <Card defaultText="Enter" title="From" />

          <Card defaultText="Enter" title="To" />

          <Counter defaultText="Traveler(s)" />

          <Counter defaultText="Duration" />

          <Budget_DD defaultText="Budget" />
        </div>

        <button class="px-4 py-2 shadow-md border border-2 border-transparent bg-[#A88B68] font-semibold text-white w-28 h-16 rounded-lg hover:bg-[#87A87C]/10 hover:text-[#4B3A2D] hover:border-[#4B3A2D] hover:scale-105 transition duration-300 ease-in-out relative z-10">
          Search
        </button>
      </div>

      <div class="bg-gray-200 w-full h-full relative flex flex-col items-center py-4 px-16">
        <div class="bg-blue-400 w-[50%] h-[15%] rounded-lg mb-4 flex items-center justify-center">
          <div>
            <h1>Cost Summery:</h1>
            <h1>Cost Summery:</h1>
          </div>
        </div>

        <div class="w-full flex gap-4">
          <div class="p-2 bg-green-200 w-[40%] h-[100vh] rounded-lg flex flex-col items-center justify-center">
            <div className="mb-2 bg-white w-full h-[60%] rounded-lg flex items-center justify-center">
              Pictures of destination
            </div>
            <div className="mb-2 bg-white w-full h-[25%] rounded-lg flex">
              <div>
                <h1 className="m-2">Destination title</h1>
                <p className="m-2">discription</p>
              </div>
            </div>
            <div className="bg-white w-full h-[15%] rounded-lg flex items-center justify-center">
              Q&A
            </div>
          </div>

          <div class="bg-red-400 w-[60%] h-[100vh] p-3 rounded-lg flex flex-col">
            <p>Travel Cost:</p>
            <CostBox1 />
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchResult;
