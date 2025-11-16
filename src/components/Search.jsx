import Dropdown1 from './Dropdown1.jsx';
import Counter from './Counter.jsx';
import Budget_DD from './Budget_DD.jsx';
import MyImage from '.././assets/8592434717_8023296e12_b.jpg';
import { Link } from 'react-router-dom';

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

        <div class="w-full max-w-4xl mx-auto shadow-md flex gap-3 bg-white/60 rounded-lg justify-center items-center px-4 py-3 relative z-10">
          <Dropdown1
            options={['Dhaka', "Cox's Bazar"]}
            defaultText="Destination"
          />

          <Counter defaultText="Traveler(s)" />

          <Counter defaultText="Duration" />

          <Budget_DD defaultText="Budget" />

          <Link to="/Search_Result">
            <button class="shadow-md border border-2 border-transparent bg-[#A88B68] font-semibold text-white w-40 h-14 rounded-lg hover:bg-[#87A87C]/10 hover:text-[#4B3A2D] hover:border-[#4B3A2D] hover:scale-105 transition duration-300 ease-in-out relative z-10">
              Search
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Search;
