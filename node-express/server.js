// Import the express and morgan modules
const express = require('express');
const morgan = require('morgan');

// Set the hostname and port for the server
const hostname = 'localhost';
const port = 4000;

const app = express();

// Use Morgan middleware to log HTTP requests with the 'dev' format
app.use(morgan('dev'));

// Use Express's JSON middleware to parse JSON bodies in incoming requests
app.use(express.json());

// Middleware for /campsites route, sets status code and header, then calls the next middleware
app.all('/campsites', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});

// GET request handler for /campsites, responds with a message
app.get('/campsites', (req, res) => {
    res.end('Will send all the campsites to you');
});

// POST request handler for /campsites, responds with a confirmation message using data from the request body
app.post('/campsites', (req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
});

// PUT request handler for /campsites, sends a 403 status code indicating that the operation is not supported
app.put('/campsites', (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
});

// DELETE request handler for /campsites, responds with a message indicating all campsites are being deleted
app.delete('/campsites', (req, res) => {
    res.end('Deleting all campsites');
});

// GET request handler for a specific campsite by ID, responds with the campsite's details
app.get('/campsites/:campsiteId', (req, res) => {
    res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`);
});

// POST request handler for a specific campsite by ID, sends a 403 status code indicating the operation is not supported
app.post('/campsites/:campsiteId', (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
});

// PUT request handler for a specific campsite by ID, updates the campsite with new details
app.put('/campsites/:campsiteId', (req, res) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
    res.end(`Will update the campsite: ${req.body.name} with description: ${req.body.description}`);
});

// DELETE request handler for a specific campsite by ID, responds with a message indicating the campsite is being deleted
app.delete('/campsites/:campsiteId', (req, res) => {
    res.end(`Deleting campsite: ${req.params.campsiteId}`);
});

// Serve static files from the "public" directory in the project root
app.use(express.static(__dirname + '/public'));

// Default route for any other requests, sends an HTML response as a fallback
app.use((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

// Start the server and listen on the specified hostname and port
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
