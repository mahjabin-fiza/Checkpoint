import React from 'react';
import Header from '.././components/Header.jsx';
import Search from '.././components/Search.jsx';
import { Link } from 'react-router-dom';
import MyImage from '.././assets/sylhet-tours-sightseeing-in-bangladesh-2.jpg';

function Signin() {
  return (
    <>
      <div
        className="w-screen h-screen flex items-center justify-center bg-gray-200 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${MyImage})` }}
      >
        <div className="absolute inset-0 bg-[#F5F2EB]/50 rounded-lg"></div>
        <div className="w-[350px] h-[450px] rounded-lg flex flex-col items-center justify-start">
          <h1 className="text-3xl font-bold text-black mb-3 text-center relative z-10">
            Sign in
          </h1>

          <div className="p-12 bg-white w-full h-[85%] relative rounded-lg flex items-start justify-center shadow-lg">
            <div className="w-[100%] h-[70%] rounded flex items-center justify-center">
              <div className="w-full flex flex-col gap-4">
                <label>Email:</label>
                <input
                  type="email"
                  placeholder="Email"
                  className="border-0 border-b-2 border-gray-300 px-3 pb-2 focus:outline-none focus:border-[#A88B68] focus:ring-0"
                />
                <label>Password:</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="border-0 border-b-2 border-gray-300 px-3 pb-2 focus:outline-none focus:border-[#A88B68] focus:ring-0"
                />
                <div className="flex justify-between mt-2">
                  <button className="w-[48%] py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition">
                    Cancel
                  </button>
                  <button className="w-[48%] py-2 bg-[#A88B68] text-white rounded-lg hover:bg-[#876f55] transition">
                    Sign In
                  </button>
                </div>
              </div>
            </div>
            <p className="absolute bottom-4 w-full text-center text-gray-500 text-sm"></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
