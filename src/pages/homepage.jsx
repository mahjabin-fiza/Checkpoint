import React from 'react';
import Header from '../components/Header.jsx';
import Search from '../components/Search.jsx';
import Features from '../components/Features.jsx';
import PopularDestinations from '../components/PopularDestinations.jsx';
import TrendingDeals from '../components/TrendingDeals.jsx';
import WhyChooseUs from '../components/WhyChooseUs.jsx';

function Homepage() {
  return (
    <div>
      <>
        <Header />
        <div className="p-7 flex flex-col gap-7">
          <div>
            <Search />
          </div>
          <div>
            <Features />
          </div>
          <div>
            <PopularDestinations />
          </div>
          <div>
            <TrendingDeals />
          </div>
          <div>
            <WhyChooseUs />
          </div>
        </div>
      </>
    </div>
  );
}

export default Homepage;
