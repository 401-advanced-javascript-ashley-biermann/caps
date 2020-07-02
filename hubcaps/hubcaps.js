'use strict';

/**
 * HubCAPS
 * @module
 * Manages state of packages (ready for pickup, in transit, delivered, etc)
 * Accepts all in-bound events and data, formats them
 * Rebroadcasts to all others in connected clients pool
 */

 //the CAPS server should be logging everything


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
    
    if(!currentRoom) {
      caps.emit('code', payload);
    }
    if(currentRoom) {
      caps.to(currentRoom).emit('code', payload);
    }
  });

  socket.on('join', room => {
    console.log(`someone joined ${room}`);
    currentRoom = room;
    socket.join(room);
  });
});



    // Monitor the correct general events
        // pickup, in-transit, delivered
        // Broadcast the events and payload back out to the appropriate clients in the caps namespace
            // pickup can go out to all sockets (broadcast it) so that the drivers can hear it
            // in-transit and delivered are meant to be heard only by the right vendor
                // Emit those messages and payload only to the room (vendor) for which the message was intended


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



module.exports = {
  handleMessage
}