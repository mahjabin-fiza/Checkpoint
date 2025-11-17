import Button1 from './Button1.jsx';
import Button2 from './Button2.jsx';
import Signin from '../pages/Signin.jsx';
import SearchResult from '../pages/SearchResult.jsx';

function Header() {
  return (
    <header className="w-full px-14 py-7 bg-white">
      <div className="max-w-8xl mx-auto flex items-center justify-between">
        <h1 className="text-4xl font-bold text-[#4B3A2D]">Checkpoint</h1>

        <div className="flex flex-wrap space-x-2">
          <button className="px-3 py-1.5 rounded text-sm font-medium hover:bg-[#D6E9D6] transition duration-300 ease-in-out">
            Home
          </button>
          <button className="px-3 py-1.5 rounded text-sm font-medium hover:bg-[#D6E9D6] transition ease-in-out">
            About
          </button>
          <button className="px-3 py-1.5 rounded text-sm font-medium hover:bg-[#D6E9D6] transition ease-in-out">
            Contact
          </button>
          <Button1 text="Register" />
          <Button1 text="Sign In" to="/Signin" />
        </div>
      </div>
    </header>
  );
}

export default Header;
