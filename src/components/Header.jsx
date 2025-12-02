import Button1 from './Button1.jsx';
import { Link } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown.jsx';
import { useEffect, useState } from 'react';

function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    <header className="w-full px-14 py-6 bg-white">
      <div className="max-w-8xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-4xl font-bold text-[#4B3A2D]">Checkpoint</h1>
        </Link>

        {/* Navigation */}
        <div className="flex flex-wrap space-x-1 items-center">
          <Link
            to="/"
            className="px-5 py-3 rounded text-sm font-medium hover:bg-[#D6E9D6] transition"
          >
            Home
          </Link>

          <Link
            to="/Hotel"
            className="px-5 py-3 rounded text-sm font-medium hover:bg-[#D6E9D6] transition"
          >
            Hotel
          </Link>

          <div className="px-4">
            {!user && <Button1 text="Sign In" to="/Signin" />}
            {user && <ProfileDropdown />}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
