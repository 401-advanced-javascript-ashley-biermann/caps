'use strict';

/**
 * Vendor Application
 * This application is intended to be run by store owners.
 */

require('dotenv').config();
const net = require('net');
const faker = require('faker');
const t = require('../lib/timestamp.js');

const Client = new net.Socket();
const myStore = process.env.STORE_NAME;


Client.connect(3000, 'localhost', () => {
  console.log('Vendor is connected to hubCAPS');
});

function generateOrder(storeName, orderId, customerName, address) {
  let payload = {
    storeName: storeName,
    orderId: orderId,
    customerName: customerName,
    address: address
  }
  
  console.log({ event: 'VENDOR: Package ready to deliver to customer', payload }); //KEEP
  
  Client.write(JSON.stringify({ event: 'new-package-available', payload: payload }));
}

function handleDeliveryComplete(payload) {
  console.log('Thank you for delivering order number ' + payload.payload.orderId + '!');
}

setInterval(() => {
  generateOrder(myStore, faker.fake('{{random.number}}'), faker.fake('{{name.lastName}}'), faker.fake('{{address.streetAddress}}'));
}, 5000);


Client.on('data', (payload) => {
  let message = JSON.parse(payload.toString());

  if (message.event === 'package-delivered') {
    handleDeliveryComplete(message);
  }
});
