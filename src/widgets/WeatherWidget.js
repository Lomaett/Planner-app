import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = ({ apiKey, city }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [apiKey, city]);

  if (!weatherData) {
    return <div>Loading weather...</div>;
  }

  return (
    <div>
      <h2>Weather in {weatherData.name}, {weatherData.sys.country}</h2>
      <p style={{fontSize: 40}}>{weatherData.main.temp}°C</p>
      <p>{weatherData.weather[0].description}</p>
      <img
        src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
        alt="Weather Icon"
      />
      <p>Feals like {weatherData.main.feels_like}°C</p>
      <p>Humidity: {weatherData.main.humidity}%;  Pressure: {weatherData.main.pressure}hpa</p>
      <p>Wind Speed: {weatherData.wind.speed}m/s; Wind degree: {weatherData.wind.deg}°</p>
    </div>
  );
};

export default Weather;
