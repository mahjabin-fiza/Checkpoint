import React, { useEffect, useMemo, useState } from 'react';
import { getAuth } from 'firebase/auth';
import Header from '../components/Header.jsx';
import CostBox1 from '../components/SearchResultTab/CostBox1.jsx';
import PerDayBox from '../components/SearchResultTab/PerDayBox.jsx';
import SearchBar from '../components/SearchBar.jsx';
import { useLocation } from 'react-router-dom';
import RecreationBox from '../components/RecreationBox.jsx';
import TotalBox from '../components/TotalBox.jsx';
import { useHotelContext } from '../context/HotelContext';
import Button1 from '../components/Button1.jsx';
import SavedPlanPop from '../components/UserProfile/SavedPlanPop.jsx';
import DestinationBox from '../components/SearchResultTab/DestinationBox.jsx';
import SavePlanConfirmation from '../components/SearchResultTab/SavePlanConfirmation.jsx';

function SearchResult() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popSave, setPopSave] = useState(false);
  const [savedPlans, setSavedPlans] = useState([]);
  const [savePlanOpen, setSavePlanOpen] = useState(false);

  const [costBoxTotal, setCostBoxTotal] = useState({
    total: 0,
    travel1: 0,
    travel2: 0,
  });
  const [planTotal, setPlanTotal] = useState(0);
  const [perDayBox, setPerDayBox] = useState([]);
  const [loading, setLoading] = useState(false);

  const totalPerDay = perDayBox.reduce((sum, val) => sum + Number(val?.total || 0), 0);
  const hotelPerDays = perDayBox.reduce((s, v) => s + Number(v?.hotelTotal || 0), 0);
  const foodPerDays = perDayBox.reduce((s, v) => s + Number(v?.foodTotal || 0), 0);

  const handlePerDayValue = (index, value) => {
    setPerDayBox((prev) => {
      const current = prev[index];

      const curTotal = current?.total ?? 0;
      const curHotelTotal = current?.hotelTotal ?? 0;
      const curFoodTotal = current?.foodTotal ?? 0;

      const newTotal = value?.total ?? 0;
      const newHotelTotal = value?.hotelTotal ?? 0;
      const newFoodTotal = value?.foodTotal ?? 0;

      if (
        current &&
        curTotal === newTotal &&
        curHotelTotal === newHotelTotal &&
        curFoodTotal === newFoodTotal
      ) {
        return prev;
      }
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

  const handleSavePlan = () => {
    const demoPlan = {
      id: `plan_${Date.now()}`,
      from,
      to,
      travelers: Number(travelers) || 0,
      start,
      end,
      budget: Number(budget) || 0,
      travel: costBoxTotal.total,
      fromCost: costBoxTotal.travel1,
      toCost: costBoxTotal.travel2,
      totalPerDay,
      planTotal,
      perDayBox,
      recreationPlans: savedPlans,
      createdAt: new Date().toISOString(),
    };

    console.log('Demo saved plan payload:', demoPlan);
  };

  // inside SearchResult component (place near handleSavePlan)
  // replace your current handleSaveFromPopup with this:
const handleSaveFromPopup = async (planMeta) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    alert('Please sign in to save a plan.');
    return;
  }

  let idToken = null;
  try {
    idToken = await currentUser.getIdToken(false);
  } catch (err) {
    console.error('Failed to get idToken', err);
    alert('Unable to validate session — please sign out and sign in again.');
    return;
  }

const payload = {
  id: planMeta.id || `plan_${Date.now()}`,
  userId: currentUser.uid,
  title: planMeta.title || 'Untitled trip',
  from,
  to,
  travelers: Number(travelers) || 0,
  start,
  end,
  budget: Number(budget) || 0,
  totals: {
    travel: Number(costBoxTotal.total || 0),
    travelFrom: Number(costBoxTotal.travel1 || 0),
    travelTo: Number(costBoxTotal.travel2 || 0),
    perDayTotal: Number(totalPerDay || 0),
    recreation: Number(planTotal || 0),
    grandTotal:
      Number(costBoxTotal.total || 0) + Number(totalPerDay || 0) + Number(planTotal || 0),
  },
  perDay: perDayBox,
  hotelCategories,
  recreationPlans: savedPlans, // ← ADD THIS LINE
  createdAt: new Date().toISOString(),
  updatePlanId: planMeta.updatePlanId || null,
};


  console.log('Attempting to save payload:', payload);

  const trySaveRemote = async () => {
    const res = await fetch('/api/save-plan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(payload),
    });
    return res;
  };

  try {
    const res = await trySaveRemote();

    if (res.ok) {
      // expected JSON { ok: true, plan: {...} }
      const json = await res.json();
      console.log('Saved plan response from server:', json);
      const saved = json.plan || payload;
      setSavedPlans((prev) => [saved, ...prev]);
      alert('Plan saved successfully (server).');
      setSavePlanOpen(false);
      return;
    }

    // If backend returns 404 specifically, treat as "route not implemented"
    if (res.status === 404) {
      console.warn('Backend route not found (404). Falling back to local demo save.');
      // fall through to local save
    } else {
      // other non-ok status: parse text for debug
      const txt = await res.text();
      console.error(`Server returned ${res.status}: ${txt}`);
      // fallback to local save for demo (but notify)
      alert('Server rejected save (non-OK). Falling back to local save for demo.');
    }
  } catch (err) {
    console.warn('Network/error saving to server — falling back to local demo save.', err);
  }

  // --- Local fallback save (demo mode) ---
  try {
    const demoKey = `demo_saved_plans_${currentUser.uid}`;
    const raw = localStorage.getItem(demoKey);
    const list = raw ? JSON.parse(raw) : [];
    const stored = { ...payload, _local: true };
    list.unshift(stored);
    localStorage.setItem(demoKey, JSON.stringify(list));
    setSavedPlans((prev) => [stored, ...prev]);
    console.log('Saved plan to localStorage for demo:', stored);
    alert('Plan saved locally (demo mode). When backend is ready it will save to server.');
    setSavePlanOpen(false);
  } catch (err) {
    console.error('Failed to save demo locally:', err);
    alert('Failed to save plan (both server and local demo). See console for details.');
  }
};


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
            <h1>Travel: {Number(costBoxTotal.total).toLocaleString('en-BD')}</h1>
            <h1>Hotel & Food: {Number(totalPerDay).toLocaleString('en-BD')}</h1>
            <h1>Recreation: {planTotal.toLocaleString('en-BD')}</h1>
          </div>
        </div>

        <div class="flex gap-4">
          <div class="w-[350px] h-[850px] rounded-lg flex flex-col">
            <p className="text-lg font-bold">{to}</p>
            <DestinationBox />
            <div className="scale-95 py-6 flex items-end justify-end">
              <div>
                <Button1
  text="Save Plan"
  onClick={() => {
    console.log("Saving plan...");
    console.log({
      costBoxTotal,
      totalPerDay,
      planTotal,
      perDayBox,
    });
    setSavePlanOpen(true);
  }}
/>

              </div>
              <div>
                <Button1 onClick={() => setPopSave(true)} text="show" />
              </div>
            </div>
          </div>

          <SavePlanConfirmation
            isOpen={savePlanOpen}
            onClose={() => setSavePlanOpen(false)}
            onSave={(planMeta) => {
              // planMeta comes from popup. We'll handle saving here
              handleSaveFromPopup(planMeta);
            }}
            currentPlan={{
              from,
              to,
              travelers: Number(travelers),
              start,
              end,
              budget: Number(budget),
              travel: costBoxTotal.total,
              fromCost: costBoxTotal.travel1,
              toCost: costBoxTotal.travel2,
              totalPerDay,
              planTotal,
              perDayBox,
              savedPlans,
            }}
          />

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
                Number(budget) - (Number(totalPerDay) + Number(costBoxTotal.total)) > 0
                  ? Number(budget) - (Number(totalPerDay) + Number(costBoxTotal.total))
                  : 0
              }
              onValueChange={setPlanTotal}
              onPlansChange={setSavedPlans}
            />
            <TotalBox
              budget={Number(budget)}
              calculatedCost={planTotal + Number(totalPerDay) + Number(costBoxTotal.total)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchResult;
