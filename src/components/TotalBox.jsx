import React from 'react';

function TotalBox({ calculatedCost, budget }) {
  return (
    <>
      <div className="py-5 flex flex-col">
        <div className="p-3 bg-white w-full rounded-t-lg flex justify-between shadow">
          <p>Total-</p>
          <p
            className={`font-semibold ${calculatedCost > budget ? 'text-red-700' : 'text-green-700'}`}
          >
            {calculatedCost.toLocaleString('en-BD')}
          </p>
        </div>
        <div className="p-1 bg-gray-100 w-full rounded-b-lg flex justify-end items-center shadow-lg">
          <div>
            {calculatedCost > budget ? (
              <p className="p-3 text-sm font-semibold text-red-800">Oh no! Exceeded your budget</p>
            ) : (
              <p className="p-3 text-sm font-semibold text-green-800">
                Great! it's within your budget
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TotalBox;
