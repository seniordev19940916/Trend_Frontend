# Trends

Trends is a application that collects current trends from Google, Reddit, Twitter and YouTube trends and displays the data in various charts.

Using the MERN stack (MongoDB, Express, React, Node), the server application runs on Node while the frontend uses React to dynamically update the data.

Trends uses the concurrently package to start both the server and the client with `npm run start`.

Data will automatically be collected when running the server applications starts. In a producational environment, you should probably implement some cron jobs.
