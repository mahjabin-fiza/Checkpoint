import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ProfileTab from '../components/UserProfile/ProfileTab';

function UserProfile() {
  const [activeTab, setActiveTab] = useState('profile');
  return (
    <>
      <Header />
      <div className="flex flex-1 min-h-[calc(100vh-92px)] py-6 px-16 gap-5 justify-center">
        <div className="outer-container w-[25%] bg-gray-50 rounded py-4 pl-4 flex flex-col shadow-lg">
          <div className="inter-container flex-1 flex flex-col">
            <Link
              onClick={() => setActiveTab('profile')}
              className={`block p-3 rounded-l-lg ${activeTab == 'profile' ? 'bg-white border-r-4 border-[#9BB98F]' : 'hover:bg-white hover:border-r-4 hover:border-white transiton duration-200 ease-in-out'}`}
            >
              Profile
            </Link>
            <Link
              onClick={() => setActiveTab('budgetPlan')}
              className={`block p-3 rounded-l-lg ${activeTab == 'budgetPlan' ? 'bg-white border-r-4 border-[#9BB98F]' : 'hover:bg-white hover:border-r-4 hover:border-white duration-200 ease-in-out'}`}
            >
              Saved Budget Plan
            </Link>
            <Link
              onClick={() => setActiveTab('settings')}
              className={`block p-3 rounded-l-lg ${activeTab == 'settings' ? 'bg-white border-r-4 border-[#9BB98F]' : 'hover:bg-white hover:border-r-4 hover:border-white duration-200 ease-in-out'}`}
            >
              Settings
            </Link>
            <Link
              onClick={() => setActiveTab('sign_out')}
              className={`mt-auto block p-3 rounded-l-lg ${activeTab == 'sign_out' ? 'bg-white border-r-4 border-[#9BB98F]' : 'hover:bg-white hover:border-r-4 hover:border-white transiton duration-200 ease-in-out'}`}
            >
              Sign Out
            </Link>
          </div>
        </div>

        <div className="outer-container w-[750px] bg-white rounded p-8 flex flex-col shadow-lg">
          <div className="inter-container flex-1 bg-gray-50 rounded-lg">
            {activeTab == 'profile' && <ProfileTab />}
            {activeTab == 'budgetPlan' && <p>Budget</p>}
            {activeTab == 'settings' && <p>settings</p>}
            {activeTab == 'sign_out' && <p>Sign Out</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
