'use strict';

/**
 * Driver Application
 * This application is intended to be run by delivery drivers in their vehicles
 */

const t = require('../lib/timestamp.js');
const net = require('net');
const Client = new net.Socket();

Client.connect(3000, 'localhost', () => {
    console.log('Driver is connected to hubCAPS');
})

Client.on('data', (payload) => {
    let message = JSON.parse(payload.toString());

    if (message.event === 'new-package-available') {
        handleMessage(message);
    }
});

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
