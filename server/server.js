// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const cors = require('cors');
// Get our API routes
const api = require('./routes/api');
const bodyParser = require('body-parser');
const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
//Prevent Cross-origin request to be blocked
app.use(cors());
// Parsers for POST data
app.use(express.json());
// Point static path to dist
app.use(express.static(path.join(__dirname, '../dist')));
// Set our api routes
app.use('/api', api);
app.use(bodyParser.urlencoded({extended: true}))
// Catch all other routes and return the index file
app.get('*', (req, res) => {
res.sendFile(path.join(__dirname, '../dist/Techegg/index.html'));
});
/**
* Get port from environment and store in Express.
*/
const port = process.env.PORT || '3000';
app.set('port', port);
/**
* Create HTTP server.
*/
const server = http.createServer(app);
/**
* Listen on provided port, on all network interfaces.
*/
server.listen(port, () => console.log(`API running on localhost:${port}`));