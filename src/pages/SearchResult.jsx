import React, { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header.jsx';
import CostBox1 from '../components/SearchResultTab/CostBox1.jsx';
import PerDayBox from '../components/SearchResultTab/PerDayBox.jsx';
import SearchBar from '../components/SearchBar.jsx';
import { useLocation } from 'react-router-dom';
import RecreationBox from '../components/RecreationBox.jsx';
import TotalBox from '../components/TotalBox.jsx';
import LocationDetails from '../components/SearchResultTab/LocationDetails.jsx';
import { useHotelContext } from '../context/HotelContext';
import Button1 from '../components/Button1.jsx';
import SavedPlanPop from '../components/UserProfile/SavedPlanPop.jsx';
import DestinationBox from '../components/SearchResultTab/DestinationBox.jsx';

function SearchResult() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popSave, setPopSave] = useState(false);

  const [costBoxTotal, setCostBoxTotal] = useState(0);
  const [planTotal, setPlanTotal] = useState(0);
  const [perDayBox, setPerDayBox] = useState([]);
  const [loading, setLoading] = useState(false);

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
  const start = query.get('dateStart') || '';
  const end = query.get('dateEnd') || '';
  const budget = query.get('budget') || '';

  const startDate = new Date(start);
  const endDate = new Date(end);

  const duration =
    start && end ? Math.max(0, Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1) : 0;

  const { fetchHotels } = useHotelContext();
  const [hotelCategories, setHotelCategories] = useState({
    low: { hotels: [], avg: 0, range: [0, 0] },
    medium: { hotels: [], avg: 0, range: [0, 0] },
    high: { hotels: [], avg: 0, range: [0, 0] },
  });

  useEffect(() => {
    if (!to || !start || !end) return;

    setLoading(true);

    const startDateObj = new Date(start);
    const endDateObj = new Date(end);
    const midDate = new Date(startDateObj.getTime() + (endDateObj - startDateObj) / 2);
    const checkin = midDate.toISOString().split('T')[0];
    const checkout = new Date(midDate.getTime() + 1 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];

    fetchHotels(to, checkin, checkout)
      .then((result) => {
        const data = result.data;
        const hotelsArray = Array.isArray(data.hotels) ? data.hotels : [];
        const hotels = hotelsArray.map((h) => ({
          name: h.name,
          priceBDT: h.price ? Math.ceil(h.price * 122) : 0,
        }));

        const categorize = (arr, min, max) => {
          const filtered = arr.filter((h) => h.priceBDT >= min && h.priceBDT <= max);
          if (!filtered.length) return { hotels: [], avg: 0, range: [0, 0] };
          const prices = filtered.map((h) => h.priceBDT);
          const avg = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          return { hotels: filtered, avg, range: [minPrice, maxPrice] };
        };

        const lowCategory = categorize(hotels, 0, 3000);
        const mediumCategory = categorize(hotels, 3000, 10000);
        const highCategory = categorize(hotels, 10000, Infinity);

        // **Apply defaults if avg is zero**
        setHotelCategories({
          low: {
            ...lowCategory,
            avg: lowCategory.avg || 2000,
            range: lowCategory.range[1] ? lowCategory.range : [2000, 3000],
          },
          medium: {
            ...mediumCategory,
            avg: mediumCategory.avg || 5000,
            range: mediumCategory.range[1] ? mediumCategory.range : [5000, 10000],
          },
          high: {
            ...highCategory,
            avg: highCategory.avg || 10000,
            range: highCategory.range[1] ? highCategory.range : [10000, 30000],
          },
        });
      })
      .catch(() => {
        // **Offline fallback**
        setHotelCategories({
          low: { hotels: [], avg: 2000, range: [2000, 3000] },
          medium: { hotels: [], avg: 5000, range: [5000, 10000] },
          high: { hotels: [], avg: 10000, range: [10000, 30000] },
        });
      })
      .finally(() => setLoading(false));
  }, [to, start, end, fetchHotels]);

  return (
    <>
      <Header />
      <div className="pt-2 flex justify-center">
        <SearchBar
          initialFrom={from}
          initialTo={to}
          initialTravelers={Number(travelers)}
          initialStart={start}
          initialEnd={end}
          initialBudget={Number(budget)}
        />
      </div>

      <div class="w-full h-full relative flex flex-col items-center py-4 px-16">
        {loading && (
          <div className="absolute inset-0 z-50 flex justify-center bg-white/50 backdrop-blur-sm">
            <p className="px-4 py-5 font-bold text-black animate-pulse">Loading...</p>
          </div>
        )}
        <div class="bg-white w-[50%] h-[15%] p-3 flex flex-col rounded-lg mb-4 shadow-lg">
          <h1 className="font-semibold">Cost Summery:</h1>
          <div className="w-full flex justify-between items-center">
            <h1>Travel: {Number(costBoxTotal).toLocaleString('en-BD')}</h1>
            <h1>Hotel & Food: {Number(totalPerDay).toLocaleString('en-BD')}</h1>
            <h1>Recreation: {planTotal.toLocaleString('en-BD')}</h1>
          </div>
        </div>

        <div class="flex gap-4">
          <div class="w-[350px] h-[850px] rounded-lg flex flex-col">
            <p className="text-lg font-bold">{to}</p>
            <DestinationBox/>
            <div className="scale-95 py-6 flex items-end justify-end">
              <div>
                <Button1 text="save plan" />
              </div>
              <div>
                <Button1 onClick={() => setPopSave(true)} text="show" />
              </div>
            </div>
          </div>

          {popSave && <SavedPlanPop onClose={() => setPopSave(false)} />}

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
                start={start}
                end={end}
                travelers={Number(travelers)}
                hotelCost={
                  (Number(budget) * 0.4) / (Number(duration) * Math.ceil(Number(travelers) / 2)) //budget = (total*o.4) / ((people/2)*days)
                }
                foodCost={
                  (Number(budget) * 0.1) / (Number(duration) * Math.ceil(Number(travelers))) //budget = (total*o.4) / ((people/2)*days)
                }
                duration={Number(duration)}
                from={from}
                to={to}
                onValueChange={(value) => handlePerDayValue(index, value)}
                hotelCategories={hotelCategories}
              />
            ))}

            <RecreationBox
              cost={
                Number(budget) - (Number(totalPerDay) + Number(costBoxTotal)) > 0
                  ? Number(budget) - (Number(totalPerDay) + Number(costBoxTotal))
                  : 0
              }
              onValueChange={setPlanTotal}
            />
            <TotalBox
              budget={Number(budget)}
              calculatedCost={planTotal + Number(totalPerDay) + Number(costBoxTotal)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchResult;
