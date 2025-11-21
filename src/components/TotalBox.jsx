import React from 'react';

function TotalBox() {
  return (
    <>
      <div className="mt-5  flex flex-col">
        <div className="p-3 bg-white w-full rounded-t-lg flex justify-between shadow-lg">
          <p>Total-</p>
          <p className="font-semibold">cost</p>
        </div>
        <div className="p-1 bg-gray-200 w-full rounded-b-lg justify-center shadow-lg">
          <p className="p-3">comment</p>
        </div>
      </div>
    </>
  );
}

export default TotalBox;
