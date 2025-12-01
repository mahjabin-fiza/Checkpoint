import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getUserById } from "../services/userService";
import { useNavigate, Link } from "react-router-dom";
import MyImage from "../assets/sylhet-tours-sightseeing-in-bangladesh-2.jpg";
import Button1 from "../components/Button1";

function Signin() {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSignin = async () => {
    const { email, password } = login;

    if (!email || !password) return alert("Please fill all fields");

    try {
      // Authenticate
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch profile from Firestore
      const userData = await getUserById(user.uid);

      // Save session
      localStorage.setItem("user", JSON.stringify(userData));

      navigate("/");
    } catch (error) {
      alert("Invalid email or password");
    }
  };

  return (
    <div
      className="w-screen h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${MyImage})` }}
    >
      <div className="absolute inset-0 bg-[#F5F2EB]/50"></div>

      <div className="w-[350px] h-[450px]">
        <h1 className="text-3xl font-bold text-center text-[#4B3A2D]">Sign In</h1>

        <div className="p-12 bg-white h-[85%] rounded-lg shadow-lg relative">
          <div className="flex flex-col gap-4">
            <label>Email:</label>
            <input name="email" type="email" onChange={handleChange} className="border-b" />

            <label>Password:</label>
            <input name="password" type="password" onChange={handleChange} className="border-b" />

            <div className="flex justify-between mt-2">
              <Button1 text="Cancel" to="/" />
              <Button1 text="Sign in" onClick={handleSignin} />
            </div>

            <Link to="/sign_up" className="text-xs text-[#9BB98F] text-center mt-4">
              Don't have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
