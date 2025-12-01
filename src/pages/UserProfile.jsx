import React, { useState } from "react";
import Header from "../components/Header";
import ProfileTab from "../components/UserProfile/ProfileTab";
import { Link } from "react-router-dom";

function UserProfile() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <>
      <Header />

      <div className="flex flex-1 min-h-[calc(100vh-92px)] py-6 px-16 gap-5 justify-center">

        {/* LEFT SIDEBAR */}
        <div className="outer-container w-[25%] bg-gray-50 rounded py-4 pl-4 flex flex-col shadow-lg">
          <div className="inter-container flex-1 flex flex-col">

            {/* Profile */}
            <button
              onClick={() => setActiveTab("profile")}
              className={`block text-left p-3 rounded-l-lg ${
                activeTab === "profile"
                  ? "bg-white border-r-4 border-[#9BB98F]"
                  : "hover:bg-white hover:border-r-4 hover:border-white transition duration-200 ease-in-out"
              }`}
            >
              Profile
            </button>

            {/* Saved Budget Plan */}
            <button
              onClick={() => setActiveTab("budgetPlan")}
              className={`block text-left p-3 rounded-l-lg ${
                activeTab === "budgetPlan"
                  ? "bg-white border-r-4 border-[#9BB98F]"
                  : "hover:bg-white hover:border-r-4 hover:border-white duration-200 ease-in-out"
              }`}
            >
              Saved Budget Plan
            </button>

            {/* Settings */}
            <button
              onClick={() => setActiveTab("settings")}
              className={`block text-left p-3 rounded-l-lg ${
                activeTab === "settings"
                  ? "bg-white border-r-4 border-[#9BB98F]"
                  : "hover:bg-white hover:border-r-4 hover:border-white duration-200 ease-in-out"
              }`}
            >
              Settings
            </button>

            {/* SIGN OUT → goes to SignOut.jsx */}
            <Link
              to="/signout"
              className={`mt-auto block text-left p-3 rounded-l-lg text-red-600 ${
                activeTab === "sign_out"
                  ? "bg-white border-r-4 border-[#9BB98F]"
                  : "hover:bg-white hover:border-r-4 hover:border-white transition duration-200 ease-in-out"
              }`}
              onClick={() => setActiveTab("sign_out")}
            >
              Sign Out
            </Link>
          </div>
        </div>

        {/* RIGHT CONTENT AREA */}
        <div className="outer-container w-[750px] bg-white rounded p-8 flex flex-col shadow-lg">
          <div className="inter-container flex-1 bg-gray-50 rounded-lg">

            {activeTab === "profile" && <ProfileTab />}
            {activeTab === "budgetPlan" && <p>Budget</p>}
            {activeTab === "settings" && <p>Settings</p>}
            {activeTab === "sign_out" && <p>Signing out...</p>}

          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;

