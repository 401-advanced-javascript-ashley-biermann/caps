'use strict';

/**
 * Vendor Application
 * This application is intended to be run by store owners.
 */

 //When running, the vendor and driver consoles should show their own logs

    // Join a room named for your store
        // Emit a join event to the caps namespace connection, with the payload being your store code
// Every .5 seconds, simulate a new customer order
    // Create a payload object with your store name, order id, customer name, address
    // Emit that message to the CAPS server with an event called pickup
// Listen for the delivered event coming in from the CAPS server
    // Log “thank you for delivering payload.id” to the console

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

socket.on(`${storeName}`, console.log);



function generateOrder(storeName, orderId, customerName, address) {
  let payload = {
    storeName: storeName,
    orderId: orderId,
    customerName: customerName,
    address: address
  }
  
  console.log({ event: 'VENDOR: Package ready to deliver to customer', payload }); //KEEP
  
  // Client.write(JSON.stringify({ event: 'new-package-available', payload: payload }));
}

function handleDeliveryComplete(payload) {
  console.log('Thank you for delivering order number ' + payload.payload.orderId + '!');
}

setInterval(() => {
  generateOrder(myStore, faker.fake('{{random.number}}'), faker.fake('{{name.lastName}}'), faker.fake('{{address.streetAddress}}'));
}, 5000);


// Client.on('data', (payload) => {
//   let message = JSON.parse(payload.toString());

//   if (message.event === 'package-delivered') {
//     handleDeliveryComplete(message);
//   }
// });

module.exports = {
  generateOrder,
  handleDeliveryComplete
}