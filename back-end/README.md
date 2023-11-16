# Trends

Trends is a application that collects current trends from Google, Reddit, Twitter and YouTube trends and displays the data in various charts.

Built with the MERN stack (MongoDB, Express.js, React.js, Node.js), the server application runs in a Node environment using Express to route a simple REST API fetching data from a MongoDB database. The frontend is built with React to dynamically update the data.

Trends uses the concurrently package to start both the server and the client by running `npm run start` from the root folder.

Data will automatically be collected when running the server applications starts. In a producational environment, you should probably implement some cron jobs.

The server application uses dotenv to read environment variables. Get credentials to the Google API and Twitter API, and make sure to create a .env file with the following variables in your root folder:
- GOOGLE_API_KEY
- TWITTER_CONSUMER_KEY
- TWITTER_CONSUMER_SECRET
- TWITTER_ACCESS_TOKEN_KEY
- TWITTER_ACCESS_TOKEN_SECRET

*Make sure to keep port 3000 (client) and 3001 (server) open!*