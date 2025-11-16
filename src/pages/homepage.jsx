import React from 'react';
import Header from '.././components/Header.jsx';
import Search from '.././components/Search.jsx';
import Card from '.././components/Card.jsx';
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div>
      <>
        <Header />
        <Search />
        <Card />
      </>
    </div>
  );
}

export default Homepage;
