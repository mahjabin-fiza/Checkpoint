import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function UserProfile() {
  const [activeTab, setActiveTab] = useState('profile');
  return (
    <>
      <Header />
      <div className="flex flex-1 min-h-[calc(100vh-92px)] py-6 px-16 gap-5">
        <div className="outer-container w-[25%] bg-white rounded p-4 flex flex-col shadow-lg">
          <div className="inter-container flex-1 flex flex-col">
            <Link
              onClick={() => setActiveTab('profile')}
              className="block p-3 hover:bg-gray-200"
            >
              Profile
            </Link>
            <Link
              onClick={() => setActiveTab('budgetPlan')}
              className="block p-3 hover:bg-gray-200"
            >
              Saved Budget Plan
            </Link>
            <Link
              onClick={() => setActiveTab('settings')}
              className="block p-3 hover:bg-gray-200"
            >
              Settings
            </Link>
          </div>
        </div>

        <div className="outer-container w-[75%] bg-white rounded p-4 flex flex-col shadow-lg">
          <div className="inter-container flex-1 bg-gray-50 rounded-lg">
            {activeTab == 'profile' && <p>Profile</p>}
            {activeTab == 'budgetPlan' && <p>Budget</p>}
            {activeTab == 'settings' && <p>settings</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
