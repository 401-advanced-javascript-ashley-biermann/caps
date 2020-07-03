'use strict';

const socketIO = require('socket.io');
const PORT = process.env.PORT || 3000;
const io = socketIO(3000);

const messageQueue = [];

io.on('connection', (socket) => {

  socket.on('auth', (payload) => {
    io.emit('auth', 'payload recieved');
    socket.broadcast.emit('auth', 'only other clients should see this');
  });
});

let caps = io.of('/caps');

caps.on('connection', (socket) => {
  console.log('New Retailers joined the /caps namespace');

  socket.on('code', (payload) => {
    console.log(payload);
    socket.emit('code', 'Welcome to the Message Queue System!');
  });

  
  socket.on('subscribe', handleSubscribe);
  socket.on('received', handleReceived);
  socket.on('getAll', handleGetAll);
  socket.on('delivered', handleDelivered);

// HANDLERS
  function handleSubscribe(room) {
    console.log(`A Retailer joined ${room}`);
    socket.join(room);
  
    // Create a node in the event queue for the client, for the event, so that you can store all event data for them
  }

  function handleReceived(payload) {
    // When this event is heard on the server, assume it’s the client telling you they got a message
    // The payload should include the client id, event name, and message id, so that you can delete it from the queue
  }
  
  function handleGetAll(payload) {
    console.log(payload);
    //   The payload should include the clientId and eventName
    // When this event is heard on the server, find each of the messages in the queue for the client, for the event specified
    // Go through each of the entries for the client/event in the queue (if any) and broadcast them to the client
  }
  
  function handleDelivered(payload) {
    console.log(payload);
    messageQueue.push(payload);
    socket.broadcast.emit('delivered', payload);
  }

});


