import React, { useState } from 'react';
import { useHotelPrices } from '../hooks/useHotelPrices';

const HotelSearch = () => {
  const [location, setLocation] = useState('');
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');

  const { fetchAndSaveHotelPrices, loading, error, data } = useHotelPrices();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!location || !checkin || !checkout) {
      alert('Please fill in all fields');
      return;
    }

    await fetchAndSaveHotelPrices(location, checkin, checkout);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "20px" }}>Search Hotels</h2>

      {/* Search Form */}
      <form 
        onSubmit={handleSubmit} 
        style={{ 
          display: "flex", 
          gap: "10px", 
          marginBottom: "20px", 
          flexWrap: "wrap" 
        }}
      >
        <input
          type="text"
          placeholder="Location (e.g., Dhaka)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ flex: "1", padding: "10px", fontSize: "16px" }}
        />

        <input
          type="date"
          value={checkin}
          onChange={(e) => setCheckin(e.target.value)}
          style={{ padding: "10px", fontSize: "16px" }}
        />

        <input
          type="date"
          value={checkout}
          onChange={(e) => setCheckout(e.target.value)}
          style={{ padding: "10px", fontSize: "16px" }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#0071c2",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Errors */}
      {error && (
        <div style={{ color: "red", marginBottom: "15px" }}>
          Error: {error}
        </div>
      )}

      {/* Hotel Results */}
      {data?.hotels?.length > 0 && (
        <div>
          <h3>
            {data.count} Hotels found in {data.location}
          </h3>

          <div style={{ marginTop: "20px" }}>
            {data.hotels.map((hotel) => (
              <div
                key={hotel.id}
                style={{
                  display: "flex",
                  padding: "15px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  marginBottom: "15px",
                  background: "#fff",
                }}
              >
                {/* Hotel Image */}
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "8px",
                    objectFit: "cover",
                    marginRight: "15px",
                  }}
                />

                {/* Hotel Details */}
                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: "5px" }}>{hotel.name}</h3>
                  
                  <p style={{ margin: "5px 0" }}>
                    ⭐ Rating: <strong>{hotel.rating || "N/A"}</strong>
                  </p>

                  <p style={{ margin: "5px 0" }}>
                    📍 {hotel.address}
                  </p>

                  <p style={{ 
                    marginTop: "10px", 
                    fontSize: "18px", 
                    fontWeight: "bold",
                    color: "#008009"
                  }}>
                    ${hotel.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {data?.hotels?.length === 0 && !loading && (
        <p>No hotels found.</p>
      )}
    </div>
  );
};

export default HotelSearch;
