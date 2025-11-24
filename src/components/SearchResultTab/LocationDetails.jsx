import React from 'react';
import { useEffect } from 'react';
import Button2 from '../Button2';

function LocationDetails({ onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="w-full bg-white p-4 flex flex-col justify-between rounded-lg shadow-lg w-[50%] max-w-[520px] max-h-[700px]">
        <h2 className="text-lg font-semibold mb-2 text-center">
          Travel Options
        </h2>

        <div className="h-full flex flex-col gap-2 p-5">
          <div className="flex flex-col gap-4"></div>
        </div>

        <div className="flex justify-end">
          <div className="w-[100px] scale-90">
            <Button2 text="Done" onClick={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationDetails;
