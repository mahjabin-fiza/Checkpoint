import React from 'react';

function UserPlanDetails({ plan, onClose }) {
  if (!plan) return null; // Safety check

  const startDate = plan.start ? new Date(plan.start) : null;
  const endDate = plan.end ? new Date(plan.end) : null;
  const recPlans = plan.recreationPlans || plan.savedPlans || []; // fallback names

  // helper to format money safely
  const fmt = (v) =>
    v == null || Number.isNaN(Number(v)) ? '0' : Number(v).toLocaleString('en-BD');

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white w-[65%] h-[620px] rounded-lg shadow-lg flex flex-col gap-1 p-2">
        <div>
          <h2 className="text-lg font-semibold text-center">{plan.title || 'Saved Plan'}</h2>
        </div>

        {/* Top Info */}
        <div className="flex flex-col items-center">
          <div className="w-full h-[65px] gap-1 rounded-lg flex flex-wrap justify-center items-center">
            <div className="flex-shrink min-w-[90px] h-full flex flex-col bg-gray-200 p-2 rounded-lg">
              <div className="text-xs">From</div>
              <div className="mt-2 text-sm font-semibold break-words">{plan.from || '—'}</div>
            </div>
            <div className="flex-shrink min-w-[90px] h-full flex flex-col bg-gray-200 p-2 rounded-lg">
              <div className="text-xs">To</div>
              <div className="mt-2 text-sm font-semibold break-words">{plan.to || '—'}</div>
            </div>
            <div className="flex-shrink min-w-[80px] h-full flex flex-col bg-gray-200 p-2 rounded-lg">
              <div className="text-xs">Traveler(s)</div>
              <div className="mt-2 text-sm font-semibold break-words">{plan.travelers ?? '—'}</div>
            </div>
            <div className="flex-shrink min-w-[80px] h-full flex flex-col bg-gray-200 p-2 rounded-lg">
              <div className="text-xs">Duration</div>
              <div className="mt-2 text-sm font-semibold break-words">
                {plan.start && plan.end
                  ? `${Math.ceil((new Date(plan.end) - new Date(plan.start)) / (1000 * 60 * 60 * 24))} Days`
                  : '-'}
              </div>
            </div>
            <div className="flex-shrink min-w-[80px] h-full flex flex-col bg-gray-200 p-2 rounded-lg">
              <div className="text-xs">Budget</div>
              <div className="mt-2 text-sm font-semibold break-words">{fmt(plan.budget)}</div>
            </div>
          </div>
          <div className="p-2 text-sm font-semibold">
            {startDate ? startDate.toLocaleDateString() : '—'} -{' '}
            {endDate ? endDate.toLocaleDateString() : '—'}
          </div>
        </div>

        <div className="flex justify-start text-sm px-3 flex-1 min-h-0">
          {/* Left Column: Travel, Hotel, Daily Cost */}
          <div className="w-[40%] flex flex-col gap-3 border p-4 rounded overflow-y-auto min-h-0">
            {/* Travel Details */}
            <div>
              <div className="font-medium mb-2">Travel Details:</div>
              <div className="w-full h-full rounded flex flex-col gap-2">
                <div className="flex flex-col gap-2 p-1 bg-gray-300 rounded">
                  <div className="font-semibold">→ {plan.to || 'Destination'}</div>
                  <div className="flex justify-between">
                    <div>Mode: {plan.travelMode || 'Bus'}</div>
                    <div>Cost: {fmt(plan.totals?.travelFrom)}</div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 bg-gray-200 rounded p-1">
                  <div className="font-semibold">→ {plan.from || 'Origin'}</div>
                  <div className="flex justify-between">
                    <div>Mode: {plan.travelMode || 'Bus'}</div>
                    <div>Cost: {fmt(plan.totals?.travelTo)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Cost / Hotel */}
            <div>
              <div className="font-medium mb-2">Daily Cost:</div>
              <div className="w-full h-full rounded flex flex-col gap-2">
                {Array.isArray(plan.perDay) && plan.perDay.length > 0 ? (
                  plan.perDay.map((h, idx) => {
                    // date = start + idx days (user requested start + 1 style)
                    const hotelDate = startDate
                      ? new Date(startDate.getTime() + idx * 24 * 60 * 60 * 1000)
                      : null;

                    // compute per-day cost: prefer h.total, otherwise hotelTotal+foodTotal, otherwise h.cost
                    const perDayCost =
                      h?.total ??
                      Number(h?.hotelTotal || 0) + Number(h?.foodTotal || 0) ??
                      h?.cost ??
                      0;

                    // display room count if available inside item.hotels entries or h.count
                    let roomInfo = '';
                    if (Array.isArray(h?.hotels) && h.hotels.length > 0) {
                      // try to find count on first hotel entry if present
                      const first = h.hotels[0];
                      if (first?.count)
                        roomInfo = ` - [${first.count} Room${first.count > 1 ? 's' : ''}]`;
                    } else if (h?.count) {
                      roomInfo = ` - [${h.count} Room${h.count > 1 ? 's' : ''}]`;
                    }

                    return (
                      <div key={idx} className="flex flex-col gap-1 p-1 bg-gray-300 rounded">
                        <div className="font-semibold">
                          → {hotelDate ? hotelDate.toLocaleDateString() : `Day ${idx + 1}`}
                        </div>
                        <div className="flex justify-between">
                          <div>
                            Day - {idx + 1}
                            {roomInfo}
                          </div>
                          <div>Cost: {fmt(perDayCost)}</div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-sm text-gray-500">No daily breakdown saved.</div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Costs, Recreation Plans */}
          <div className="w-[60%] flex flex-col gap-6 p-2">
            <div>
              <div className="font-medium mb-2">Cost Summary:</div>
              <div className="flex justify-between gap-2 p-1 rounded border border-2">
                <div className="flex flex-col gap-1">
                  <div className="font-semibold">Travel</div>
                  <div>{fmt(plan.totals?.travel)}</div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="font-semibold">Hotel+Food</div>
                  <div>
                    {fmt(
                      Number(plan.totals?.perDayTotal || 0) + Number(plan.totals?.recreation || 0)
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="font-semibold">Others</div>
                  <div>{fmt(plan.totals?.others)}</div>
                </div>
              </div>
              <div className="text-xs mt-1">
                {plan.totals?.grandTotal && plan.budget && plan.totals.grandTotal - plan.budget > 0
                  ? `${fmt(plan.totals.grandTotal - plan.budget)} - exceeded budget`
                  : ''}
              </div>
            </div>

            {/* Recreation Plans */}
            <div className="flex-1 overflow-y-auto min-h-0">
              <div>
                <div className="font-medium mb-2">Trip Plan:</div>
                {recPlans.length === 0 ? (
                  <div className="text-sm text-gray-500">No trip plans saved.</div>
                ) : (
                  recPlans.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between gap-1 p-2 bg-gray-300 rounded mb-2"
                    >
                      <div className="font-semibold">Plan : {item.title || item.name}</div>
                      <div>Cost: {fmt(item.budget ?? item.cost)}</div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Comment */}
            <div className="w-full bg-gray-50 p-1 rounded">
              <div>
                <div className="text-xs text-gray-600 mb-1">Comment:</div>
                <div className="bg-white p-2 rounded min-h-[50px] break-words">
                  {plan.comment || ''}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserPlanDetails;
