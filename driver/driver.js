'use strict';

/**
 * Driver Application
 * This application is intended to be run by delivery drivers in their vehicles
 */

//When running, the vendor and driver consoles should show their own logs

// Connects to the CAPS server as a socket.io client to the caps namespace
// Listen for the pickup event coming in from the CAPS server
    // Simulate picking up the package
        // Wait 1.5 seconds
        // Log “picking up payload.id” to the console
        // emit an in-transit event to the CAPS server with the payload
    // Simulate delivering the package
        // Wait 3 seconds
        // emit a delivered event to the CAPS server with the payload

const t = require('../lib/timestamp.js');
const io = require('socket.io-client');

const socket = io.connect('http://localhost:3000/caps');

socket.emit('auth', { event: 'Driver Connected' });
socket.emit('join', 'driverRoom');
socket.emit('code', 'Here is info from the Driver');

socket.on('code', (payload) => {
    console.log('Driver side payload', payload);
});

socket.on('driverRoom', console.log);


// Client.connect(3000, 'localhost', () => {
//     console.log('Driver is connected to hubCAPS');
// });

// Client.on('data', (payload) => {
//     let message = JSON.parse(payload.toString());

//     if (message.event === 'new-package-available') {
//         handleMessage(message);
//     }
// });

function handleMessage(payload) {
    
    setTimeout(function () {

        console.log({ event: 'DRIVER: I have picked up the package', orderId: payload.payload.orderId }); //KEEP

        let message = {
            event: 'in-transit',
            payload: payload.payload,
        }

        Client.write(JSON.stringify({ event: message.event, payload: message.payload }));

        setTimeout(function () {

            let deliveredMessage = {
                event: 'package-delivered',
                payload: payload.payload,
            }
            console.log(deliveredMessage);

            Client.write(JSON.stringify({ event: deliveredMessage.event, payload: deliveredMessage.payload }));
        }, 3000);
    }, 1000);
}

module.exports = {
    handleMessage
}