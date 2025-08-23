const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Travel data (you can move this to a separate JSON file)
const travelData = {
  destinations: [
    {
      id: 'miami',
      name: 'Miami Trip',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
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
      ],
      weather: {
        location: 'Miami, FL',
        current: '82°F',
        condition: 'Sunny',
        forecast: '78-85°F'
      }
    },
    {
      id: 'nyc',
      name: 'New York Trip',
      thumbnail: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=300&h=200&fit=crop',
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
      ],
      weather: {
        location: 'New York, NY',
        current: '68°F',
        condition: 'Partly Cloudy',
        forecast: '65-72°F'
      }
    }
  ]
};

// API Routes
app.get('/api/travel-data', (req, res) => {
  res.json(travelData);
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Travel Dashboard running on http://localhost:${PORT}`);
});
