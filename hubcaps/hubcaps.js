'use strict';

/**
 * HubCAPS
 * @module
 * Manages state of packages (ready for pickup, in transit, delivered, etc)
 * Accepts all in-bound events and data, formats them
 * Rebroadcasts to all others in connected clients pool
 */

const net = require('net');
const t = require('../lib/timestamp.js');
const PORT = process.env.PORT || 3000;
const server = net.createServer();

const socketPool = [];

server.on('connection', (socket) => {
  const id = Math.floor(Math.random() * 100000);
  socketPool[id] = socket;

  console.log('Connection established at id ' + id);

  socket.on('data', handleMessage);

  socket.on('error', (e) => console.log(`error in socket.on ${e}`));
  socket.on('end', () => { delete socketPool[id] });
});

server.on('error', (e) => {
  console.log('SERVER ERROR found', e);
});

function handleMessage(payload) {
  let message = JSON.parse(payload.toString());
  console.log(message);
  if (message.event && message.payload) {
    // what can we do here to only write to speific sockets
    for (let socket in socketPool) {
      socketPool[socket].write(JSON.stringify(message));
    }
  }
}

server.listen(PORT, () => {
  console.log('hubCAPS server up');
});