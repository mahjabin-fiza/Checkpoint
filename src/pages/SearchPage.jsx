import React from 'react';
import { useState } from 'react';
import Card from '../components/Card';
import SearchResult from './SearchResult';

function SearchPage() {
  const [selectedDistrict, setSelectedDistrict] = useState('');

  return (
    <div className="p-4">
      <Card query={selectedDistrict} setQuery={setSelectedDistrict} />
      <SearchResult district={selectedDistrict} />
    </div>
  );
}

export default SearchPage;
