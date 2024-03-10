import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [news, setWeather] = useState(null);
  const [weather, setNews] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/weather'); //make sure this has localhost:8080 infront of it.
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error.message);
      }
    };

    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/news');
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news data:', error.message);
      }
    };

    fetchWeather();
    fetchNews();
  }, []);

function WeatherCard({ weatherData }) {
  return (
    <div className="flex flex-col items-center px-16 pt-0.5 pb-12 w-full rounded-xl border-2 border-indigo-800 border-solid shadow-2xl backdrop-blur-[21px] leading-[120%] text-zinc-100 max-md:px-5 max-md:mt-3.5 max-md:max-w-full">
      <img loading="lazy" src={weatherData.imageUrl} alt={weatherData.imageAlt} className="z-10 w-48 max-w-full aspect-square" />
      <div className="flex gap-0 mt-0 whitespace-nowrap">
        <div className="grow text-8xl tracking-tighter text-center max-md:text-4xl">{weatherData.temperature}</div>
        <div className="self-start text-2xl tracking-tighter">
          <span className="text-3xl">° C</span>
        </div>
      </div>
      <div className="self-stretch mt-8 text-4xl tracking-wider text-center">{weatherData.location}</div>
    </div>
  );
}

function Dashboard() {
  const weatherData = [
    {
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/03de3ecba4fd9821e3ad7f94067edce92faec6a1c2269b35c02dc151061e9f77?apiKey=bfadb715bc704462b9199ff254b319bd&",
      imageAlt: "Weather condition image",
      temperature: "8.4",
      location: "London, Ontario"
    },
    // Add more weather data objects here if needed
  ];


return (
    <div>
    <div class="weather">
      {news ? (
        <div>
          <h1>Weather in {news.name}</h1>
          <p>Main: {news.weather[0].main}</p>
          <p>Description: {news.weather[0].description}</p>
          <p>Temperature: {news.main.temp}</p>
          <p>Feels Like: {news.main.feels_like}</p>
          <p>Minimum Temperature: {news.main.temp_min}</p>
          <p>Maximum Temperature: {news.main.temp_max}</p>
          <p>Pressure: {news.main.pressure}</p>
          <p>Humidity: {news.main.humidity}</p>
        </div>
      ) : (
        <p>Loading Weather...</p>
      )}
    </div>
    <div class="news">
    {weather ? (
      <div>
        {weather.articles.map((article, index) => (
          <div key={index}>
            <h2>{article.title}</h2>
            <p>Author: {article.author}</p>
            <p>Source: {article.source.name}</p>
            <p>Description: {article.description}</p>
            <p><a href={article.url}>Read more</a></p>
            <hr />
          </div>
        ))}
      </div>
    ) : (
      <p>Loading weather...</p>
    )}
    </div>
  </div>
  );
}

export default App;