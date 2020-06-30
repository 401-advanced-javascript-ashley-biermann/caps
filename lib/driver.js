'use strict';

/**
 * Driver Module
 * @module
 * 
 */

 const events = require('./events');

// Monitor the system for events …
  // On the ‘pickup’ event …
  // Wait 1 second
    // Log “DRIVER: picked up [ORDER_ID]” to the console.
    // Emit an ‘in-transit’ event with the payload you received
  // Wait 3 seconds
    // Log “delivered” to the console
    // Emit a ‘delivered’ event with the same payload