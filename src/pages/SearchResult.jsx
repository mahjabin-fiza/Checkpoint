import React from 'react';

function SearchResult() {
  return (
    <>
      <div class="w-full max-w-4xl mx-auto shadow-md bg-white/60 rounded-lg px-4 py-3 relative z-10 flex items-center gap-4">
        <div class="grid grid-cols-4 gap-3 flex-1">
          <div class="bg-white shadow p-3 rounded-md text-center">Box 1</div>
          <div class="bg-white shadow p-3 rounded-md text-center">Box 2</div>
          <div class="bg-white shadow p-3 rounded-md text-center">Box 3</div>
          <div class="bg-white shadow p-3 rounded-md text-center">Box 4</div>
        </div>

        <button class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          Action
        </button>
      </div>
    </>
  );
}

export default SearchResult;
