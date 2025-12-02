import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { createUser } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import MyImage from '../assets/sylhet-tours-sightseeing-in-bangladesh-2.jpg';
import Button1 from '../components/Button1';
import { Link } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    const { name, location, email, password, repeatPassword } = formData;

    if (!name || !location || !email || !password) return alert('Please fill out all fields.');

    if (password !== repeatPassword) return alert('Passwords do not match!');

    try {
      // Create account with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user in Firestore
      await createUser(user.uid, {
        name,
        email,
        location,
      });

      // Save session
      localStorage.setItem('user', JSON.stringify({ uid: user.uid, name }));

      navigate('/'); // go home
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div
      className="w-screen h-screen flex items-center justify-center bg-gray-200 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${MyImage})` }}
    >
      <div className="absolute inset-0 bg-[#F5F2EB]/50 rounded-lg"></div>
      <div className="w-[400px] h-[630px] rounded-lg flex flex-col items-center justify-start">
        <h1 className="text-3xl font-bold mb-3 text-center relative z-10 text-[#4B3A2D]">
          Sign Up
        </h1>

        <div className="p-12 pt-2 bg-white w-full h-[95%] relative rounded-lg flex items-start justify-center shadow-lg">
          <div className="w-[100%] h-[100%] rounded flex items-center justify-center">
            <div className="w-full flex flex-col gap-4">
              <label className="text-[#4B3A2D]">Name:</label>
              <input
                name="name"
                onChange={handleChange}
                placeholder="Name"
                className="border-0 border-b-2 border-gray-300 px-3 pb-1 focus:outline-none focus:border-[#A88B68] focus:ring-0"
              />

              <label className="text-[#4B3A2D]">Email:</label>
              <input
                name="email"
                type="email"
                onChange={handleChange}
                placeholder="Email"
                className="border-0 border-b-2 border-gray-300 px-3 pb-1 focus:outline-none focus:border-[#A88B68] focus:ring-0"
              />

              <label className="text-[#4B3A2D]">Location:</label>
              <input
                name="location"
                onChange={handleChange}
                placeholder="Location"
                className="border-0 border-b-2 border-gray-300 px-3 pb-1 focus:outline-none focus:border-[#A88B68] focus:ring-0"
              />

              <label className="text-[#4B3A2D]">Password:</label>
              <input
                name="password"
                type="password"
                onChange={handleChange}
                placeholder="Password"
                className="border-0 border-b-2 border-gray-300 px-3 pb-1 focus:outline-none focus:border-[#A88B68] focus:ring-0"
              />

              <label className="text-[#4B3A2D]">Repeat Password:</label>
              <input
                name="repeatPassword"
                type="password"
                onChange={handleChange}
                placeholder="Password"
                className="border-0 border-b-2 border-gray-300 px-3 pb-1 focus:outline-none focus:border-[#A88B68] focus:ring-0"
              />

              <div className="flex justify-between mt-2 gap-3">
                <Button1 text="Cancel" to="/" />
                <Button1 text="Sign Up" onClick={handleSignup} />
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 flex justify-between text-center text-gray-500 text-xs">
            <Link
              to="/Signin"
              className="text-[#9BB98F] hover:text-[#76916c] font-bold hover:underline transition duration-200 ease-in-out"
            >
              Sign In instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
