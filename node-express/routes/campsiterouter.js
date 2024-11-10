// Import the Express module
const express = require('express');

// Create a new router object for handling routes related to campsites
const campsiteRouter = express.Router();

// Define the route for the base path of '/campsites'
campsiteRouter.route('/')
    // Middleware for all HTTP methods on /campsites, sets the response status code and header, then calls next()
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next(); // Passes control to the next route handler
    })
    // GET request handler for /campsites, responds with a message listing all campsites
    .get((req, res) => {
        res.end('Will send all the campsites to you');
    })
    // POST request handler for /campsites, responds with a confirmation message using data from the request body
    .post((req, res) => {
        res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
    })
    // PUT request handler for /campsites, sends a 403 status code indicating that the operation is not supported
    .put((req, res) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /campsites');
    })
    // DELETE request handler for /campsites, responds with a message indicating all campsites are being deleted
    .delete((req, res) => {
        res.end('Deleting all campsites');
    });

// Export the campsiteRouter module so it can be used in other files
module.exports = campsiteRouter;