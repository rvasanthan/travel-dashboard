# travel-dashboard# Travel Dashboard

A comprehensive travel information consolidation app built with React and Node.js. Keep all your travel contacts, addresses, maps, and weather information organized in one place.

## Features

- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🗂️ **Multiple Destinations** - Organize info by trip/destination
- 📞 **Contact Management** - Store and quickly access important phone numbers  
- 🗺️ **Location Integration** - Direct links to Google Maps
- 🌤️ **Weather Information** - Current conditions and forecasts
- ✈️ **Distance Calculations** - Airport to hotel distances
- 📋 **Itinerary Planning** - Day-by-day activity planning

## Project Structure

\`\`\`
travel-dashboard/
├── server.js              # Express server
├── package.json           # Server dependencies
├── data/
│   └── travel-data.json   # Your travel data
└── client/                # React frontend
    ├── package.json       # Client dependencies
    ├── public/
    └── src/
        ├── App.js
        └── components/
            └── TravelDashboard.js
\`\`\`

## Quick Start

### 1. Clone and Install
\`\`\`bash
git clone <your-repo-url>
cd travel-dashboard
npm install
cd client && npm install && cd ..
\`\`\`

### 2. Development Mode
\`\`\`bash
# Terminal 1 - Start the server
npm run dev

# Terminal 2 - Start the client
cd client && npm start
\`\`\`

### 3. Production Build
\`\`\`bash
npm run build
npm start
\`\`\`

## Customizing Your Data

Edit \`data/travel-data.json\` with your travel information:

\`\`\`json
{
  "destinations": [
    {
      "id": "your-trip-id",
      "name": "Your Trip Name",
      "thumbnail": "image-url",
      "contacts": [...],
      "addresses": [...],
      "weather": {...}
    }
  ]
}
\`\`\`

## Deployment Options

### Heroku
\`\`\`bash
heroku create your-travel-dashboard
git push heroku main
\`\`\`

### Netlify
1. Build the project: \`npm run build\`
2. Deploy the \`client/build\` folder to Netlify

### Vercel
\`\`\`bash
npm i -g vercel
vercel
\`\`\`

### Railway
1. Connect your GitHub repo to Railway
2. Set build command: \`npm run build\`
3. Set start command: \`npm start\`

## Environment Variables

Create a \`.env\` file in the root directory:

\`\`\`
NODE_ENV=production
PORT=5000
\`\`\`

## API Endpoints

- \`GET /api/travel-data\` - Fetch all travel data
- \`GET /api/health\` - Health check

## Tech Stack

- **Frontend**: React, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express
- **Data**: JSON file storage
- **Deployment**: Heroku, Netlify, Vercel compatible

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this for your personal travel needs!
`;

console.log("✅ Complete Node.js project structure created!");
console.log("\n📁 Files to create:");
console.log("1. package.json (server)");
console.log("2. server.js"); 
console.log("3. .env");
console.log("4. .gitignore");
console.log("5. data/travel-data.json");
console.log("6. client/package.json");
console.log("7. client/public/index.html");
console.log("8. client/src/index.js");
console.log("9. client/src/App.js");
console.log("10. client/src/App.css");
console.log("11. client/src/components/TravelDashboard.js (use the React component from the previous artifact)");
console.log("12. README.md");