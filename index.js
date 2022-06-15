'use strict';
// Start up DB Server
require("dotenv").config();
const { db } = require('./src/auth/models/index.js');
const server = require('./src/server.js');
const port = process.env.PORT;

db.sync()
  .then(() => {

    // Start the web server
    server.start(port);
  });

