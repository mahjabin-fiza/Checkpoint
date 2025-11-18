import Dropdown1 from './Dropdown1.jsx';
import Card from './Card.jsx';
import Counter from './Counter.jsx';
import Budget_DD from './Budget_DD.jsx';
import MyImage from '.././assets/8592434717_8023296e12_b.jpg';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar.jsx';

function Search() {
  return (
    <section class="flex items-center justify-center bg-cover bg-center py-5 px-14">
      <div
        class="max-w-8xl w-full rounded-lg py-12 px-28 shadow-md flex flex-col justify-between h-[400px] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${MyImage})` }}
      >
        <div className="absolute inset-0 bg-[#F5F2EB]/50 rounded-lg"></div>
        <div className="flex-grow flex items-center justify-center relative z-10">
          <h2 className="text-4xl font-bold text-center text-[#4B3A2D]">
            Plan your travel effortlessly
          </h2>
        </div>

        <SearchBar />
      </div>
    </section>
  );
}

export default Search;
