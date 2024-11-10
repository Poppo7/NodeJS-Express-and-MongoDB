// Import the necessary modules
const express = require('express'); // Express framework
const morgan = require('morgan'); // Morgan middleware for logging
const campsiteRouter = require('./routes/campsiteRouter'); // Router module for /campsites routes

// Define the server hostname and port
const hostname = 'localhost';
const port = 4000;

const app = express(); // Initialize the Express application

// Use Morgan middleware to log HTTP requests in the 'dev' format
app.use(morgan('dev'));

// Use Express's JSON middleware to parse incoming JSON requests
app.use(express.json());

// Mount the campsiteRouter on the /campsites path
// Any requests to /campsites will be handled by the campsiteRouter
app.use('/campsites', campsiteRouter);

// Serve static files from the "public" directory in the project root
// Allows files like HTML, CSS, and images in /public to be accessed directly
app.use(express.static(__dirname + '/public'));

// Default route for any requests that do not match a route or static file
// Sends an HTML response as a fallback
app.use((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

// Start the server and listen on the specified hostname and port
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
