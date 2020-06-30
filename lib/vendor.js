'use strict';

/**
 * Vendor Module
 * @module
 */

require('dotenv').config();
const events = require('./events.js');
const myStore = process.env.STORE_NAME;
const faker = require('faker');
const t = require('./timestamp.js');
const { setInterval } = require('timers');
require('./caps.js');

// HANDLERS
function generateOrder(storeName, orderId, customerName, address) {
  let payload = {
    storeName: storeName,
    orderId: orderId,
    customerName: customerName,
    address: address
  }
  console.log({ event: 'VENDOR: Package ready to deliver to customer', time: t.t, payload })
  events.emit('new-package-available', payload, t.t); // do I need to emit this?
}

function handleDeliveryComplete(payload) {
  console.log({ event: 'VENDOR: Thank you, enjoy your product!' });
}

// EVENT LISTENERS
events.on('delivery-complete', handleDeliveryComplete);

// Every 5 seconds, simulate a new customer order

setInterval(() => {
    generateOrder(myStore, faker.fake('{{random.number}}'), faker.fake('{{name.lastName}}'), faker.fake('{{address.streetAddress}}'));
  }, 5000);
