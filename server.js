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
      locations: [
        {
          name: 'Miami Beach',
          address: 'Miami Beach, FL 33139',
          type: 'beach',
          mapLink: 'https://maps.google.com/?q=Miami+Beach',
          distanceFromHotel: '0.6 miles (10 min walk)',
        },
        {
          name: 'Bayside Marketplace',
          address: '401 Biscayne Blvd, Miami, FL 33132',
          type: 'attraction',
          mapLink: 'https://maps.google.com/?q=Bayside+Marketplace',
          distanceFromHotel: '4.6 miles (16 min drive)',
        },
        {
          name: 'Bombay Bistro',
          address: '2115 Washington Avenue, Miami Beach, FL 33139, United States',
          type: 'restaurant',
          timings: '11:30 AM - 10:00 PM',
          googleRating: '4.4',
          phone: '+13055343996',
          menuLink: 'https://www.google.com/viewer/chooseprovider?mid=/g/11ll5742zk&g2lbs=AO8LyOJtP1M8KvhGHqdK6GTXZOVjksts74h9t4zjTFlHuCxxpQjCfFhyOSyZuJxfUTPE0KJnVR9pQ7xX_At-u-xQZ4oOs_rTUQ%3D%3D&hl=en-US&gl=us&fo_m=MfohQo559jFvMUOzJVpjPL1YMfZ3bInYwBDuMfaXTPp5KXh-&utm_source=tactile&gei=GTutaJ6WKOrk5NoP5omVuAs&ei=GTutaJ6WKOrk5NoP5omVuAs&fo_s=OA&opi=79508299&ebb=1&cs=0&foub=mcpp',
          mapLink: 'https://maps.google.com/?q=Bombay+Bistro',
          distanceFromHotel: '1 mile (20 min walk)',
        },
        {
          name: 'Akash Miami Beach',
          address: '1435 Alton Rd, Miami Beach, FL 33139',
          type: 'restaurant',
          timings: '12:00 AM - 10:30 PM',
          googleRating: '4.6',
          phone: '+13053978846',
          menuLink: 'https://akashmiamibeach.com/menu/',
          mapLink: 'https://maps.google.com/?q=Akash+Miami+Beach',
          distanceFromHotel: '1.2 miles (5 min drive)',
        },
        {
          name: 'Rasoi',
          address: '1624 79th Street Causeway, North Bay Village, FL 33141',
          type: 'restaurant',
          timings: '8 AM - 10 PM',
          mapLink: 'https://maps.google.com/?q=Rasoi',
          phone: '+17869656311',
          menuLink: 'https://www.getsauce.com/order/rasoi-indian-kitchen/menu',
          reserve: 'https://www.google.com/maps/reserve/v/dine/c/483wD0q8s1o?source=pa&opi=79508299&hl=en-US&gei=yzmtaJP2Naiv5NoP9vbG6AY&sourceurl=https://www.google.com/maps/preview/place?authuser%3D0%26hl%3Den%26gl%3Dus%26pb%3D!1m24!1s0x88d9b3e713a31223:0x17d3cebe344a79f5!3m12!1m3!1d40417.48725313658!2d-80.09930003604484!3d25.743164639144393!2m3!1f0!2f0!3f0!3m2!1i1956!2i1038!4f35!4m2!3d25.8479793!4d-80.15173539999999!15m6!1m5!1s0x88d9b3e713a31223:0x17d3cebe344a79f5!4s/g/11vql_sqlm!5sChIJIxKjE-ez2YgR9XlKNL7O0xc!6s17046181446165135567!7s109922284149261705038!6sindian%2Brestaurant%2Bnear%2Bmiami%2Bbeach!12m4!2m3!1i360!2i120!4i8!13m57!2m2!1i203!2i100!3m2!2i4!5b1!6m6!1m2!1i86!2i86!1m2!1i408!2i240!7m33!1m3!1e1!2b0!3e3!1m3!1e2!2b1!3e2!1m3!1e2!2b0!3e3!1m3!1e8!2b0!3e3!1m3!1e10!2b0!3e3!1m3!1e10!2b1!3e2!1m3!1e10!2b0!3e4!1m3!1e9!2b1!3e2!2b1!9b0!15m8!1m7!1m2!1m1!1e2!2m2!1i195!2i195!3i20!14m2!1sTDmtaJLNKbetptQPhvrrwA8!7e81!15m114!1m34!4e2!13m9!2b1!3b1!4b1!6i1!8b1!9b1!14b1!20b1!25b1!18m22!3b1!4b1!5b1!6b1!9b1!12b1!13b1!14b1!17b1!20b1!21b1!22b1!25b1!27m1!1b0!28b0!30b1!32b1!33m1!1b1!34b1!36e2!10m1!8e3!11m1!3e1!14m1!3b0!17b1!20m2!1e3!1e6!24b1!25b1!26b1!27b1!29b1!30m1!2b1!36b1!37b1!39m3!2m2!2i1!3i1!43b1!52b1!54m1!1b1!55b1!56m1!1b1!61m2!1m1!1e1!65m5!3m4!1m3!1m2!1i224!2i298!72m22!1m8!2b1!5b1!7b1!12m4!1b1!2b1!4m1!1e1!4b1!8m10!1m6!4m1!1e1!4m1!1e3!4m1!1e4!3sother_user_google_review_posts__and__hotel_and_vr_partner_review_posts!6m1!1e1!9b1!89b1!98m3!1b1!2b1!3b1!103b1!113b1!114m3!1b1!2m1!1b1!117b1!122m1!1b1!125b0!126b1!127b1!21m28!1m6!1m2!1i0!2i0!2m2!1i958!2i1038!1m6!1m2!1i1906!2i0!2m2!1i1956!2i1038!1m6!1m2!1i0!2i0!2m2!1i1956!2i20!1m6!1m2!1i0!2i1018!2m2!1i1956!2i1038!22m2!1e81!8e4!29m0!30m6!3b1!6m1!2b1!7m1!2b1!9b1!34m5!7b1!10b1!14b1!15m1!1b0!37i746!38sCiJpbmRpYW4gcmVzdGF1cmFudCBuZWFyIG1pYW1pIGJlYWNoWiQiImluZGlhbiByZXN0YXVyYW50IG5lYXIgbWlhbWkgYmVhY2iSARFpbmRpYW5fcmVzdGF1cmFudJoBRENpOURRVWxSUVVOdlpFTm9kSGxqUmpsdlQydFNWRmxYV1hkWk1EbG1ZVEE0TWxaV1VrSk5XR3N3VVcxU1VHUldSUkFCqgFtCgkvbS8wMWg1cTAQASoVIhFpbmRpYW4gcmVzdGF1cmFudCgAMh8QASIbwXlwYAtX6YvwvjU3_sd2n9TPgKDrieN4HBHvMiYQAiIiaW5kaWFuIHJlc3RhdXJhbnQgbmVhciBtaWFtaSBiZWFjaOABAPoBBAh_EEw!39sRasoi%2BIndian%2BKitchen!41b1%26q%3DRasoi%2BIndian%2BKitchen',
          distanceFromHotel: '1 mile (20 min walk)',
        },
        {
          name: 'Nearest Walmart',
          address: '2551 E Hallandale Beach Blvd, Hallandale Beach, FL 33009',
          type: 'shopping',
          timings: '6 AM - 11 PM',
          mapLink: 'https://maps.app.goo.gl/NgvppqtVsTHci73B9',
          distanceFromHotel: '14 miles (30 min drive)',
        }
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
      ],
      locations: [
        {
          name: 'Sombrero Beach',
          address: 'Sombrero Beach Rd, Marathon, FL 33050',
          type: 'beach',
          mapLink: 'https://maps.app.goo.gl/fWRTn3T7cmSofHhA9',
          distanceFromHotel: '123 miles (2hrs 34min from Miami), 48 Miles (1 hr 5 mins from Key West)',
        },
        {
          name: '7 Mile Bridge - Vista Point',
          address: 'Marathon, FL 33050',
          type: 'attraction',
          mapLink: 'https://maps.google.com/?q=7+Mile+Bridge+-+Vista+Point',
          distanceFromHotel: '43,5 Miles (55 mins from Key West)',
        },
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
        },
        {
          name: 'Courtyard by Marriott Key West Waterfront',
          address: '3031-41 N Roosevelt Blvd, Key West, FL 33040',
          bookingReference: '881249938',
          type: 'hotel',
          checkIn: 'Fri, August 28, 2025 4PM',
          checkOut: 'Sun, August 31, 2025 at 11:00 AM',
          mapLink: 'https://maps.google.com/?q=Courtyard+by+Marriott+Key+West+Waterfront',
          distanceFromAirport: '158 miles (3h 20m drive)',
          phone: '+3052966595',
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