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

// /*Creates a pool of connected clients
const socketPool = [];

// Accept inbound TCP connections on a declared port
server.on('connection', (socket) => {
  const id = Math.floor(Math.random() * 100000);

  // On new connections, add the client to the connection pool
  socketPool[id] = socket;
  
  console.log('Connection established at id ' + id);

  // On incoming data from a client
  socket.on('data', handleMessage);

  socket.on('error', (e) => console.log(e));
  socket.on('end', () => { delete socketPool[id] });
});

function handleMessage(buffer) {

  // Read and parse the incoming data/payload
  let message = JSON.parse(buffer.toString());

  // TODO: Verify that the data is legitimate
        // is it a JSON object with both an event and payload properties?
        
  // If the payload is ok, broadcast the raw data back out to each of the other connected clients*/
    // TODO: what can we do here to only write to speific sockets

  for (let socket in socketPool) {
    socketPool[socket].write(JSON.stringify(message));
  }
}

server.listen(PORT, () => {
  console.log('hubCAPS server up');
});