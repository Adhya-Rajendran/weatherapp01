import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [city, setCity] = useState(""); // For storing the city name
  const [weather, setWeather] = useState(null); // For storing weather data
  const [error, setError] = useState(""); // For handling errors
  const [loading, setLoading] = useState(false); // For showing loading state

  // Function to fetch weather data
  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError(""); // Reset any previous errors

    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`;

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("City not found!");
      }

      const data = await response.json();
      setWeather(data);
      setError("");
    } catch (err) {
      setError(err.message || "Unable to fetch weather data");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Weather App 🌦️</h1>
      
      {/* City Input */}
      <div>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {/* Loading state */}
      {loading && <p>Loading...</p>}

      {/* Error handling */}
      {error && <p className="error">{error}</p>}

      {/* Display Weather */}
      {weather && (
        <div className="weather-container">
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>🌡️ {weather.main.temp} °C</p>
          <p>Feels Like: {weather.main.feels_like} °C</p>
          <p>💨 Wind Speed: {weather.wind.speed} m/s</p>
          <p>🌅 Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default App;
