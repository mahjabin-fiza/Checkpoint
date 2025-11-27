import React from 'react';
import Card from '../components/Card.jsx';
import Header from '../components/Header.jsx';
import Dropdown1 from '../components/Dropdown1.jsx';
import Counter from '../components/Counter.jsx';
import Budget_DD from '../components/Budget_DD.jsx';
import Search from '../components/Search.jsx';
import CostBox1 from '../components/SearchResultTab/CostBox1.jsx';
import PerDayBox from '../components/SearchResultTab/PerDayBox.jsx';
import SearchBar from '../components/SearchBar.jsx';
import { useLocation } from 'react-router-dom';
import RecreationBox from '../components/RecreationBox.jsx';
import TotalBox from '../components/TotalBox.jsx';
import TravelType from '../components/SearchResultTab/TravelType.jsx';
import LocationDetails from '../components/SearchResultTab/LocationDetails.jsx';
import { useState } from 'react';

function SearchResult() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [popupOpen, setPopupOpen] = useState(false);

  const [costBoxTotal, setCostBoxTotal] = useState(0);
  const [planTotal, setPlanTotal] = useState(0);
  const [perDayBox, setPerDayBox] = useState([]);

  const totalPerDay = perDayBox.reduce((sum, val) => sum + Number(val || 0), 0);

  const handlePerDayValue = (index, value) => {
    setPerDayBox((prev) => {
      const current = prev[index];
      if (current === value) return prev; // no change => no re-render
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const from = query.get('from') || '';
  const to = query.get('to') || '';
  const travelers = query.get('travelers') || '';
  const duration = query.get('duration') || '';
  const budget = query.get('budget') || '';

  return (
    <>
      <Header />
      <div className="pt-2 flex justify-center">
        <SearchBar
          initialFrom={from}
          initialTo={to}
          initialTravelers={Number(travelers)}
          initialDuration={Number(duration)}
          initialBudget={Number(budget)}
        />
      </div>

      <div class="w-full h-full relative flex flex-col items-center py-4 px-16">
        <div class="bg-white w-[50%] h-[15%] p-3 flex flex-col rounded-lg mb-4 shadow-lg">
          <h1 className="font-semibold">Cost Summery:</h1>
          <div className="w-full flex justify-between items-center">
            <h1>Travel Cost:</h1>
            <h1>Hotel:</h1>
            <h1>Recreation:</h1>
          </div>
        </div>

        <div class="flex gap-4">
          <div class="w-[400px] h-[100vh] rounded-lg flex flex-col">
            <p className="text-lg font-bold">{to}</p>
            <div className="w-full h-full bg-white p-2 rounded-lg flex flex-col gap-2 shadow-lg">
              <div className="bg-gray-200 w-full h-[60%] rounded-lg flex items-center justify-center">
                Pictures of destination
              </div>
              <div className="bg-gray-200 w-full h-[25%] rounded-lg flex">
                <div>
                  <button onClick={() => setPopupOpen(true)} className="m-2">
                    ditails
                  </button>
                </div>
                {popupOpen && (
                  <LocationDetails onClose={() => setPopupOpen(false)} />
                )}
              </div>
              <div className="bg-gray-200 w-full h-[15%] rounded-lg flex items-center justify-center">
                Q&A
              </div>
            </div>
          </div>

          <div class="max-w-[600px] h-[100vh] rounded-lg flex flex-col gap-2">
            <CostBox1
              to={to}
              from={from}
              travelers={Number(travelers)}
              Total={Number(budget * 0.35)}
              duration={Number(duration)}
              onValueChange={setCostBoxTotal}
            />

            {Array.from({ length: duration }).map((_, index) => (
              <PerDayBox
                key={index}
                day={index + 1}
                travelers={Number(travelers)}
                hotelCost={
                  (Number(budget) * 0.4) /
                  (Number(duration) * Math.ceil(Number(travelers) / 2)) //budget = (total*o.4) / ((people/2)*days)
                }
                foodCost={
                  (Number(budget) * 0.1) /
                  (Number(duration) * Math.ceil(Number(travelers))) //budget = (total*o.4) / ((people/2)*days)
                }
                duration={Number(duration)}
                from={from}
                to={to}
                onValueChange={(value) => handlePerDayValue(index, value)}
              />
            ))}

            <RecreationBox
              cost={
                Number(budget) - (Number(totalPerDay) + Number(costBoxTotal)) >
                0
                  ? Number(budget) -
                    (Number(totalPerDay) + Number(costBoxTotal))
                  : 0
              }
              onValueChange={setPlanTotal}
            />
            <div>{totalPerDay}</div>
            <TotalBox
              budget={Number(budget)}
              calculatedCost={
                planTotal + Number(totalPerDay) + Number(costBoxTotal)
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchResult;