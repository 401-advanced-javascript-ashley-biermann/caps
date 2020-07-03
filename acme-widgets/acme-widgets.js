'use strict';

require('dotenv').config();
const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000/caps');

const clientInfo = {
  clientId: process.env.CLIENT_ID,
  eventName: 'festival'
}

socket.emit('code', 'ACME-Widgets is connected');

socket.on('code', (payload) => {
  console.log('ACME-Widgets side payload', payload);
});

socket.emit('subscribe', 'Acme-Widgets-Room');
socket.emit('getAll', clientInfo);

socket.on('delivered', handleDelivered);

function handleDelivered(payload) {
  console.log('A delivery has been complete', payload);
  socket.emit('received', clientInfo, payload.messageId);
  // Upon handling any delivered event
      // Let the queue server know that your application handled this event (message id) so that it can de-queue it
}
