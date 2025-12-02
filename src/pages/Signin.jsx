import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getUserById } from '../services/userService';
import { useNavigate, Link } from 'react-router-dom';
import MyImage from '../assets/sylhet-tours-sightseeing-in-bangladesh-2.jpg';
import Button1 from '../components/Button1';

function Signin() {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSignin = async () => {
    const { email, password } = login;

    if (!email || !password) return alert('Please fill all fields');

    try {
      // Authenticate
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch profile from Firestore
      const userData = await getUserById(user.uid);

      // Save session
      localStorage.setItem('user', JSON.stringify(userData));

      navigate('/');
    } catch (error) {
      alert('Invalid email or password');
    }
  };

  return (
    <div
      className="w-screen h-screen flex items-center justify-center bg-gray-200 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${MyImage})` }}
    >
      <div className="absolute inset-0 bg-[#F5F2EB]/50 rounded-lg"></div>

      <div className="w-[350px] h-[450px] rounded-lg flex flex-col items-center justify-start">
        <h1 className="text-3xl font-bold mb-3 text-center relative z-10 text-[#4B3A2D]">
          Sign in
        </h1>

        <div className="p-12 bg-white w-full h-[85%] relative rounded-lg flex items-start justify-center shadow-lg">
          <div className="pt-12 w-[100%] h-[70%] rounded flex items-center justify-center">
            <div className="w-full flex flex-col gap-4">
              <label className="text-[#4B3A2D]">Email:</label>
              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                className="border-0 border-b-2 border-gray-300 px-3 pb-1 focus:outline-none focus:border-[#A88B68] focus:ring-0"
              />

              <label className="text-[#4B3A2D]">Password:</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                className="border-0 border-b-2 border-gray-300 px-3 pb-1 focus:outline-none focus:border-[#A88B68] focus:ring-0"
              />

              <div className="flex justify-between mt-2 gap-3">
                <Button1 text="Cancel" to="/" />
                <Button1 text="Sign in" onClick={handleSignin} />
              </div>
              <button className="text-xs text-center text-[#9BB98F] hover:text-[#76916c] hover:underline transition duration-200 ease-in-out">
                forgot password?
              </button>
            </div>
          </div>

          <div className="absolute bottom-4 flex justify-between text-center text-gray-500 text-xs">
            <p className="px-2">don't have an account?</p>
            <Link
              to="/sign_up"
              className="text-[#9BB98F] hover:text-[#76916c] font-bold hover:underline transition duration-200 ease-in-out"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
