import React, { useRef, useEffect } from 'react';

function SlideDropDown({ isOpen, room }) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const el = dropdownRef.current;
    if (!el) return;

    const updateHeight = () => {
      if (isOpen) {
        el.style.maxHeight = el.scrollHeight + 'px';
      } else {
        el.style.maxHeight = '0px';
      }
    };

    updateHeight();

    // Watch for content changes
    const observer = new ResizeObserver(() => {
      if (isOpen) {
        el.style.maxHeight = el.scrollHeight + 'px';
      }
    });

    observer.observe(el);

    return () => observer.disconnect();
  }, [isOpen, room]);

  return (
    <div
      ref={dropdownRef}
      className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
      style={{ maxHeight: '0px' }}
    >
      <div className="p-3 flex flex-col text-sm gap-2">
        <div>Rooms: {room} (maximum 2 people per room)</div>
      </div>
    </div>
  );
}

export default SlideDropDown;
