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
    <div className='max-w-[140px] h-[79px] flex flex-col py-2 px-3 rounded-l-xl bg-white border border-[#CCC3AF] text-gray-700 shadow-sm hover:border-[#A88B68] transition'>
      <div className="py-1">
        <p className="text-sm font-bold text-[#9C9087]">Start</p>
      </div>
      <div>
      <DatePicker
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);
        }}
        dateFormat="dd LLL, yyyy"
        placeholderText="Select date"
        className="w-full py-1 inline-block text-[#4B3A2D] text-base text-black font-bold focus:outline-none"
        calendarClassName="blue-calendar"
        popperPlacement="bottom-start"
        dropdownMode="select"
        minDate={new Date()}
      />
      </div>
    </div>
  );
};

export default Duration;
