//sorry zac, had to redo all this so i could add a timmer to the stock data

const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');

require('dotenv').config();

app.use(cors());

const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'IBM'];

// Function to fetch stock data
const fetchStockData = async () => {
    const apiKeyStock = process.env.POLYGON_API_KEY;
    const stockData = [];

    // Fetch data for each symbol using axios.all for parallel requests
    try { 
        const requests = symbols.map(symbol => 
            axios.get(`https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?adjusted=true&apiKey=${apiKeyStock}`)
        );
        
        // Wait for all requests to resolve
        const responses = await axios.all(requests);
        
        // Extract data from each response
        responses.forEach(response => stockData.push(response.data));
        
        // Log aggregated stock data to the server console
        console.log(stockData);
        
        // Return aggregated stock data
        return stockData;
    } catch (error) {
        console.error('Polygon API error:', error.message);
        throw new Error('Error fetching data from Polygon API');
    }
};

// Function to fetch news data
const fetchNewsData = async () => {
    const apiKeyNews = process.env.NEWS_API_KEY;
    const url =`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKeyNews}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('News API error:', error.message);
        throw new Error('Error fetching data from News API');
    }
};

// Function to fetch weather data
const fetchWeatherData = async (cityName) => {
    const apiKeyWeather = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKeyWeather}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Weather API error:', error.message);
        throw new Error('Error fetching data from Weather API');
    }
};

// Initial data fetch
let stockData = [];
let newsData = null;
let weatherData = null;

// Fetch data initially
(async () => {
    try {
        stockData = await fetchStockData();
        newsData = await fetchNewsData();
        weatherData = await fetchWeatherData();
    } catch (error) {
        console.error('Error fetching initial data:', error.message);
    }
})();

// Fetch data every minute
setInterval(async () => {
    try {
        stockData = await fetchStockData();
        newsData = await fetchNewsData();
        weatherData = await fetchWeatherData();
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}, 60000); // 60000 milliseconds = 1 minute

// API endpoints
app.get('/api/stocks', (req, res) => {
    res.json(stockData);
});

app.get('/api/news', (req, res) => {
    res.json(newsData);
});

app.get('/api/weather', async (req, res) => {
    // Extract city name from query parameters
    const cityName = req.query.city;
    if (!cityName) {
        return res.status(400).send('City name is required');
    }
    
    try {
        // Fetch weather data for the given city name
        const weatherData = await fetchWeatherData(cityName);
        res.json(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        res.status(500).send('Error fetching weather data');
    }
});


// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
