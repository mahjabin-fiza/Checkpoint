import React from 'react';
import Header from '../components/Header.jsx';
import Search from '../components/Search.jsx';
import Features from '../components/Features.jsx';
import PopularDestinations from "../components/PopularDestinations";
import TrendingDeals from "../components/TrendingDeals";
import WhyChooseUs from "../components/WhyChooseUs";


function Homepage() {
  return (
    <div>
      <>
        <Header />
        <div className='p-7 flex flex-col gap-7'>
          <div><Search /></div>
          <div><Features /></div>
          <div><PopularDestinations /></div>
          <div><TrendingDeals /></div>
          <div><WhyChooseUs /></div>
        </div>
      </>
    </div>
  );
}

export default Homepage;