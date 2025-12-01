import React from 'react';

export default function SavedBudgetPlans() {
  const plans = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Plan ${i + 1}`,
    days: '10 days left',
  }));
  return (
    <div className="p-8">
      <div>
        <h1 className="text-2xl font-semibold mb-4">Saved Budget Plans</h1>
      </div>

      {/* Inner blue box: fixed height, vertical scroll when overflow */}
      <div className="w-full h-[400px] p-4 rounded overflow-y-auto">
        {/* Wrapping container */}
        <div className="flex flex-wrap gap-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="w-44 h-28 bg-gray-100 flex-shrink-0 rounded-lg shadow p-3 flex flex-col justify-between scale-100 hover:scale-105 transition duration-300 ease-in-out"
            >
              <div className="font-semibold text-sm break-words">{plan.title}</div>
              <div className="text-xs text-gray-500">{plan.days}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
