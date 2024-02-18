const express = require('express');
const axios = require('axios');
const app = express();

require('dotenv').config();

const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'IBM'];

app.get('/api/stocks/', async (req, res) => {
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
        
        // Send aggregated stock data to the frontend
        res.json(stockData);
    } catch (error) {
        console.error('Polygon API error:', error.message);
        res.status(500).send('Error fetching data from Polygon API');
    }
});

app.get('/api/news', async (req, res) => {
  const apiKeyNews = process.env.NEWS_API_KEY;
  const url =`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKeyNews}`;

  try  {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('News API error:', error.message);
    res.status(500).send('Error fetching data from News API');
  }
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
