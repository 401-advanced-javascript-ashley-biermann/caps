'use strict';

/**
 * Driver Application
 * This application is intended to be run by delivery drivers in their vehicles
 */


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

socket.on('new-package-available', handleGoGetPackage)


function handleGoGetPackage(payload) {
    console.log(`DRIVER: Order ${payload.orderId} is in transit`);

    setTimeout(function () {
        socket.emit('in-transit', payload);

        setTimeout(function () {
            console.log(`DRIVER: Order ${payload.orderId} has been delivered`);
            socket.emit('package-delivered', payload)
        }, 3000);
    }, 1000);
}

module.exports = {
    handleGoGetPackage
}