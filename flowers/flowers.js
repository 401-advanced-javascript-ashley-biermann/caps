'use strict';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000/caps');

socket.emit('code', '1-206-Flowers is connected');

socket.on('code', (payload) => {
  console.log('1-206-Flowers side payload', payload);
});