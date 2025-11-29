// SavedPlanPop.jsx
import React from 'react';

function SavedPlanPop({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white w-[70%] h-[90%] rounded-lg shadow-lg p-7 flex flex-col justify-between">
        <h2 className="text-lg font-semibold text-center">Saved Plan</h2>
        <div className="w-full h-full">
          <div className="flex-1 flex flex-col items-center p-3">
            <div className="w-full h-[65px] gap-1 bg-white rounded-lg flex flex-wrap justify-center items-center">
              <div className="flex-shrink min-w-[90px] h-full flex flex-col bg-gray-200 p-2 rounded-lg">
                <div className="text-xs">From</div>
                <div className="mt-2 text-sm font-semibold break-words">Dhaka</div>
              </div>

              <div className="flex-shrink min-w-[90px] h-full flex flex-col bg-gray-200 p-2 rounded-lg">
                <div className="text-xs">To</div>
                <div className="mt-2 text-sm font-semibold break-words">Cox's Bazar</div>
              </div>

              <div className="flex-shrink min-w-[80px] h-full flex flex-col bg-gray-200 p-2 rounded-lg">
                <div className="text-xs">Traveler(s)</div>
                <div className="mt-2 text-sm font-semibold break-words">5</div>
              </div>

              <div className="flex-shrink min-w-[80px] h-full flex flex-col bg-gray-200 p-2 rounded-lg">
                <div className="text-xs">Duration</div>
                <div className="mt-2 text-sm font-semibold break-words">6 Days</div>
              </div>

              <div className="flex-shrink min-w-[80px] h-full flex flex-col bg-gray-200 p-2 rounded-lg">
                <div className="text-xs">Budget</div>
                <div className="mt-2 text-sm font-semibold break-words">3000</div>
              </div>
            </div>
            <div className="p-2 text-sm font-semibold">12/06/2025 - 15/06/2025</div>
          </div>
          <div className="h-[420px] flex justify-start text-sm gap-5 p-3">
            <div className="w-[40%] flex flex-col gap-3 border p-4 rounded overflow-y-auto">
              <div className="">
                <div className="">Travel Details:</div>
                <div className="w-full h-full rounded flex flex-col gap-2">
                  <div className="flex flex-col gap-2 p-1 bg-gray-300 rounded">
                    <div className="font-semibold">→ Cox's Bazar</div>
                    <div className="flex justify-between">
                      <div>Mode: Bus</div>
                      <div>Cost: 1000</div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 p-1 bg-gray-200 rounded">
                    <div className="font-semibold">→ Dhaka</div>
                    <div className="flex justify-between">
                      <div>Mode: Bus</div>
                      <div>Cost: 1000</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="">
                <div className="">Hotel Details:</div>
                <div className="w-full h-full rounded flex flex-col gap-2">
                  <div className="flex flex-col gap-1 p-1 bg-gray-300 rounded">
                    <div className="font-semibold">→12/06/2025</div>
                    <div className="flex justify-between">
                      <div>Low Range - [2 Rooms]</div>
                      <div>Cost: 1000</div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 p-1 bg-gray-300 rounded">
                    <div className="font-semibold">→13/06/2025</div>
                    <div className="flex justify-between">
                      <div>Low Range</div>
                      <div>Cost: 1000</div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 p-1 bg-gray-300 rounded">
                    <div className="font-semibold">→13/06/2025</div>
                    <div className="flex justify-between">
                      <div>Low Range</div>
                      <div>Cost: 1000</div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 p-1 bg-gray-300 rounded">
                    <div className="font-semibold">→13/06/2025</div>
                    <div className="flex justify-between">
                      <div>Low Range</div>
                      <div>Cost: 1000</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[60%] flex flex-col gap-6 p-2">
              <div className="">
                <div className="">Cost Summary:</div>
                <div className="flex justify-between gap-2 p-1 rounded border border-2">
                  <div className="flex flex-col gap-1">
                    <div className="font-semibold">Travel</div>
                    <div>2,000</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="font-semibold">Hotel</div>
                    <div>2,000</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="font-semibold">Food</div>
                    <div>2,000</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="font-semibold">Others</div>
                    <div>2,000</div>
                  </div>
                </div>
                <div className="text-xs">500 - exceeded budget</div>
              </div>

              {/* Scrollable top section */}
              <div className="flex-1 overflow-y-auto">
                <div className="">
                  <div>Trip Plan:</div>
                  <div>
                    <div className="w-full h-full rounded flex flex-col gap-2">
                      <div className="flex justify-between gap-1 p-2 bg-gray-300 rounded">
                        <div className="font-semibold">Plan : Himchori</div>
                        <div>Cost: 1000</div>
                      </div>
                      <div className="flex justify-between gap-1 p-2 bg-gray-300 rounded">
                        <div className="font-semibold">Plan : Himchori</div>
                        <div>Cost: 1000</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fixed bottom comment section */}
              <div className="w-full bg-gray-50 p-1 rounded mt-2">
                <div>
                  <div className="text-xs text-gray-600 mb-1">Comment:</div>
                  <div className="bg-white p-2 rounded min-h-[50px] break-words">Comment</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-2">
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

export default SavedPlanPop;
