'use strict';

/**
 * Vendor Module
 * @module
 */

require('dotenv').config();
const events = require('./events');
const myStore = 'Ashleys Store' //process.env.STORE_NAME;
const faker = require('faker');
const t = require('./timestamp');
require('./caps');

// HANDLERS
function generateOrder(storeName, orderId, customerName, address) {
  let payload = {
    storeName: storeName,
    orderId: orderId,
    customerName: customerName,
    address: address
  }
    // HINT: Have some fun by using the faker library to make up phony information
    console.log({ event: 'VENDOR: Package ready to deliver to customer', time: t.t, payload })
    events.emit('new-package-available', payload, t.t);
}

function handleDeliveryComplete(payload) {
  console.log({ event: 'VENDOR: Thank you, enjoy your product!' });
}

// EVENT LISTENERS
events.on('delivery-complete', handleDeliveryComplete);

// Every 5 seconds, simulate a new customer order
generateOrder(myStore, faker.fake('{{random.number}}'), faker.fake('{{name.lastName}}'), faker.fake('{{address.streetAddress}}'));