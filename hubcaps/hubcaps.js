'use strict';

/**
 * HubCAPS
 * @module
 * Manages state of packages (ready for pickup, in transit, delivered, etc)
 * Accepts all in-bound events and data, formats them
 * Rebroadcasts to all others in connected clients pool
 */

const socketIO = require('socket.io');
const t = require('../lib/timestamp.js');
const PORT = process.env.PORT || 3000;
const io = socketIO(3000);

io.on('connection', (socket) => {

  socket.on('auth', (payload) => {
    io.emit('auth', 'payload recieved');
    socket.broadcast.emit('auth', 'only other clients should see this');
  });
});

let caps = io.of('/caps');

caps.on('connection', (socket) => {

  let currentRoom = null;

  console.log('someone joined the /caps namespace');

  socket.on('code', (payload) => {
    console.log('server side payload', payload);

    if (!currentRoom) {
      caps.emit('code', payload);
    }
    if (currentRoom) {
      caps.to(currentRoom).emit('code', payload);
    }
  });

  socket.on('join', room => {
    console.log(`someone joined ${room}`);
    currentRoom = room;
    socket.join(room);
  });

  socket.on('new-package-available', handleNewPackage);
  socket.on('in-transit', handleInTransit);
  socket.on('package-delivered', handleDelivered);
  socket.on('order-complete', handleOrderComplete);
});

function handleNewPackage(payload) {
  console.log(`HUBCAPS: New package available for pickup from Vendor. Order ${payload.orderId}`);
  if (payload) {
   caps.emit('new-package-available', payload);
  }
}

function handleInTransit(payload) {
  console.log(`HUBCAPS: Order ${payload.orderId} is in transit`);
}

function handleDelivered(payload) {
  console.log(`HUBCAPS: Order ${payload.orderId} has been delivered`);
  caps.emit('package-delivered', payload);
}

function handleOrderComplete(payload) {
  console.log(`HUBCAPS: Order ${payload.orderId} complete`);
}

module.exports = {
 handleNewPackage,
 handleInTransit,
 handleDelivered,
 handleOrderComplete
}