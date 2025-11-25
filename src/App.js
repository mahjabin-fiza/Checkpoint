//import logo from './logo.svg';
//import './App.css';


//function App() {
  //return (
   // <div className="App">
     // <header className="App-header">
       // <img src={logo} className="App-logo" alt="logo" />
        //<p>
          //Edit <code>src/App.js</code> and save to reload.
        //</p>
        //<a
          //className="App-link"
          //href="https://reactjs.org"
          //target="_blank"
          //rel="noopener noreferrer"
        //>
          //Learn React
        //</a>
      //</header>
    //</div>
  //);
//}

//export default App;

import React from 'react';
import HotelSearch from './components/HotelSearch';
import './App.css';

function App() {
  return (
    <div className="App">
      <header style={{ backgroundColor: '#282c34', padding: '20px', color: 'white', textAlign: 'center' }}>
        <h1>Smart Travel Planner</h1>
      </header>
      
      <main style={{ padding: '20px' }}>
        <HotelSearch />
      </main>
    </div>
  );
}

export default App;

