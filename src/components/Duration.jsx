// Duration.jsx
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { parseISO, format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

const toIso = (date) => (date ? date.toISOString().slice(0, 10) : null);

const Duration = ({ value = '', onChange }) => {
  const [startDate, setStartDate] = useState(value ? parseISO(value) : null);

  useEffect(() => {
    const localIso = toIso(startDate);
    const incomingIso = value || null;
    if (incomingIso !== localIso) {
      setStartDate(incomingIso ? parseISO(incomingIso) : null);
    }
  }, [value]);

  useEffect(() => {
    if (!onChange) return;

    const localIso = toIso(startDate);
    const incomingIso = value || null;

    if (localIso !== incomingIso) {
      onChange(localIso);
    }
  }, [startDate, onChange]);

  const pretty = startDate ? format(startDate, 'dd LLL, yyyy') : '';

  return (
    <div className="max-w-[160px] py-2 px-3 flex flex-col bg-white border border-gray-300 rounded-l-xl text-gray-700 shadow-sm hover:border-[#A88B68] transition">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-[#9C9087] font-bold">Start</p>
      </div>

      <DatePicker
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);
        }}
        dateFormat="dd LLL, yyyy"
        placeholderText="Select date"
        className="w-full rounded text-base font-bold focus:outline-none px-2 py-2 border border-gray-200 text-[#4B3A2D]"
        calendarClassName="blue-calendar"
        popperPlacement="bottom-start"
        dropdownMode="select"
        minDate={new Date()}
      />
    </div>
  );
};

export default Duration;
