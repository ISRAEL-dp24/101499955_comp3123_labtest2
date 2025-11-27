import React from "react";

function WeatherCard({ weather }) {
  const { name, sys, main, weather: weatherArray, wind } = weather || {};
  const condition = weatherArray && weatherArray[0];
  const iconUrl = condition
    ? `https://openweathermap.org/img/wn/${condition.icon}@2x.png`
    : null;

  return (
    <div className="weather-card">
      <div className="weather-main">
        <div className="weather-main-text">
          <h2>
            {name}, {sys?.country}
          </h2>

          {condition && (
            <p className="weather-description">
              {condition.main} :{condition.description}
            </p>
          )}
          {main && (
            <p className="temp-main">
              {Math.round(main.temp)}°C
            </p>
          )}
        </div>
        {iconUrl && (
          <img
            className="weather-icon"
            src={iconUrl}
            alt={condition.description}
          />
        )}
      </div>
      
      {main && (
        <div className="weather-extra">
          <div className="weather-extra-item">
            <span>Feels like</span>
            <strong>{Math.round(main.feels_like)}°C</strong>
          </div>
        </div>
      )}
    </div>
  );
}




export default WeatherCard;
