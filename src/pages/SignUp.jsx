import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { createUser } from "../services/userService";
import { useNavigate } from "react-router-dom";
import MyImage from "../assets/sylhet-tours-sightseeing-in-bangladesh-2.jpg";
import Button1 from "../components/Button1";

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    const { name, location, email, password, repeatPassword } = formData;

    if (!name || !location || !email || !password)
      return alert("Please fill out all fields.");

    if (password !== repeatPassword)
      return alert("Passwords do not match!");

    try {
      // Create account with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user in Firestore
      await createUser(user.uid, {
        name,
        email,
        location,
      });

      // Save session
      localStorage.setItem("user", JSON.stringify({ uid: user.uid, name }));

      navigate("/"); // go home
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div
      className="w-screen h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${MyImage})` }}
    >
      <div className="absolute inset-0 bg-[#F5F2EB]/50"></div>

      <div className="w-[400px] h-[680px] rounded-lg">
        <h1 className="text-3xl font-bold text-center text-[#4B3A2D]">Sign Up</h1>

        <div className="p-12 pt-2 bg-white h-[95%] rounded-lg shadow-lg relative">
          <div className="flex flex-col gap-4">
            <label>Name:</label>
            <input name="name" onChange={handleChange} className="border-b" />

            <label>Location:</label>
            <input name="location" onChange={handleChange} className="border-b" />

            <label>Email:</label>
            <input name="email" type="email" onChange={handleChange} className="border-b" />

            <label>Password:</label>
            <input name="password" type="password" onChange={handleChange} className="border-b" />

            <label>Repeat Password:</label>
            <input name="repeatPassword" type="password" onChange={handleChange} className="border-b" />

            <div className="flex justify-between mt-2">
              <Button1 text="Cancel" to="/" />
              <Button1 text="Sign Up" onClick={handleSignup} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
