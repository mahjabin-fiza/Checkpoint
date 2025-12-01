import React, { useState } from 'react';
import LocationDetails from './LocationDetails';

function DestinationBox() {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <div className="w-full h-full bg-white p-2 rounded-lg flex flex-col gap-2 shadow-lg">
      <div className="bg-gray-200 w-full h-[65%] rounded-lg flex items-center justify-center">
        Pictures of destination
      </div>
      <div className="bg-gray-200 w-full h-[20%] rounded-lg flex">
        <div>
          <button onClick={() => setPopupOpen(true)} className="m-2">
            details
          </button>
        </div>
        {popupOpen && <LocationDetails onClose={() => setPopupOpen(false)} />}
      </div>
      <div className="bg-gray-200 w-full h-[15%] rounded-lg flex items-center justify-center">
        Q&A
      </div>
    </div>
  );
}

export default DestinationBox;
