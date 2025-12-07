import React, { useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import Search from '../components/Search.jsx';
import Features from '../components/Features.jsx';
import PopularDestinations from '../components/PopularDestinations.jsx';
import WhyChooseUs from '../components/WhyChooseUs.jsx';

function Homepage() {
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    // This forces the page to refresh UI when user logs in
    const stored = localStorage.getItem('user');
    setRefresh(!!stored);
  }, []);

  return (
    <div>
      <Header />

      <div className="p-7 flex flex-col gap-7">
        <Search />
        <Features />
        <PopularDestinations />
        <WhyChooseUs />
      </div>
    </div>
  );
}

export default Homepage;
