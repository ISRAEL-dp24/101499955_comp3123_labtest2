import React, { useState, useEffect } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";

const API_BASE = "https://api.openweathermap.org/data/2.5/weather";
function App() {
  const [query, setQuery] = useState("Toronto");   
  const [weather, setWeather] = useState(null);    
  const [loading, setLoading] = useState(false);   
  const [error, setError] = useState("");          
  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
  const fetchWeather = async (cityName) => {
    


    try {
      setError("");
    

      const url = `${API_BASE}?q=${encodeURIComponent(
        cityName
      )}&appid=${apiKey}&units=metric`;

      const response = await fetch(url);


      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("City not found, try another city.");
        }
        throw new Error("Failed to fetch weather");
      }


      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } };

  useEffect(() => {
    fetchWeather("Toronto");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    fetchWeather(query.trim());
  };

  return (
    <div className="App">
      <div className="app-container">
        <header className="app-header">
          <h1>Current weather</h1>
        </header>
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter city name (e.g. Toronto)"
          />
          <button type="submit">Search</button>
        </form>

        {loading && <p className="info-text">Loading weather...</p>}


        {!loading && !error && weather&&(
          <WeatherCard weather={weather} />
        )}
      </div>
    </div>
  );
}


export default App;
