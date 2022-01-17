// Get configuration options
const config = require('./config.json');

// Start server
const express = require('express');
const server = new express();

// Initiate CompassEdu instance
const compassedu = require('../compassedu');
const app = new compassedu(config.baseUrl);

(async ()=>{

  // Authenticate
  try {
    await app.authenticate(config.credentials.username, config.credentials.password);
    console.log('Authenticated');
  } catch (e) {
    if (e.message === "Invalid credentials") {
      throw new Error('The username and/or password provided are incorrect.');
    } else {
      throw new Error(e.message);
    }
  }

  // Listen to /
  server.get('/', async (req, res) => {

    var locations = [];

    try {
      locations = await app.getAllLocations();
    } catch (e) {
      throw new Error(e.message);
    }

    var outputLocationsHTML = '';

    locations.forEach((item, index) => {

      outputLocationsHTML += `
      <tr>
        <td>${item.building}</td>
        <td>${item.roomName}</td>
        <td>${item.roomLongName}</td>
      </tr>
      `;

    });

    res.send(`
    <!DOCTYPE html>
    <head>
      <link rel='stylesheet' href='styles.css'>
    </head>
    <body>
      <h1>Locations (${locations.length})</h1>
      <table>
        <tr><th>Buidling</th><th>Room</th><th>Description</th></tr>
        ${outputLocationsHTML}
      </table>
    </body>
    `);

  });

  server.get('/styles.css', (req, res) => {
    res.sendFile(__dirname+'/styles.css');
  });

  server.listen(3000, () => {
    console.log('Listening on port 3000. To open, go to https://localhost:3000/')
  });

})();
