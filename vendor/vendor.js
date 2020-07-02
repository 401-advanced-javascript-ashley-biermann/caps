'use strict';

/**
 * Vendor Application
 * This application is intended to be run by store owners.
 */

require('dotenv').config();
const faker = require('faker');
const t = require('../lib/timestamp.js');
const io = require('socket.io-client');
const storeName = process.env.STORE_NAME;

const socket = io.connect('http://localhost:3000/caps');

socket.emit('auth', { event: 'Vendor Connected' });
socket.emit('join', 'vendorRoom');
socket.emit('code', 'Here is info from the Vendor');

socket.on('code', (payload) => {
  console.log('Vendor side payload', payload);
});
socket.on('package-delivered', handleDeliveryComplete);

function generateOrder(storeName, orderId, customerName, address) {
  let payload = {
    storeName: storeName,
    orderId: orderId,
    customerName: customerName,
    address: address
  }
  
  console.log(`VENDOR: Package ready to deliver to customer. Order ${payload.orderId}`, payload);
  
  socket.emit('new-package-available', payload);
}

function handleDeliveryComplete(payload) {
  console.log(`VENDOR: Thank you for delivering Order ${payload.orderId}`, payload);
  socket.emit('order-complete', payload);
}

setInterval(() => {
  generateOrder(storeName, faker.fake('{{random.number}}'), faker.fake('{{name.lastName}}'), faker.fake('{{address.streetAddress}}'));
}, 10000);

module.exports = {
  generateOrder,
  handleDeliveryComplete
}