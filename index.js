// Get configuration options
try {
  const config = require('./config.json');
} catch (e) {
  console.log('An error occurred requiring the config.json file.\nMake sure that it is there and that it is in valid JSON format.\n\nBelow is the original error.');
  throw e;
}

// Start server
const express = require('express');
const server = new express();

// Initiate CompassEdu instance
const compassedu = require('@maytha8/compassedu');
const app = new compassedu(config.baseUrl);

(async ()=>{

  // Authenticate
  try {
    await app.auth.authenticate(config.credentials.username, config.credentials.password);
    console.log('Authenticated');
  } catch (e) {
    if (e.message === "Invalid credentials") {
      throw new Error('The username and/or password provided in config.json are incorrect.\nPlease make sure you typed in the credentials correctly.');
    } else {
      throw e;
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
