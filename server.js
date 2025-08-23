const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const cors = require('cors');
const { off } = require('process');
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
      ],
      addresses: [
        {
          name: 'Newark - Liberty International Airport (EWR)',
          address: '3 W 31st St, Newark, NJ 07102',
          bookingReference: 'ILHYRJ',
          route: 'Newark (EWR) to Fort Lauderdale (FLL)',
          airline: 'Spirit Airlines · NK2124',
          departure: 'Wed 27-Aug 10:31 AM',
          Arrival: 'Wed 27-Aug 1:35 PM',
          flightTime: '3h 04m',
          type: 'airport',
          mapLink: 'https://maps.google.com/?q=Newark+-+Liberty+International+Airport',
        },
        {
          name: 'Fort Lauderdale-Hollywood International Airport (FLL)', 
          address: '100 Terminal Dr, Fort Lauderdale, FL 33315',
          bookingReference: 'ILHYRJ',
          route: 'Fort Lauderdale (FLL) to Newark (EWR)',
          airline: 'Spirit Airlines · NK2121',
          departure: 'Sun 31-Aug 2:55 PM',
          Arrival: 'Sun 31-Aug 6:00 PM',
          flightTime: '3h 05m',
          type: 'airport',
          mapLink: 'https://maps.google.com/?q=Fort+Lauderdale-Hollywood+International+Airport',
        },
        {
            name: 'NU Car Rental',
            address: '2900 SE 6th Ave, Fort Lauderdale, FL 33316',
            type: 'car',
            bookingReference: '629886731',
            carRentalConfirmationNumber: '6170066130NU',
            pickUp: 'Wed, Aug 27 · 1:30 PM, Fort Lauderdale-Hollywood International Airport',
            dropOff: 'Sun, Aug 31 · 1:00 PM, Fort Lauderdale-Hollywood International Airport',
            mapLink: 'https://www.google.com/maps/search/?api=1&query=2900%20SE%206th%20Ave.,%20Fort%20Lauderdale%20%20(FL),%20USA%20-%20Florida,%2033316',
            phone: '+18003147306',
            voucher: 'https://res.cloudinary.com/abhinithame/image/upload/v1755974144/Saimandir/travel-companion/fll-car-rental-voucher.pdf'
        },
        {
          name: 'Hotel Belleza',
          address: '2115 Washington Avenue, Miami Beach, FL 33139, United States',
          type: 'restaurant',
          mapLink: 'https://maps.google.com/?q=2115+Washington+Avenue+Miami+Beach+FL+33319',
          distanceFromAirport: '28 miles (45 min drive)',
          phone: '+13057401430',
          confirmationPage: 'https://res.cloudinary.com/abhinithame/image/upload/v1755970470/Saimandir/travel-companion/Hotel_belleza_confirmation.pdf'
        }
      ]
    },
    {
      id: 'keywest',
      name: 'Key West',
      thumbnail: 'https://res.cloudinary.com/abhinithame/image/upload/v1755989723/Saimandir/travel-companion/key-west.jpg',
      weatherLocation: 'Key West,FL,US', // Format for Visual Crossing API
      contacts: [
        { name: 'Hotel Front Desk', phone: '+1-212-555-0123', type: 'hotel' },
        { name: 'Yellow Cab Co.', phone: '+1-212-555-0456', type: 'transport' }
      ],
      addresses: [
        {
          name: 'The Laureate Key West',
          address: '3444 North Roosevelt Boulevard, Key West, FL 33040',
          bookingReference: '6860259826, 6860259826',
          type: 'hotel',
          checkIn: 'Thu, August 28, 2025 4PM',
          checkOut: 'Sun, August 31, 2025 at 11:00 AM',
          mapLink: 'https://maps.google.com/?q=The+Laureate+Key+West',
          distanceFromAirport: '186 miles (3h 30m drive)',
          phone: '+13052957509',
        }
      ]
    },
    {
      id: 'contacts',
      name: 'Important Contacts',
      thumbnail: 'https://res.cloudinary.com/abhinithame/image/upload/v1755967744/Saimandir/travel-companion/miami.jpg',
      weatherLocation: 'Key West,FL,US', // Format for Visual Crossing API
      contacts: [
        { name: 'Vasanth', phone: '+17328290350', type: 'user' },
        { name: 'Neels', phone: '+17322539132', type: 'user' },
        { name: 'Senthil', phone: '+14104095394', type: 'user' },
        { name: 'Venkata', phone: '+16095823436', type: 'user' },
        { name: 'Vasanth Dad', phone: '+17324892852', type: 'user' },
        { name: 'Indu', phone: '+17326041711', type: 'user' },
        { name: 'Janani', phone: '+17322539500', type: 'user' },
        { name: 'Navaneetha', phone: '+14102929684', type: 'user' },
        { name: 'Aishwarya', phone: '+16677861947', type: 'user' },
        { name: 'Nithinraj', phone: '+18482443708', type: 'user' },
        { name: 'Chinnu', phone: '+17324875810', type: 'user' },
        { name: 'Abhi', phone: '+17328196997', type: 'user' },
        { name: 'Ritvik', phone: '+14436802804', type: 'user' }
      ],
      addresses: []
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