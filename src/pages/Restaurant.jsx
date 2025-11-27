import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';

function Restaurant() {
  return (
    <>
      <Header />
      <div className="ml-16 mt-4 w-40 h-14">
        <Card title="Location" className="" />
      </div>
      <div class="w-full h-full relative flex flex-col items-center py-4 px-16">
        <div class="w-full flex gap-4">
          <div class="p-2 mt-1 bg-white w-[30%] h-[50vh] rounded-lg flex flex-col shadow-lg">
            <p className="p-2">Filter</p>
          </div>
          <div class="w-[70%] h-[100vh] rounded-lg flex flex-col mt-1">
            <div className="p-3 bg-white w-full rounded-lg flex items-center justify-center shadow">
              <div className="bg-gray-100 w-40 h-40 rounded-lg">
                <p className="p-2">Restaurant picture</p>
              </div>
              <div className="bg-gray-100 flex-1 h-40 ml-4 rounded">
                <p className="p-2">Restaurant Title</p>
              </div>
            </div>
            <div className="p-3 mt-5 bg-white w-full rounded-lg flex items-center justify-center shadow">
              <div className="bg-gray-100 w-40 h-40 rounded-lg">
                <p className="p-2">Restaurant picture</p>
              </div>
              <div className="bg-gray-100 flex-1 h-40 ml-4 rounded">
                <p className="p-2">Restaurant Title</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Restaurant;