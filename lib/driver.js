'use strict';

/**
 * Driver Module
 * @module
 * 
 */

const events = require('./events');

// Monitor the system for events …
events.on('package-ready-for-delivery', handleGoGetPackage);
// On the ‘pickup’ event …
// Wait 1 second
// Log “DRIVER: picked up [ORDER_ID]” to the console.

// Emit an ‘in-transit’ event with the payload you received
events.emit('package-in-transit', payload);


// Wait 3 seconds
// Log “delivered” to the console
// Emit a ‘delivered’ event with the same payload
events.emit('package-delivered', payload);