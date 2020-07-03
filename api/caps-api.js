'use strict';

require('dotenv').config();

const express = require('express');
const app = express();

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000/caps');

const PORT = process.env.PORT || 3001;

// SERVER MIDDLEWARE
app.use(express.json());

// Where :retailer is the name of our client and :code is a unique tracking code
// i.e. http://localhost:3000/delivery/1-206-flowers/12345-ABCD

// ROUTES
app.post('/delivery/:retailer/:code', handlePost);

// COMMS WITH HUBCAPS
socket.emit('auth', { event: 'Caps-API connected' });
socket.emit('code', 'Caps-API is connected');

socket.on('code', (payload) => {
  console.log('Caps-API side payload', payload);
});

// HANDLERS
function handlePost(req, res) {

const payload = {
  retailer: req.params.retailer,
  code: req.params.code,
  messageId: Math.floor(Math.random() * 100000000)
}
res.send('Thank you!');
console.log(payload);
socket.emit('delivered', payload);
}

// EXPRESS SERVER LISTEN
app.listen(PORT, () => {
  console.log('Caps-API server up');
});
