// Dashboard.jsx
import React from 'react';
import districtsData from '../data/districtsData';

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Districts Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {districtsData.map((district) => (
          <div key={district.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Pictures */}
            <div className="flex overflow-x-auto space-x-2 p-2">
              {district.destinationPictures.map((pic, index) => (
                <img
                  key={index}
                  src={pic}
                  alt={district.name}
                  className="h-32 w-48 object-cover rounded"
                />
              ))}
            </div>

            {/* Info */}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{district.name}</h2>
              <p className="text-gray-700 mb-2">{district.destinationDetails}</p>

              <p className="font-medium">Popular Attractions:</p>
              <ul className="list-disc list-inside mb-2">
                {district.popularAttractions.map((attr, idx) => (
                  <li key={idx}>{attr}</li>
                ))}
              </ul>

              <p>
                <span className="font-medium">Airport:</span>{' '}
                {district.airport ? district.airport : 'N/A'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
