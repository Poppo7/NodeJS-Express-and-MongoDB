const express = require('express');
const morgan = require('morgan');

const hostname = 'localhost';
const port = 3000;

const app = express();

// Use Morgan middleware for logging
app.use(morgan('dev'));

// Serve static files from the "public" directory
app.use(express.static(__dirname + '/public'));

// Default route if no static file matches
app.use((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

// Start the server
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

//type "node server.js" to start the server in the terminal.