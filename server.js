const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const cors = require('cors');
console.log('typeof fetch:', typeof fetch);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Environment variables
const VISUAL_CROSSING_API_KEY = process.env.VISUAL_CROSSING_API_KEY || 'NR4A6JP6FUW5QKMVYJKEHDB38';

// Travel data (you can move this to a separate JSON file)
const travelData = {
  destinations: [
    {
      id: 'miami',
      name: 'Miami',
      thumbnail: 'https://res.cloudinary.com/abhinithame/image/upload/v1755967744/Saimandir/travel-companion/miami.jpg',
      weatherLocation: 'Miami,FL,US', // Format for Visual Crossing API
      contacts: [
        { name: 'Hotel Concierge', phone: '+1-305-555-0123', type: 'hotel' },
        { name: 'Car Rental', phone: '+1-305-555-0456', type: 'car' },
        { name: 'Local Guide', phone: '+1-305-555-0789', type: 'guide' }
      ],
      addresses: [
        {
          name: 'Miami International Airport',
          address: '2100 NW 42nd Ave, Miami, FL 33126',
          type: 'airport',
          mapLink: 'https://maps.google.com/?q=Miami+International+Airport'
        },
        {
          name: 'Hotel Beaux Arts',
          address: '1401 Ocean Dr, Miami Beach, FL 33139',
          type: 'hotel',
          mapLink: 'https://maps.google.com/?q=1401+Ocean+Dr+Miami+Beach+FL',
          distanceFromAirport: '8.5 miles'
        }
      ]
    },
    {
      id: 'keywest',
      name: 'Key West',
      thumbnail: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=300&h=200&fit=crop',
      weatherLocation: 'Key West,FL,US', // Format for Visual Crossing API
      contacts: [
        { name: 'Hotel Front Desk', phone: '+1-212-555-0123', type: 'hotel' },
        { name: 'Yellow Cab Co.', phone: '+1-212-555-0456', type: 'transport' }
      ],
      addresses: [
        {
          name: 'JFK International Airport',
          address: 'Queens, NY 11430',
          type: 'airport',
          mapLink: 'https://maps.google.com/?q=JFK+Airport'
        },
        {
          name: 'The Plaza Hotel',
          address: '768 5th Ave, New York, NY 10019',
          type: 'hotel',
          mapLink: 'https://maps.google.com/?q=The+Plaza+Hotel+NYC',
          distanceFromAirport: '17 miles'
        }
      ]
    }
  ]
};

// Helper function to fetch weather data from Visual Crossing
async function fetchWeatherData(location) {
  try {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}/${today}/${tomorrow}?unitGroup=us&include=current%2Cdays&key=${VISUAL_CROSSING_API_KEY}&contentType=json`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    const data = await response.json();
    const current = data.currentConditions;
    const today_forecast = data.days[0];
    const tomorrow_forecast = data.days[1] || today_forecast;
    
    return {
      location: data.resolvedAddress,
      current: Math.round(current.temp) + '°F',
      condition: current.conditions,
      description: current.description,
      humidity: Math.round(current.humidity) + '%',
      windSpeed: Math.round(current.windspeed) + ' mph',
      feelsLike: Math.round(current.feelslike) + '°F',
      todayHigh: Math.round(today_forecast.tempmax) + '°F',
      todayLow: Math.round(today_forecast.tempmin) + '°F',
      tomorrowHigh: Math.round(tomorrow_forecast.tempmax) + '°F',
      tomorrowLow: Math.round(tomorrow_forecast.tempmin) + '°F',
      forecast: Math.round(today_forecast.tempmin) + '-' + Math.round(today_forecast.tempmax) + '°F',
      icon: current.icon,
      uvIndex: current.uvindex
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    return {
      location: location,
      current: 'N/A',
      condition: 'Unable to fetch weather',
      description: 'Weather data unavailable',
      humidity: 'N/A',
      windSpeed: 'N/A',
      feelsLike: 'N/A',
      todayHigh: 'N/A',
      todayLow: 'N/A',
      tomorrowHigh: 'N/A',
      tomorrowLow: 'N/A',
      forecast: 'N/A',
      icon: 'unknown',
      uvIndex: 'N/A'
    };
  }
}

// API Routes
app.get('/api/travel-data', (req, res) => {
  res.json(travelData);
});

// New weather API endpoint
app.get('/api/weather/:location', async (req, res) => {
  try {
    const location = req.params.location;
    const weatherData = await fetchWeatherData(location);
    res.json(weatherData);
  } catch (error) {
    console.error('Weather API error:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Travel Dashboard running on http://localhost:${PORT}`);
});