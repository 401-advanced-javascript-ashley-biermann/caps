'use strict';

/**
 * Driver Application
 * This application is intended to be run by delivery drivers in their vehicles
 */

const t = require('../lib/timestamp.js');
const net = require('net');

const Client = new net.Socket();

// Connect to the CAPS server
Client.connect(3000, 'localhost', () => {
  console.log('Driver is connected to hubCAPS');
})

// Listen for the data event coming in from the CAPS server
Client.on('data', (payload) => {
    console.log(payload.toString());
  });
    // When data arrives, parse it (it should be JSON) and look for the event property and begin processing…

    // If the event is called pickup
        // Simulate picking up the package
            // Wait 1 second
            // Log “picking up id” to the console
            // Create a message object with the following keys:
                // event - ‘in-transit’
                // payload - the payload from the data object you just received
            // Write that message (as a string) to the CAPS server
            
        // Simulate delivering the package
            // Wait 3 seconds
            // Create a message object with the following keys:
                // event - ‘delivered’
                // payload - the payload from the data object you just received
            // Write that message (as a string) to the CAPS server