import React, { useState } from 'react';
import Card from '../components/Card';
import SearchResult from './SearchResult';

function SearchPage() {
  const [selectedDistrict, setSelectedDistrict] = useState('');

  return (
    <div className="p-4">
      <Card
        title="Select District"
        defaultText="Type district..."
        query={selectedDistrict}
        setQuery={setSelectedDistrict}
      />
      <SearchResult district={selectedDistrict} />
    </div>
  );
}

export default SearchPage;