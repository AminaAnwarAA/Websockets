const express = require('express');;
const socket = require('socket.io');

//App setup
const app = express();
var server = app.listen(4000, () => console.log("Listening on port 4000"))

//Static Files
app.use(express.static('public'))

//Socket setup
var io = socket(server);
io.on('connection', (socket) => {
    console.log('Made Socket Connection', socket.id)

    // Handle Chat Event
    socket.on('chat-message', (data) => {
        // send data to all connected clients
        io.sockets.emit('chat', data)
    })

    // Typing Event 
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data)
    })
})

