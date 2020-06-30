'use strict';

/**
 * Vendor Module
 * @module
 */

require('dotenv').config();
const events = require('./events');
const storeName = process.env.STORE_NAME;
const faker = require('faker');

// Every 5 seconds, simulate a new customer order
  // Create a fake order, as an object:
    // storeName, orderId, customerName, address


// Emit a ‘pickup’ event and attach the fake order as payload
  // HINT: Have some fun by using the faker library to make up phony information
events.emit('new-package-available', payload);


// Monitor the system for events …
events.on('elivery-complete', handleDeliveryComplete);
  // Whenever the ‘delivered’ event occurs
    // Log “thank you” to the console

function handleDeliveryComplete(event, payload) {
  
}