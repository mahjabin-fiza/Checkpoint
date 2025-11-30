import React from 'react';
import Header from '.././components/Header.jsx';
import Search from '.././components/Search.jsx';
import MyImage from '.././assets/sylhet-tours-sightseeing-in-bangladesh-2.jpg';
import Button1 from '../components/Button1.jsx';
import Button2 from '../components/Button2.jsx';
import { Link } from 'react-router-dom';

function Signin() {
  return (
    <>
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
                  type="email"
                  placeholder="Email"
                  className="border-0 border-b-2 border-gray-300 px-3 pb-1 focus:outline-none focus:border-[#A88B68] focus:ring-0"
                />
                <label className="text-[#4B3A2D]">Password:</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="border-0 border-b-2 border-gray-300 px-3 pb-1 focus:outline-none focus:border-[#A88B68] focus:ring-0"
                />
                <div className="flex justify-between mt-2 gap-3">
                  <Button1 text="Cancel" to="/" className="" />

                  <Button1 text="Sign in" className="" />
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
    </>
  );
}

export default Signin;